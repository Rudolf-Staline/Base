/**
 * Dashboard demo — reference snippet (not compiled by the monorepo).
 * Copy into a consumer app that depends on @basekit/ui.
 */
import {
  DashboardLayout,
  DataTableView,
  GridView,
  MetricCardView,
  SectionView,
  type DataTableColumn,
  type SidebarNavItem,
} from "@basekit/ui";

type Sale = { id: string; customer: string; amount: number; status: string };

const rows: Sale[] = [
  { id: "1", customer: "Acme", amount: 1290, status: "payé" },
  { id: "2", customer: "Globex", amount: 540, status: "en attente" },
];

const columns: DataTableColumn<Sale>[] = [
  { id: "customer", header: "Client", accessor: "customer" },
  { id: "status", header: "Statut", accessor: "status" },
  { id: "amount", header: "Montant", align: "right", accessor: (r) => `${r.amount} €` },
];

const nav: SidebarNavItem[] = [
  { id: "home", label: "Accueil", icon: "menu", active: true },
  { id: "sales", label: "Ventes", icon: "arrow-right" },
  { id: "settings", label: "Réglages", icon: "settings" },
];

export const DashboardExample = () => (
  <DashboardLayout
    brand={<strong>Acme Ops</strong>}
    navItems={nav}
    topbarTitle="Tableau de bord"
  >
    <GridView columns={3} gap="md">
      <MetricCardView label="Revenu" value="12 480 €" tone="success" delta="+8%" trend="up" />
      <MetricCardView label="Commandes" value="312" tone="primary" />
      <MetricCardView label="Litiges" value="4" tone="warning" />
    </GridView>

    <SectionView title="Ventes récentes">
      <DataTableView rows={rows} columns={columns} rowKey="id" striped hoverable />
    </SectionView>
  </DashboardLayout>
);
