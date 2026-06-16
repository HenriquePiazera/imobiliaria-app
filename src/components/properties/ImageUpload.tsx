"use client";

import { useRef, useState } from "react";
import { UploadImageService } from "@/services/upload/upload-image.service";
import { Button } from "@/components/ui/Button";

type Props = {
  onUpload: (url: string) => void;
};

export function ImageUpload({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  async function handleUpload() {
    if (!file) return;

    try {
      setLoading(true);

      const service = new UploadImageService();
      const url = await service.upload(file);

      onUpload(url);

      setFile(null);
      setPreview("");

      // 🔥 importante: limpa o input também
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* INPUT REAL (HIDDEN) */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* SELECT BUTTON */}
      <Button type="button" onClick={openFilePicker}>
        Selecionar imagem
      </Button>

      {/* PREVIEW */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded"
        />
      )}

      {/* UPLOAD */}
      <Button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Enviando..." : "Upload imagem"}
      </Button>
    </div>
  );
}