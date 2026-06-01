export function PropertyCardSkeleton() {
    return (
      <div
        className="
          bg-white
          border
          rounded-2xl
          overflow-hidden
          animate-pulse
        "
      >
        <div
          className="
            h-52
            bg-zinc-200
          "
        />
  
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <div
              className="
                h-5
                w-40
                bg-zinc-200
                rounded
              "
            />
  
            <div
              className="
                h-4
                w-24
                bg-zinc-100
                rounded
              "
            />
          </div>
  
          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  h-4
                  bg-zinc-100
                  rounded
                "
              />
            ))}
          </div>
  
          <div
            className="
              h-8
              w-32
              bg-zinc-200
              rounded
            "
          />
  
          <div
            className="
              flex
              gap-3
            "
          >
            <div
              className="
                h-10
                flex-1
                bg-zinc-200
                rounded-lg
              "
            />
  
            <div
              className="
                h-10
                flex-1
                bg-zinc-200
                rounded-lg
              "
            />
          </div>
        </div>
      </div>
    );
  }