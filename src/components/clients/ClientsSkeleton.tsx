export function ClientsSkeleton() {
    return (
      <div className="space-y-4">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="
              animate-pulse
              bg-white
              rounded-xl
              p-4
              shadow
              h-24
            "
          />
        ))}
      </div>
    );
  }