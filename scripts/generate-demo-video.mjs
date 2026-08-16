import { execFileSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import { copyFileSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const screenshotsDir = path.join(rootDir, "docs", "screenshots");
const outputDir = path.join(rootDir, "docs", "demo-video");
const publicVideoDir = path.join(rootDir, "public", "demo-video");

const slides = [
  {
    image: "home.png",
    duration: 4,
    text: "Imobiliária App — CRM completo para imobiliárias",
  },
  {
    image: "login.png",
    duration: 3,
    text: "Acesso seguro com autenticação por e-mail e senha",
  },
  {
    image: "dashboard.png",
    duration: 5,
    text: "Dashboard em tempo real com métricas da operação",
  },
  {
    image: "clientes.png",
    duration: 5,
    text: "Gestão de clientes, leads e contatos com busca e filtros",
  },
  {
    image: "imoveis.png",
    duration: 5,
    text: "Imóveis com fotos reais, paginação e exportação CSV",
  },
  {
    image: "contratos.png",
    duration: 5,
    text: "Contratos que atualizam automaticamente o status do imóvel",
  },
  {
    image: "dashboard.png",
    duration: 5,
    text: "Resumo financeiro dos contratos ativos em um só lugar",
  },
];

function formatSrtTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const millis = Math.round((totalSeconds % 1) * 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},${String(millis).padStart(3, "0")}`;
}

function buildSrt() {
  let elapsed = 0;
  const blocks = slides.map((slide, index) => {
    const start = formatSrtTime(elapsed);
    elapsed += slide.duration;
    const end = formatSrtTime(elapsed);

    return `${index + 1}\n${start} --> ${end}\n${slide.text}\n`;
  });

  return `\ufeff${blocks.join("\n")}`;
}

function escapeSubtitlePath(filePath) {
  return filePath.replace(/\\/g, "/").replace(/:/g, "\\:");
}

function runFfmpeg(args) {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static não encontrado.");
  }

  execFileSync(ffmpegPath, args, { stdio: "inherit" });
}

function main() {
  mkdirSync(outputDir, { recursive: true });

  const srtPath = path.join(outputDir, "demo.srt");
  const rawVideoPath = path.join(outputDir, "demo-raw.mp4");
  const finalVideoPath = path.join(outputDir, "imobiliaria-app-demo.mp4");

  writeFileSync(srtPath, buildSrt(), "utf8");

  const inputArgs = slides.flatMap((slide) => [
    "-loop",
    "1",
    "-t",
    String(slide.duration),
    "-i",
    path.join(screenshotsDir, slide.image),
  ]);

  const scaleFilters = slides
    .map(
      (_, index) =>
        `[${index}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p[v${index}]`
    )
    .join(";");

  const concatInputs = slides.map((_, index) => `[v${index}]`).join("");
  const filterComplex = `${scaleFilters};${concatInputs}concat=n=${slides.length}:v=1:a=0[vout]`;

  console.log("Gerando vídeo a partir dos screenshots...");
  runFfmpeg([
    ...inputArgs,
    "-filter_complex",
    filterComplex,
    "-map",
    "[vout]",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-y",
    rawVideoPath,
  ]);

  console.log("Adicionando legendas...");
  const subtitleFilter = `subtitles='${escapeSubtitlePath(srtPath)}':force_style='FontName=Arial,FontSize=28,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,BorderStyle=3,Outline=2,Shadow=1,Alignment=2,MarginV=45'`;

  runFfmpeg([
    "-i",
    rawVideoPath,
    "-vf",
    subtitleFilter,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-y",
    finalVideoPath,
  ]);

  console.log(`\nVídeo pronto: ${finalVideoPath}`);
  console.log(`Legendas: ${srtPath}`);

  mkdirSync(publicVideoDir, { recursive: true });
  copyFileSync(
    finalVideoPath,
    path.join(publicVideoDir, "imobiliaria-app-demo.mp4")
  );
  console.log(`Cópia pública: ${path.join(publicVideoDir, "imobiliaria-app-demo.mp4")}`);
}

main();
