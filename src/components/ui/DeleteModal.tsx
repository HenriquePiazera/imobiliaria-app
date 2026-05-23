interface DeleteModalProps {
    open: boolean;
  
    title: string;
  
    description: string;
  
    onConfirm: () => void;
  
    onClose: () => void;
  
    loading?: boolean;
  }
  
  export function DeleteModal({
    open,
    title,
    description,
    onConfirm,
    onClose,
    loading,
  }: DeleteModalProps) {
    if (!open) return null;
  
    return (
      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/50
          flex
          items-center
          justify-center
          p-4
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            w-full
            max-w-md
            p-6
            space-y-6
            shadow-xl
          "
        >
          <div className="space-y-2">
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              {title}
            </h2>
  
            <p className="text-zinc-500">
              {description}
            </p>
          </div>
  
          <div
            className="
              flex
              justify-end
              gap-3
            "
          >
            <button
              onClick={onClose}
              disabled={loading}
              className="
                px-4
                py-2
                rounded-xl
                border
              "
            >
              Cancelar
            </button>
  
            <button
              onClick={onConfirm}
              disabled={loading}
              className="
                px-4
                py-2
                rounded-xl
                bg-red-600
                hover:bg-red-700
                transition-colors
                text-white
              "
            >
              {loading
                ? "Excluindo..."
                : "Excluir"}
            </button>
          </div>
        </div>
      </div>
    );
  }