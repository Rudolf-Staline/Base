import { useState } from "react";
import {
  DashboardLayout,
  IconButtonView,
  ToastProvider,
  type SidebarNavItem,
} from "@basekit/ui";
import { Overview } from "./pages/Overview";
import { Components } from "./pages/Components";
import { OperationsPage } from "./pages/OperationsPage";
import { DashboardDemo } from "./pages/DashboardDemo";
import { FormDemo } from "./pages/FormDemo";
import { ReaderDemo } from "./pages/ReaderDemo";
import { ApiDemo } from "./pages/ApiDemo";

type PageId =
  | "overview"
  | "components"
  | "operations"
  | "dashboard"
  | "form"
  | "reader"
  | "api";

const nav: { id: PageId; label: string; icon: SidebarNavItem["icon"] }[] = [
  { id: "overview", label: "Overview", icon: "info" },
  { id: "components", label: "Composants", icon: "settings" },
  { id: "operations", label: "Opérations (Page)", icon: "filter" },
  { id: "dashboard", label: "Dashboard", icon: "menu" },
  { id: "form", label: "Formulaire", icon: "check" },
  { id: "reader", label: "Reader", icon: "chevron-right" },
  { id: "api", label: "API", icon: "external" },
];

const pages: Record<PageId, React.ReactNode> = {
  overview: <Overview />,
  components: <Components />,
  operations: <OperationsPage />,
  dashboard: <DashboardDemo />,
  form: <FormDemo />,
  reader: <ReaderDemo />,
  api: <ApiDemo />,
};

export const App = () => {
  const [page, setPage] = useState<PageId>("overview");
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const navItems: SidebarNavItem[] = nav.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    active: page === item.id,
    onClick: () => setPage(item.id),
  }));

  // The reader demo brings its own full-page layout, shown standalone.
  if (page === "reader") {
    return (
      <ToastProvider>
        <div className="relative">
          <div className="absolute left-4 top-4 z-10">
            <IconButtonView
              icon="chevron-left"
              aria-label="Retour"
              variant="soft"
              onClick={() => setPage("overview")}
            />
          </div>
          <ReaderDemo />
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <DashboardLayout
        brand={
          <span className="text-lg font-bold tracking-tight text-foreground">
            Base<span className="text-primary">Kit</span>
          </span>
        }
        navItems={navItems}
        topbarTitle={nav.find((n) => n.id === page)?.label}
        topbarActions={
          <IconButtonView
            icon={dark ? "info" : "settings"}
            aria-label="Basculer le thème clair/sombre"
            variant="outline"
            onClick={toggleTheme}
            title={dark ? "Passer en clair" : "Passer en sombre"}
          />
        }
        footer={
          <span>
            BaseKit V1 — design system, page builder déclaratif & renderer
            React.
          </span>
        }
      >
        {pages[page]}
      </DashboardLayout>
    </ToastProvider>
  );
};
