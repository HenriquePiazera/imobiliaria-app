type ClientsStatsProps = {
    totalClients: number;
    clientsWithDocument: number;
    clientsWithCity: number;
    clientsCreatedToday: number;
  };
  
  export function ClientsStats({
    totalClients,
    clientsWithDocument,
    clientsWithCity,
    clientsCreatedToday,
  }: ClientsStatsProps) {
    const stats = [
      {
        title: "Total de Clientes",
        value: totalClients,
      },
      {
        title: "Com CPF/CNPJ",
        value: clientsWithDocument,
      },
      {
        title: "Com Cidade",
        value: clientsWithCity,
      },
      {
        title: "Cadastrados Hoje",
        value: clientsCreatedToday,
      },
    ];
  
    return (
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-xl
              p-5
            "
          >
            <p
              className="
                text-sm
                text-zinc-400
              "
            >
              {stat.title}
            </p>
  
            <h2
              className="
                text-3xl
                font-bold
                mt-2
                text-white
              "
            >
              {stat.value}
            </h2>
          </div>
        ))}
      </div>
    );
  }