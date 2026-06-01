type EmptyStateProps = {
  message: string;
};

export function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-zinc-300
        bg-white
        p-10
        text-center
        text-zinc-500
      "
    >
      <p className="text-sm">
        {message}
      </p>
    </div>
  );
}