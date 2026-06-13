import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPage } from "@basekit/core";
import { Alert, Button, Card, CardContent, CardHeader, Column, DashboardLayout, DataTable, DateInput, Grid, MetricCard, Page, RenderNode, Stack, Text, ButtonView, DateInputView, MetricCardView } from "@basekit/ui";
import "./styles.css";

type Operation = { id: string; date: string; name: string; type: "in" | "out"; quantity: number };
const operations: Operation[] = [
  { id: "1", date: "2026-06-01", name: "Entrée stock IA", type: "in", quantity: 42 },
  { id: "2", date: "2026-06-05", name: "Sortie dashboard", type: "out", quantity: 12 },
  { id: "3", date: "2026-06-11", name: "Entrée Bible app", type: "in", quantity: 18 },
];
const operationColumns = [
  Column<Operation>({ id: "date", header: "Date", accessor: "date" }),
  Column<Operation>({ id: "name", header: "Article", accessor: "name" }),
  Column<Operation>({ id: "quantity", header: "Quantité", cell: (operation) => Text({ value: operation.quantity, tone: operation.type === "in" ? "success" : "danger" }) }),
];

const OperationValidatedPage = createPage({
  id: "operations.validated",
  layout: "dashboard",
  state: { startDate: "", endDate: "" },
  actions: {} as { setStartDate: (v: string) => void; setEndDate: (v: string) => void; resetFilters: () => void },
  view: ({ state, actions, data }: { state: { startDate: string; endDate: string }; actions: any; data: { operations: Operation[] } }) =>
    Page({
      title: "Opérations validées",
      description: "Page assemblée avec des composants déclaratifs Basekit.",
      content: Stack({
        gap: "lg",
        children: [
          Alert({ tone: "primary", title: "Architecture", children: "Les filtres, métriques et tableaux sont des nœuds déclaratifs rendus par React." }),
          Card({
            variant: "elevated",
            children: [
              CardHeader({ title: "Filtrer par période", description: "DateInput reprend la philosophie fonctionnelle Mithril." }),
              CardContent({
                children: Grid({
                  columns: 3,
                  children: [
                    DateInput({ label: "Date de début", value: state.startDate, onValueChange: actions.setStartDate, clearable: true }),
                    DateInput({ label: "Date de fin", value: state.endDate, onValueChange: actions.setEndDate, clearable: true }),
                    Button({ text: "Réinitialiser", tone: "neutral", variant: "soft", onClick: actions.resetFilters }),
                  ] as any,
                }),
              }),
            ] as any,
          }),
          Grid({
            columns: 3,
            children: [
              MetricCard({ label: "Entrées", value: data.operations.filter((o) => o.type === "in").reduce((a, o) => a + o.quantity, 0), tone: "success" }),
              MetricCard({ label: "Sorties", value: data.operations.filter((o) => o.type === "out").reduce((a, o) => a + o.quantity, 0), tone: "danger" }),
              MetricCard({ label: "Total lignes", value: data.operations.length, tone: "primary" }),
            ] as any,
          }),
          DataTable({ rows: data.operations, columns: operationColumns, striped: true, hoverable: true, emptyText: "Aucune opération validée trouvée pour cette période", rowKey: (row: Operation) => row.id }),
        ] as any,
      }),
    }),
});

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filtered = useMemo(() => operations.filter((o) => (!startDate || o.date >= startDate) && (!endDate || o.date <= endDate)), [startDate, endDate]);
  const node = OperationValidatedPage.view({ state: { startDate, endDate }, actions: { setStartDate, setEndDate, resetFilters: () => { setStartDate(""); setEndDate(""); } }, data: { operations: filtered } });
  return <DashboardLayout><RenderNode node={node} /><section className="mt-10 space-y-4"><h2 className="text-xl font-semibold">Composants React classiques</h2><Card.View variant="outlined"><Card.Header><Card.Title>Usage JSX</Card.Title><Card.Description>Les mêmes briques restent utilisables en React standard.</Card.Description></Card.Header><Card.Content><div className="grid gap-4 md:grid-cols-2"><DateInputView label="Date React" clearable onValueChange={console.log} /><ButtonView tone="danger" variant="soft">Supprimer</ButtonView><MetricCardView label="Accuracy" value="92.4%" tone="success" /></div></Card.Content></Card.View></section></DashboardLayout>;
}
createRoot(document.getElementById("root")!).render(<App />);
