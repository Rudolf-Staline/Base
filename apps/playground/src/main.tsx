import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPage } from "@basekit/core";
import { Alert, Button, ButtonView, Card, Column, DashboardLayout, DataTable, DateInput, DateInputView, EmptyState, FilterBar, Grid, MetricCard, MetricCardView, Page, ReaderLayout, RenderNode, Stack, StackView, Text, type DataTableColumn } from "@basekit/ui";
import "./styles.css";

type Operation = { id: string; date: string; name: string; type: "in" | "out"; quantity: number };
type OperationState = { startDate: string; endDate: string };
type OperationActions = { setStartDate: (value: string) => void; setEndDate: (value: string) => void; resetFilters: () => void };
type OperationData = { operations: Operation[] };
const operations: Operation[] = [
  { id: "1", date: "2026-06-01", name: "Entrée stock IA", type: "in", quantity: 42 },
  { id: "2", date: "2026-06-05", name: "Sortie dashboard", type: "out", quantity: 12 },
  { id: "3", date: "2026-06-11", name: "Entrée Bible app", type: "in", quantity: 18 },
];
const operationColumns: DataTableColumn<Operation>[] = [
  Column<Operation>({ id: "date", header: "Date", accessor: "date" }),
  Column<Operation>({ id: "name", header: "Article", accessor: "name" }),
  Column<Operation>({ id: "quantity", header: "Quantité", cell: (operation) => Text({ value: operation.quantity, tone: operation.type === "in" ? "success" : "danger" }) }),
];
export const OperationValidatedPage = createPage<OperationState, OperationActions, OperationData>({
  id: "operations.validated",
  layout: "dashboard",
  state: { startDate: "", endDate: "" },
  view: ({ state, actions, data }) => Page({
    title: "Opérations validées",
    description: "Page construite par composition de nœuds déclaratifs Basekit.",
    content: Stack({ gap: "lg", children: [
      FilterBar({ title: "Filtrer par période", icon: "filter", fields: [
        DateInput({ label: "Date de début", value: state.startDate, onValueChange: actions.setStartDate, clearable: true }),
        DateInput({ label: "Date de fin", value: state.endDate, onValueChange: actions.setEndDate, clearable: true }),
      ], actions: [Button({ text: "Réinitialiser", iconLeft: "↺", tone: "neutral", variant: "soft", onClick: actions.resetFilters })] }),
      Grid({ columns: 3, children: [
        MetricCard({ label: "Entrées", value: data.operations.filter((o) => o.type === "in").reduce((sum, o) => sum + o.quantity, 0), tone: "success" }),
        MetricCard({ label: "Sorties", value: data.operations.filter((o) => o.type === "out").reduce((sum, o) => sum + o.quantity, 0), tone: "danger" }),
        MetricCard({ label: "Total lignes", value: data.operations.length, tone: "primary" }),
      ] }),
      data.operations.length ? DataTable({ rows: data.operations, columns: operationColumns, rowKey: "id", striped: true, hoverable: true, emptyText: "Aucune opération validée trouvée pour cette période" }) : EmptyState({ title: "Aucune opération", description: "Aucune opération validée trouvée pour cette période" }),
    ] }),
  }),
});

const DashboardDemo = () => <RenderNode node={Page({ title: "Dashboard", content: Grid({ columns: 3, children: [MetricCard({ label: "MRR", value: "12k€", tone: "success" }), MetricCard({ label: "Tickets", value: 8, tone: "warning" }), MetricCard({ label: "Disponibilité", value: "99.9%", tone: "primary" })] }) })} />;
const FormDemo = () => <RenderNode node={Page({ title: "Form", content: Stack({ children: [InputNode("Email"), DateInput({ label: "Date", clearable: true }), Button({ text: "Enregistrer", tone: "primary" })] }) })} />;
const InputNode = (label: string) => ({ component: "Input", props: { label, placeholder: "demo@basekit.dev" }, children: [] });
const TableDemo = () => <RenderNode node={Page({ title: "DataTable", content: DataTable({ rows: operations, columns: operationColumns, rowKey: "id", compact: true, striped: true }) })} />;
const VariantsDemo = () => <RenderNode node={Page({ title: "Variantes", content: Stack({ children: [Alert({ title: "Tokens", tone: "primary", children: "Les couleurs passent par tone/variant." }), Grid({ columns: 3, children: [Button({ text: "Primary", tone: "primary" }), Button({ text: "Danger soft", tone: "danger", variant: "soft" }), Button({ text: "Success outline", tone: "success", variant: "outline" })] })] }) })} />;
const ReaderDemo = () => <ReaderLayout sidebar={<Card.View><Card.Content>Genèse<br />Exode<br />Matthieu</Card.Content></Card.View>} secondaryPanel={<Card.View><Card.Content>Notes et références</Card.Content></Card.View>}><h1>ReaderLayout demo</h1><p>Zone principale de lecture pensée pour une application biblique, avec navigation latérale et panneau secondaire facultatif.</p></ReaderLayout>;

function OperationDemo() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filtered = useMemo(() => operations.filter((operation) => (!startDate || operation.date >= startDate) && (!endDate || operation.date <= endDate)), [startDate, endDate]);
  const node = OperationValidatedPage.view({ state: { startDate, endDate }, actions: { setStartDate, setEndDate, resetFilters: () => { setStartDate(""); setEndDate(""); } }, data: { operations: filtered } });
  return <RenderNode node={node} />;
}
function App() {
  const [page, setPage] = useState("operations");
  const nav = ["dashboard", "form", "table", "operations", "reader", "variants"];
  if (page === "reader") return <><button className="m-4 rounded border border-[var(--bk-border)] px-3 py-2" onClick={() => setPage("operations")}>Retour</button><ReaderDemo /></>;
  return <DashboardLayout sidebar={<StackView gap="sm"><b>basekit</b>{nav.map((item) => <ButtonView key={item} text={item} variant={page === item ? "solid" : "ghost"} tone="primary" onClick={() => setPage(item)} fullWidth />)}</StackView>}><StackView gap="xl">{page === "dashboard" && <DashboardDemo />}{page === "form" && <FormDemo />}{page === "table" && <TableDemo />}{page === "operations" && <OperationDemo />}{page === "variants" && <VariantsDemo />}<section className="space-y-4"><h2 className="text-xl font-semibold text-[var(--bk-text)]">Composants React classiques</h2><Card.View variant="outlined"><Card.Header><Card.Title>Usage JSX</Card.Title><Card.Description>Les mêmes briques restent utilisables en React standard.</Card.Description></Card.Header><Card.Content><div className="grid gap-4 md:grid-cols-3"><DateInputView label="Date React" clearable onValueChange={console.log} /><ButtonView tone="danger" variant="soft">Supprimer</ButtonView><MetricCardView label="Accuracy" value="92.4%" tone="success" /></div></Card.Content></Card.View></section></StackView></DashboardLayout>;
}
createRoot(document.getElementById("root")!).render(<App />);
