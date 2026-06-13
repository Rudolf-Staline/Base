import {
  BadgeView,
  ButtonView,
  CardContentView,
  CardHeaderView,
  CardView,
  GridView,
  HeadingView,
  MetricCardView,
  SectionView,
  StackView,
  TextView,
} from "@basekit/ui";

const tones = [
  "primary",
  "accent",
  "success",
  "warning",
  "danger",
  "neutral",
] as const;

export const Overview = () => (
  <StackView gap="xl">
    <div className="space-y-2">
      <HeadingView level={1} value="BaseKit" />
      <TextView
        tone="neutral"
        value="Socle frontend commun : design system, composants, tokens, page builder déclaratif, renderer React et couche API."
      />
    </div>

    <SectionView
      title="Métriques"
      description="Composées avec MetricCard et le système de tokens."
    >
      <GridView columns={4} gap="md">
        <MetricCardView
          label="Composants"
          value="50+"
          tone="primary"
          icon="settings"
          delta="V1"
          trend="up"
        />
        <MetricCardView
          label="Packages"
          value="5"
          tone="accent"
          icon="check-circle"
        />
        <MetricCardView
          label="Tokens couleur"
          value="21"
          tone="success"
          icon="info"
        />
        <MetricCardView label="Thèmes" value="Clair / Sombre" tone="warning" />
      </GridView>
    </SectionView>

    <SectionView
      title="Palette"
      description="Toutes les couleurs proviennent des tokens (--bk-*). Aucune couleur arbitraire."
    >
      <GridView columns={6} gap="sm">
        {tones.map((tone) => (
          <CardView key={tone} className="p-4">
            <StackView gap="sm" align="center">
              <span className={swatch(tone)} />
              <TextView textVariant="caption" tone="neutral" value={tone} />
            </StackView>
          </CardView>
        ))}
      </GridView>
    </SectionView>

    <SectionView
      title="Boutons"
      description="Variantes solid / soft / outline / ghost / link, 6 tons, 5 tailles."
    >
      <CardView>
        <CardHeaderView
          title="Variantes & tons"
          description="Tout passe par tone + variant."
        />
        <CardContentView>
          <StackView gap="md">
            <div className="flex flex-wrap gap-3">
              <ButtonView text="Solid" tone="primary" />
              <ButtonView text="Soft" tone="primary" variant="soft" />
              <ButtonView text="Outline" tone="primary" variant="outline" />
              <ButtonView text="Ghost" tone="primary" variant="ghost" />
              <ButtonView text="Link" tone="primary" variant="link" />
            </div>
            <div className="flex flex-wrap gap-3">
              {tones.map((tone) => (
                <ButtonView key={tone} text={tone} tone={tone} variant="soft" />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonView text="xs" size="xs" />
              <ButtonView text="sm" size="sm" />
              <ButtonView text="md" size="md" />
              <ButtonView text="lg" size="lg" />
              <ButtonView text="xl" size="xl" />
              <ButtonView text="Chargement" loading />
              <ButtonView text="Avec icône" iconLeft="plus" tone="success" />
            </div>
          </StackView>
        </CardContentView>
      </CardView>
    </SectionView>

    <SectionView title="Badges & texte">
      <div className="flex flex-wrap items-center gap-3">
        <BadgeView text="Neutre" />
        <BadgeView text="Primaire" tone="primary" />
        <BadgeView text="Succès" tone="success" dot />
        <BadgeView text="Danger" tone="danger" variant="solid" />
        <BadgeView text="Accent" tone="accent" variant="outline" />
      </div>
    </SectionView>
  </StackView>
);

const swatch = (tone: string) =>
  ({
    primary: "h-12 w-12 rounded-lg bg-primary",
    accent: "h-12 w-12 rounded-lg bg-accent",
    success: "h-12 w-12 rounded-lg bg-success",
    warning: "h-12 w-12 rounded-lg bg-warning",
    danger: "h-12 w-12 rounded-lg bg-danger",
    neutral: "h-12 w-12 rounded-lg bg-foreground",
  })[tone] ?? "h-12 w-12 rounded-lg bg-muted";
