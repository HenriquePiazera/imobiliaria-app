"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  onFileSelect: (file: File | null) => void;
};

export function ImageUpload({ onFileSelect }: Props) {
  const [preview, setPreview] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    onFileSelect(file);

    if (!file) {
      setPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }

  function handleOpenFilePicker() {
    inputRef.current?.click();
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        type="button"
        onClick={handleOpenFilePicker}
      >
        Selecionar imagem
      </Button>

      {preview && (
        <img
          src={preview}
          alt="Pré-visualização do imóvel"
          className="h-48 w-full rounded-lg object-cover border"
        />
      )}
    </div>
  );
}