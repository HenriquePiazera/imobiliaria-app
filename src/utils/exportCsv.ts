export function exportToCsv<T extends object>(
  filename: string,
  rows: T[],
  columns: { key: keyof T; label: string }[]
) {
  if (rows.length === 0) return;

  const header = columns.map((column) => column.label).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((column) => {
          const value = row[column.key];
          const text = value == null ? "" : String(value);
          return `"${text.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([`${header}\n${body}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
