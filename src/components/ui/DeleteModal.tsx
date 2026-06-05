type DeleteModalProps = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;

  // 🔥 NOVO (opcional)
  confirmText?: string;
  cancelText?: string;
};

export function DeleteModal({
  open,
  title,
  description,
  onConfirm,
  onClose,
  loading = false,
  confirmText = "Excluir",
  cancelText = "Cancelar",
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="text-sm text-zinc-600">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            {loading ? "Carregando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}