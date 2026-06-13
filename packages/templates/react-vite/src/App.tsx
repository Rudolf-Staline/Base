import {
  DashboardLayout,
  GridView,
  MetricCardView,
  SectionView,
  type SidebarNavItem,
} from "@basekit/ui";

const nav: SidebarNavItem[] = [
  { id: "home", label: "Accueil", icon: "menu", active: true },
  { id: "settings", label: "Réglages", icon: "settings" },
];

export const App = () => (
  <DashboardLayout brand={<strong>My App</strong>} navItems={nav} topbarTitle="Accueil">
    <SectionView title="Bienvenue" description="Démarré avec @basekit/ui.">
      <GridView columns={3} gap="md">
        <MetricCardView label="Utilisateurs" value="0" tone="primary" />
        <MetricCardView label="Revenu" value="0 €" tone="success" />
        <MetricCardView label="Tâches" value="0" tone="warning" />
      </GridView>
    </SectionView>
  </DashboardLayout>
);
