interface DashboardCardProps {
    title: string;
  
    value: number | string;
  }
  
  export function DashboardCard({
    title,
    value,
  }: DashboardCardProps) {
    return (
      <div
        className="
          bg-white
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >
        <p
          className="
            text-sm
            text-zinc-500
            mb-2
          "
        >
          {title}
        </p>
  
        <h2
          className="
            text-3xl
            font-bold
          "
        >
          {value}
        </h2>
      </div>
    );
  }