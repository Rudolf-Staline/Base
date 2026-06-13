import { createPage, usePageRuntime } from "@basekit/core";
import {
  Button,
  DataTable,
  DateInput,
  EmptyState,
  FilterBar,
  Grid,
  MetricCard,
  Page,
  RenderNode,
  Stack,
} from "@basekit/ui";
import {
  filterOperationsByDate,
  operationColumns,
  operations,
  type Operation,
} from "../data";

type State = { startDate: string; endDate: string };
type Actions = {
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  resetFilters: () => void;
};
type Data = { operations: Operation[] };

/**
 * A full page defined declaratively with `createPage`. State + actions are
 * owned by the runtime; the `view` is a pure function returning a node tree.
 */
export const operationValidatedPage = createPage<State, Actions, Data>({
  id: "operations.validated",
  layout: "dashboard",
  title: "Opérations validées",
  state: { startDate: "", endDate: "" },
  // In a real app: data: async ({ services }) => ({ operations: await services.api.get("/operations/validated") })
  data: () => ({ operations }),
  actions: ({ setState }) => ({
    setStartDate: (startDate) => setState({ startDate }),
    setEndDate: (endDate) => setState({ endDate }),
    resetFilters: () => setState({ startDate: "", endDate: "" }),
  }),
  view: ({ state, actions, data }) => {
    const rows = filterOperationsByDate(data.operations ?? [], state);
    const totalIn = rows
      .filter((o) => o.type === "in")
      .reduce((s, o) => s + o.quantity, 0);
    const totalOut = rows
      .filter((o) => o.type === "out")
      .reduce((s, o) => s + o.quantity, 0);

    return Page({
      title: "Opérations validées",
      description: "Page construite par composition de nœuds déclaratifs.",
      content: Stack({
        gap: "lg",
        children: [
          FilterBar({
            title: "Filtrer par période",
            fields: [
              DateInput({
                id: "startDate",
                label: "Date de début",
                value: state.startDate,
                onValueChange: actions.setStartDate,
                clearable: true,
              }),
              DateInput({
                id: "endDate",
                label: "Date de fin",
                value: state.endDate,
                onValueChange: actions.setEndDate,
                clearable: true,
              }),
            ],
            actions: [
              Button({
                text: "Réinitialiser",
                iconLeft: "undo",
                tone: "neutral",
                variant: "soft",
                onClick: actions.resetFilters,
              }),
            ],
          }),
          Grid({
            columns: 3,
            children: [
              MetricCard({
                label: "Entrées",
                value: totalIn,
                tone: "success",
                icon: "arrow-right",
              }),
              MetricCard({
                label: "Sorties",
                value: totalOut,
                tone: "danger",
                icon: "arrow-right",
              }),
              MetricCard({
                label: "Lignes",
                value: rows.length,
                tone: "primary",
              }),
            ],
          }),
          rows.length > 0
            ? DataTable<Operation>({
                rows,
                columns: operationColumns,
                rowKey: "id",
                striped: true,
                hoverable: true,
                emptyText:
                  "Aucune opération validée trouvée pour cette période",
              })
            : EmptyState({
                title: "Aucune opération",
                description:
                  "Aucune opération validée trouvée pour cette période.",
                icon: "search",
              }),
        ],
      }),
    });
  },
});

export const OperationsPage = () => {
  const { node } = usePageRuntime(operationValidatedPage);
  return <RenderNode node={node} />;
};
