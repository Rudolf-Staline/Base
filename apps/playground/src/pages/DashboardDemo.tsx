import {
  CardContentView,
  CardHeaderView,
  CardView,
  DataTableView,
  GridView,
  MetricCardView,
  SectionView,
  StackView,
  TimelineView,
} from "@basekit/ui";
import { operationColumns, operations } from "../data";

export const DashboardDemo = () => (
  <StackView gap="xl">
    <GridView columns={4} gap="md">
      <MetricCardView
        label="Revenu mensuel"
        value="12 480 €"
        tone="success"
        delta="+8.2%"
        trend="up"
        icon="arrow-right"
      />
      <MetricCardView
        label="Utilisateurs actifs"
        value="3 192"
        tone="primary"
        delta="+114"
        trend="up"
      />
      <MetricCardView
        label="Tickets ouverts"
        value="8"
        tone="warning"
        delta="-3"
        trend="down"
      />
      <MetricCardView
        label="Disponibilité"
        value="99.96%"
        tone="accent"
        helpText="30 derniers jours"
      />
    </GridView>

    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <SectionView title="Dernières opérations">
        <DataTableView
          rows={operations}
          columns={operationColumns}
          rowKey="id"
          striped
          hoverable
          compact
        />
      </SectionView>
      <SectionView title="Activité">
        <CardView>
          <CardHeaderView title="Flux récent" />
          <CardContentView>
            <TimelineView
              items={[
                {
                  id: "1",
                  title: "Déploiement v0.1",
                  description: "Build réussi en production",
                  timestamp: "il y a 2h",
                  tone: "success",
                },
                {
                  id: "2",
                  title: "Nouvelle métrique",
                  description: "Accuracy 92.4%",
                  timestamp: "il y a 5h",
                  tone: "primary",
                },
                {
                  id: "3",
                  title: "Alerte quota",
                  description: "API proche de la limite",
                  timestamp: "hier",
                  tone: "warning",
                },
              ]}
            />
          </CardContentView>
        </CardView>
      </SectionView>
    </div>
  </StackView>
);
