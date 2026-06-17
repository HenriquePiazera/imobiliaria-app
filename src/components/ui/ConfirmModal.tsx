"use client";

import { Button } from "@/components/ui/Button";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onClose,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >
        <h2 className="text-xl font-semibold text-zinc-900">
          {title}
        </h2>

        <p className="mt-3 text-sm text-zinc-600">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}