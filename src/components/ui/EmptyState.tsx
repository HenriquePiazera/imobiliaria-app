interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-10
        text-center
        shadow-sm
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        {title}
      </h2>

      <p
        className="
          text-zinc-500
          mt-2
        "
      >
        {description}
      </p>
    </div>
  );
}