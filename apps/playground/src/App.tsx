import { useState } from "react";
import { DashboardLayout, IconButtonView, ToastProvider, type SidebarNavItem } from "@basekit/ui";
import {
  Actions,
  DataDisplay,
  DateCalendar,
  Feedback,
  Forms,
  Foundations,
  Inputs,
  Layout,
  Navigation,
  Overlays,
  Selection,
} from "./pages/ShowcasePages";

type PageId =
  | "foundations"
  | "actions"
  | "inputs"
  | "selection"
  | "date"
  | "overlays"
  | "navigation"
  | "data"
  | "feedback"
  | "forms"
  | "layout";

const pages: Record<PageId, React.ReactNode> = {
  foundations: <Foundations />,
  actions: <Actions />,
  inputs: <Inputs />,
  selection: <Selection />,
  date: <DateCalendar />,
  overlays: <Overlays />,
  navigation: <Navigation />,
  data: <DataDisplay />,
  feedback: <Feedback />,
  forms: <Forms />,
  layout: <Layout />,
};

const nav: { id: PageId; label: string; icon: SidebarNavItem["icon"] }[] = [
  { id: "foundations", label: "Foundations", icon: "info" },
  { id: "actions", label: "Actions", icon: "check" },
  { id: "inputs", label: "Inputs", icon: "settings" },
  { id: "selection", label: "Selection", icon: "filter" },
  { id: "date", label: "Date & Calendar", icon: "calendar" },
  { id: "overlays", label: "Overlays", icon: "external" },
  { id: "navigation", label: "Navigation", icon: "arrow-right" },
  { id: "data", label: "Data Display", icon: "menu" },
  { id: "feedback", label: "Feedback", icon: "info" },
  { id: "forms", label: "Forms", icon: "check" },
  { id: "layout", label: "Layout", icon: "menu" },
];

export const App = () => {
  const [page, setPage] = useState<PageId>("foundations");
  const [dark, setDark] = useState(false);
  return (
    <ToastProvider>
      <DashboardLayout
        brand={<span className="text-lg font-bold">Base<span className="text-primary">Kit</span></span>}
        navItems={nav.map((i) => ({ ...i, active: page === i.id, onClick: () => setPage(i.id) }))}
        topbarTitle={nav.find((n) => n.id === page)?.label}
        topbarActions={
          <IconButtonView
            icon="settings"
            aria-label="Basculer le thème"
            variant="outline"
            onClick={() => {
              const n = !dark;
              setDark(n);
              document.documentElement.classList.toggle("dark", n);
            }}
          />
        }
        footer="BaseKit — bibliothèque UI générique, design system et renderer déclaratif."
      >
        {pages[page]}
      </DashboardLayout>
    </ToastProvider>
  );
};
