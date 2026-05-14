type EmptyStateProps = {
  message: string;
};

export function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div
      className="
        bg-white
        border
        border-dashed
        border-zinc-300
        rounded-xl
        p-10
        text-center
      "
    >
      <p className="text-zinc-500">
        {message}
      </p>
    </div>
  );
}