import { Contract } from "@/types/contract";

export function getExpiringContracts(
  contracts: Contract[],
  withinDays = 30,
  referenceDate = new Date()
): Contract[] {
  const limit = new Date(referenceDate);
  limit.setDate(limit.getDate() + withinDays);

  return contracts
    .filter((contract) => {
      if (contract.status !== "active" || contract.type !== "rent") {
        return false;
      }

      if (!contract.endDate) return false;

      const endDate = new Date(contract.endDate);
      return endDate >= referenceDate && endDate <= limit;
    })
    .sort(
      (a, b) =>
        new Date(a.endDate!).getTime() - new Date(b.endDate!).getTime()
    );
}

export function getDaysUntil(dateString: string, referenceDate = new Date()) {
  const target = new Date(dateString);
  const diff = target.getTime() - referenceDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
