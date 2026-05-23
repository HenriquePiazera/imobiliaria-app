export function formatMoney(value: number | string) {
    const numberValue =
      typeof value === "string"
        ? Number(value)
        : value;
  
    if (isNaN(numberValue)) return "R$ 0,00";
  
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }