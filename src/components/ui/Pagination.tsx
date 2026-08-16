"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
      >
        Anterior
      </button>

      <span className="text-sm text-zinc-500">
        Página {page} de {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
      >
        Próxima
      </button>
    </div>
  );
}
