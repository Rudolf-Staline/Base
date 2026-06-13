import { Badge, Text, type DataTableColumn } from "@basekit/ui";

export type Operation = {
  id: string;
  date: string;
  label: string;
  type: "in" | "out";
  quantity: number;
  status: "validated" | "pending";
};

export const operations: Operation[] = [
  {
    id: "1",
    date: "2026-06-01",
    label: "Entrée stock — modèle IA",
    type: "in",
    quantity: 42,
    status: "validated",
  },
  {
    id: "2",
    date: "2026-06-03",
    label: "Sortie dashboard ML",
    type: "out",
    quantity: 12,
    status: "validated",
  },
  {
    id: "3",
    date: "2026-06-07",
    label: "Entrée app biblique",
    type: "in",
    quantity: 18,
    status: "validated",
  },
  {
    id: "4",
    date: "2026-06-09",
    label: "Sortie outil trading",
    type: "out",
    quantity: 9,
    status: "validated",
  },
  {
    id: "5",
    date: "2026-06-11",
    label: "Entrée portfolio",
    type: "in",
    quantity: 27,
    status: "validated",
  },
];

/** Columns mixing plain accessors with declarative `UINode` cells. */
export const operationColumns: DataTableColumn<Operation>[] = [
  { id: "date", header: "Date", accessor: "date", width: "8rem" },
  { id: "label", header: "Opération", accessor: "label" },
  {
    id: "type",
    header: "Type",
    cell: (row) =>
      Badge({
        text: row.type === "in" ? "Entrée" : "Sortie",
        tone: row.type === "in" ? "success" : "danger",
        variant: "soft",
      }),
    align: "center",
  },
  {
    id: "quantity",
    header: "Quantité",
    align: "right",
    cell: (row) =>
      Text({
        value: row.quantity,
        tone: row.type === "in" ? "success" : "danger",
        weight: "semibold",
      }),
    footer: operations.reduce((sum, o) => sum + o.quantity, 0),
  },
];

export const filterOperationsByDate = (
  rows: Operation[],
  range: { startDate: string; endDate: string },
): Operation[] =>
  rows.filter(
    (op) =>
      (!range.startDate || op.date >= range.startDate) &&
      (!range.endDate || op.date <= range.endDate),
  );
