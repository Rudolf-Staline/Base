import { createRoot } from "react-dom/client";
import "@basekit/tokens/theme.css";
import "./styles.css";
import {
  AlertView,
  BadgeView,
  ButtonView,
  CardContentView,
  CardHeaderView,
  CardView,
  Column,
  DataTableView,
  DateInputView,
  InputView,
  MetricCardView,
  SectionView,
  StackView,
} from "@basekit/ui";

type Row = { id: number; component: string; status: string };
const rows: Row[] = [
  { id: 1, component: "Button", status: "stable" },
  { id: 2, component: "Input", status: "stable" },
  { id: 3, component: "DataTable", status: "stable" },
];
const columns = [
  Column<Row>({ id: "component", header: "Composant", accessor: "component" }),
  Column<Row>({
    id: "status",
    header: "État",
    cell: (row) =>
      BadgeView({ text: row.status, tone: "success", variant: "soft" }),
  }),
];

const Docs = () => (
  <main className="mx-auto max-w-4xl space-y-8 p-8">
    <header className="space-y-1">
      <h1 className="text-3xl font-bold text-foreground">
        BaseKit — Référence
      </h1>
      <p className="text-muted-foreground">
        Aperçu léger des composants. Le playground reste la vitrine complète.
      </p>
    </header>

    <AlertView tone="primary" title="V1">
      Cette page documente les composants clés sans Storybook pour limiter la
      complexité initiale.
    </AlertView>

    <SectionView title="Primitives">
      <StackView gap="md">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonView text="Bouton" />
          <ButtonView text="Soft" variant="soft" tone="accent" />
          <BadgeView text="Badge" tone="success" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputView label="Input" placeholder="rudolf@example.com" />
          <DateInputView label="DateInput" clearable />
        </div>
      </StackView>
    </SectionView>

    <SectionView title="Data">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCardView
          label="Accuracy"
          value="92.4%"
          tone="success"
          delta="+1.2%"
          trend="up"
        />
        <CardView variant="elevated">
          <CardHeaderView
            title="Card"
            description="Composition par sous-composants"
          />
          <CardContentView>
            <DataTableView<Row> rows={rows} columns={columns} rowKey="id" />
          </CardContentView>
        </CardView>
      </div>
    </SectionView>
  </main>
);

createRoot(document.getElementById("root")!).render(<Docs />);
