"use client";

import { Play, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const DEMO_VIDEO_SRC = "/demo-video/imobiliaria-app-demo.mp4";

type DemoVideoModalProps = {
  open: boolean;
  onClose: () => void;
};

function DemoVideoModal({ open, onClose }: DemoVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) {
      videoRef.current?.pause();
      return;
    }

    videoRef.current?.play().catch(() => undefined);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
          aria-label="Fechar demo"
        >
          <X size={20} />
        </button>

        <video
          ref={videoRef}
          src={DEMO_VIDEO_SRC}
          controls
          playsInline
          className="aspect-video w-full"
        >
          Seu navegador não suporta reprodução de vídeo.
        </video>
      </div>
    </div>
  );
}

type DemoVideoButtonProps = {
  className?: string;
  children: ReactNode;
};

export function DemoVideoButton({ className, children }: DemoVideoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      <DemoVideoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function DemoVideoSection() {
  return (
    <section id="demo" className="scroll-mt-20 border-t bg-zinc-900 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-6 px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
            Demonstração
          </p>
          <h2 className="mt-2 text-3xl font-bold">Veja o sistema em ação</h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Tour pelo dashboard, clientes, imóveis, contratos e configurações
            com dados de demonstração.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-700 shadow-2xl">
          <video
            src={DEMO_VIDEO_SRC}
            controls
            playsInline
            poster=""
            className="aspect-video w-full bg-black"
          >
            Seu navegador não suporta reprodução de vídeo.
          </video>
        </div>
      </div>
    </section>
  );
}

export function DemoVideoButtonWithIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <DemoVideoButton className={className}>
      <span className="inline-flex items-center gap-2">
        <Play size={18} />
        Ver demo
      </span>
    </DemoVideoButton>
  );
}
