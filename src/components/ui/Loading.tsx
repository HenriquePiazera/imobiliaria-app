export function Loading() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        p-10
      "
    >
      <div
        className="
          h-10
          w-10
          rounded-full
          border-4
          border-zinc-300
          border-t-zinc-900
          animate-spin
        "
      />
    </div>
  );
}
