type ClientFiltersProps = {
    search: string;
  
    onSearchChange: (
      value: string
    ) => void;
  
    totalClients: number;
  };
  
  export function ClientFilters({
    search,
    onSearchChange,
    totalClients,
  }: ClientFiltersProps) {
    return (
      <div
        className="
          flex
          flex-col
          gap-4
          rounded-xl
          border
          border-zinc-200
          bg-white
          p-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            px-4
            py-2
            text-sm
            outline-none
          "
        />
  
        <div
          className="
            text-sm
            text-zinc-500
            whitespace-nowrap
          "
        >
          Total de clientes:{" "}
          <strong>
            {totalClients}
          </strong>
        </div>
      </div>
    );
  }