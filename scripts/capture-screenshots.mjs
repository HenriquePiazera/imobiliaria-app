import { chromium } from "@playwright/test";
import { mkdir } from "fs/promises";
import path from "path";

const BASE_URL = process.env.SCREENSHOT_BASE_URL || "http://localhost:3000";
const EMAIL =
  process.env.SCREENSHOT_EMAIL ||
  `demo.screenshot.${Date.now()}@imobiliaria-app.test`;
const PASSWORD = process.env.SCREENSHOT_PASSWORD || "demo123456";

const publicScreens = [
  { name: "home", path: "/" },
  { name: "login", path: "/login" },
  { name: "case-study", path: "/case-study" },
];

const authScreens = [
  { name: "dashboard", path: "/dashboard" },
  { name: "clientes", path: "/dashboard/clients" },
  { name: "imoveis", path: "/dashboard/properties" },
  { name: "contratos", path: "/dashboard/contracts" },
  { name: "configuracoes", path: "/dashboard/settings" },
];

async function registerAndSeed(page) {
  await page.goto(`${BASE_URL}/register`);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 30000 });

  const seedButton = page.getByRole("button", {
    name: /Popular com dados demo|Adicionar demo/i,
  });

  await seedButton.click();
  await page.waitForTimeout(5000);
}

async function main() {
  const outputDir = path.join(process.cwd(), "docs", "screenshots");
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  for (const screen of publicScreens) {
    await page.goto(`${BASE_URL}${screen.path}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(outputDir, `${screen.name}.png`),
      fullPage: true,
    });
    console.log(`Saved ${screen.name}.png`);
  }

  await registerAndSeed(page);

  for (const screen of authScreens) {
    await page.goto(`${BASE_URL}${screen.path}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(outputDir, `${screen.name}.png`),
      fullPage: true,
    });
    console.log(`Saved ${screen.name}.png`);
  }

  await browser.close();
  console.log(`Screenshots saved to ${outputDir}`);
  console.log(`Demo account used: ${EMAIL}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
