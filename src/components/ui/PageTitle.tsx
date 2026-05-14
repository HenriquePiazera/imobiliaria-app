type PageTitleProps = {
    title: string;
    subtitle?: string;
  };
  
  export function PageTitle({
    title,
    subtitle,
  }: PageTitleProps) {
    return (
      <div className="mb-6">
        <h1
          className="
            text-3xl
            font-bold
            text-zinc-900
          "
        >
          {title}
        </h1>
  
        {subtitle && (
          <p className="text-zinc-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    );
  }