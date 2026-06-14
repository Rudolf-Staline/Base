import { useState, type ReactNode } from "react";
import {
  AlertView,
  AutocompleteView,
  AvatarView,
  BadgeView,
  BreadcrumbView,
  ButtonGroupView,
  ButtonView,
  CalendarView,
  CalloutView,
  CardView,
  CheckboxGroupView,
  CheckboxView,
  ComboboxView,
  ContainerView,
  DataTableView,
  DatePickerView,
  DateInputView,
  DateTimeInputView,
  DescriptionListView,
  DividerView,
  DrawerView,
  DropdownView,
  EmptyStateView,
  ErrorStateView,
  FormActionsView,
  FormFieldView,
  FormSectionView,
  FormView,
  GridView,
  IconButtonView,
  InlineView,
  ListView,
  MetricCardView,
  ModalView,
  MultiSelectView,
  NumberInputView,
  PaginationView,
  PasswordInputView,
  PopoverView,
  ProgressView,
  RadioGroupView,
  RangeSliderView,
  SearchInputView,
  SelectView,
  SkeletonView,
  SliderView,
  SpinnerView,
  StackView,
  StatBlockView,
  SwitchView,
  TableView,
  TableBodyView,
  TableCaptionView,
  TableCellView,
  TableHeadView,
  TableHeaderView,
  TableRowView,
  TextInputView,
  TextareaView,
  TimelineView,
  TimePickerView,
  ToggleView,
  ToggleGroupView,
  TooltipView,
  type BadgeProps,
  type ButtonProps,
} from "@basekit/ui";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const tones: NonNullable<BadgeProps["tone"]>[] = ["primary", "accent", "success", "warning", "danger"];
const variants: NonNullable<ButtonProps["variant"]>[] = ["solid", "soft", "outline", "ghost", "link"];
const sizes: NonNullable<ButtonProps["size"]>[] = ["xs", "sm", "md", "lg", "xl"];

/* ------------------------------------------------------------------ */
/* Showcase helpers                                                   */
/* ------------------------------------------------------------------ */

const ShowcaseSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <ContainerView className="py-6">
    <h1 className="mb-4 text-2xl font-bold">{title}</h1>
    <StackView gap="md">{children}</StackView>
  </ContainerView>
);

const ComponentCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <CardView className="p-4">
    <p className="mb-3 text-bk-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
    {children}
  </CardView>
);

const ShowcaseGrid = ({ columns = 2, children }: { columns?: 1 | 2 | 3; children: ReactNode }) => (
  <GridView columns={columns}>{children}</GridView>
);

/* ------------------------------------------------------------------ */
/* Pages                                                              */
/* ------------------------------------------------------------------ */

export const Foundations = () => (
  <ShowcaseSection title="Foundations">
    <CardView className="p-4">
      <p>Tokens BaseKit pour couleurs, typographie, spacing, radius, shadows et thèmes clair/sombre.</p>
    </CardView>
    <ComponentCard title="Tons">
      <InlineView wrap>
        {tones.map((tone) => (
          <BadgeView key={tone} tone={tone}>{tone}</BadgeView>
        ))}
      </InlineView>
    </ComponentCard>
    <ComponentCard title="Typographie">
      <StackView gap="xs">
        <p className="text-bk-xl font-bold">Titre — text-bk-xl</p>
        <p className="text-bk-lg">Sous-titre — text-bk-lg</p>
        <p className="text-bk-md">Corps — text-bk-md</p>
        <p className="text-bk-sm text-muted-foreground">Légende — text-bk-sm</p>
      </StackView>
    </ComponentCard>
    <ComponentCard title="Radius">
      <InlineView wrap>
        {(["sm", "md", "lg", "xl", "full"] as const).map((r) => (
          <span key={r} className={`inline-flex h-12 w-12 items-center justify-center border border-border bg-surface-muted text-bk-xs rounded-${r}`}>{r}</span>
        ))}
      </InlineView>
    </ComponentCard>
    <ComponentCard title="Shadows">
      <InlineView wrap>
        {(["sm", "md", "soft", "strong"] as const).map((s) => (
          <span key={s} className={`inline-flex h-12 w-20 items-center justify-center rounded-md bg-surface text-bk-xs shadow-${s}`}>{s}</span>
        ))}
      </InlineView>
    </ComponentCard>
  </ShowcaseSection>
);

export const Actions = () => {
  const [pressed, setPressed] = useState(false);
  return (
    <ShowcaseSection title="Actions">
      <ComponentCard title="Variants">
        <InlineView wrap>
          {variants.map((variant) => (
            <ButtonView key={variant} variant={variant} tone="primary" text={variant} />
          ))}
        </InlineView>
      </ComponentCard>
      <ComponentCard title="Tones">
        <InlineView wrap>
          {tones.map((tone) => (
            <ButtonView key={tone} tone={tone} text={tone} />
          ))}
        </InlineView>
      </ComponentCard>
      <ComponentCard title="Sizes">
        <InlineView wrap align="center">
          {sizes.map((size) => (
            <ButtonView key={size} size={size} text={size} />
          ))}
        </InlineView>
      </ComponentCard>
      <ComponentCard title="States & IconButton">
        <InlineView wrap>
          <ButtonView loading text="Loading" />
          <ButtonView disabled text="Disabled" />
          <IconButtonView icon="check" aria-label="Valider" variant="outline" />
          <IconButtonView icon="trash" aria-label="Supprimer" tone="danger" variant="soft" />
        </InlineView>
      </ComponentCard>
      <ComponentCard title="ButtonGroup">
        <InlineView wrap gap="md">
          <ButtonGroupView attached variant="outline" tone="neutral" aria-label="Format">
            <ButtonView text="Gauche" />
            <ButtonView text="Centre" />
            <ButtonView text="Droite" />
          </ButtonGroupView>
          <ButtonGroupView orientation="vertical" attached variant="outline">
            <ButtonView text="Haut" />
            <ButtonView text="Bas" />
          </ButtonGroupView>
        </InlineView>
      </ComponentCard>
      <ComponentCard title="Toggle & ToggleGroup">
        <InlineView wrap gap="md" align="center">
          <ToggleView text="Activer" pressed={pressed} onPressedChange={setPressed} />
          <ToggleGroupView
            type="single"
            defaultValue="b"
            options={[
              { value: "a", label: "Jour" },
              { value: "b", label: "Semaine" },
              { value: "c", label: "Mois" },
            ]}
          />
          <ToggleGroupView
            type="multiple"
            defaultValues={["a"]}
            options={[
              { value: "a", label: "Gras" },
              { value: "b", label: "Italique" },
              { value: "c", label: "Souligné" },
            ]}
          />
        </InlineView>
      </ComponentCard>
    </ShowcaseSection>
  );
};

export const Inputs = () => {
  const [search, setSearch] = useState("abc");
  return (
    <ShowcaseSection title="Inputs">
      <ShowcaseGrid>
        <TextInputView label="Utilisateur" placeholder="Nom" />
        <NumberInputView label="Quantité" minValue={0} maxValue={100} clampOnBlur />
        <PasswordInputView label="Mot de passe" />
        <SearchInputView label="Recherche" value={search} clearable onValueChange={setSearch} />
        <TextInputView type="email" label="Email" />
        <TextInputView type="tel" label="Téléphone" />
        <TextInputView type="url" label="URL" />
        <TextareaView label="Description" showCount maxLength={120} />
        <DateInputView label="Date" clearable />
        <TimePickerView label="Heure" />
        <DateTimeInputView label="Date et heure" />
      </ShowcaseGrid>
      <ComponentCard title="Sliders">
        <StackView gap="md">
          <SliderView label="Quantité" defaultValue={40} showValue />
          <RangeSliderView label="Intervalle" defaultValue={[20, 80]} showValue />
        </StackView>
      </ComponentCard>
    </ShowcaseSection>
  );
};

export const Selection = () => (
  <ShowcaseSection title="Selection">
    <ShowcaseGrid>
      <ComponentCard title="Radio & Checkbox">
        <StackView gap="sm">
          <RadioGroupView label="Type" options={options} />
          <CheckboxView label="Option active" />
          <CheckboxGroupView label="Options" options={options} />
        </StackView>
      </ComponentCard>
      <ComponentCard title="Switch & Select">
        <StackView gap="sm">
          <SwitchView label="Statut" />
          <SelectView label="Statut" options={options} placeholder="Choisir…" />
          <MultiSelectView label="Choix multiples" options={options} />
        </StackView>
      </ComponentCard>
      <ComponentCard title="Combobox">
        <ComboboxView label="Catégorie" options={options} clearable placeholder="Rechercher…" />
      </ComponentCard>
      <ComponentCard title="Autocomplete">
        <AutocompleteView label="Élément" options={options} clearable placeholder="Rechercher…" />
      </ComponentCard>
    </ShowcaseGrid>
  </ShowcaseSection>
);

export const DateCalendar = () => (
  <ShowcaseSection title="Date & Calendar">
    <InlineView align="start" wrap gap="md">
      <CalendarView />
      <CalendarView minDate="2026-06-10" maxDate="2026-06-24" disabledDates={["2026-06-17"]} />
      <StackView gap="sm">
        <DatePickerView label="Date" clearable />
        <TimePickerView label="Heure" />
      </StackView>
    </InlineView>
  </ShowcaseSection>
);

export const Overlays = () => {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  return (
    <ShowcaseSection title="Overlays">
      <InlineView wrap gap="md" align="center">
        <ButtonView text="Ouvrir Modal" onClick={() => setModal(true)} />
        <ButtonView text="Ouvrir Drawer" variant="outline" onClick={() => setDrawer(true)} />
        <DropdownView trigger={<ButtonView text="Dropdown" variant="outline" />} items={[{ id: "a", label: "Item A" }, { id: "b", label: "Item B" }]} />
        <TooltipView content="Information contextuelle">
          <ButtonView text="Survoler" variant="soft" />
        </TooltipView>
        <PopoverView title="Popover" trigger={<ButtonView text="Popover" variant="soft" />}>
          <p>Contenu générique affiché dans un panneau flottant.</p>
        </PopoverView>
      </InlineView>
      <ModalView open={modal} onClose={() => setModal(false)} title="Modal" description="Boîte de dialogue générique.">
        Contenu générique.
      </ModalView>
      <DrawerView open={drawer} onClose={() => setDrawer(false)} title="Drawer">
        Contenu générique.
      </DrawerView>
    </ShowcaseSection>
  );
};

export const Navigation = () => {
  const [page, setPage] = useState(3);
  return (
    <ShowcaseSection title="Navigation">
      <ComponentCard title="Breadcrumb">
        <BreadcrumbView
          items={[
            { label: "Accueil", href: "#" },
            { label: "Catégorie", href: "#" },
            { label: "Élément", current: true },
          ]}
        />
      </ComponentCard>
      <ComponentCard title="Pagination">
        <StackView gap="sm">
          <PaginationView page={page} totalPages={10} onPageChange={setPage} showFirstLast />
          <p className="text-bk-sm text-muted-foreground">Page {page} / 10</p>
        </StackView>
      </ComponentCard>
    </ShowcaseSection>
  );
};

export const DataDisplay = () => (
  <ShowcaseSection title="Data Display">
    <ShowcaseGrid columns={3}>
      <MetricCardView label="Quantité" value="1 248" tone="primary" delta="+12%" trend="up" />
      <StatBlockView label="Statut" value="Actif" tone="success" />
      <CardView className="p-4">
        <InlineView align="center">
          <AvatarView name="Utilisateur" />
          <BadgeView tone="success">Statut</BadgeView>
        </InlineView>
      </CardView>
    </ShowcaseGrid>
    <ComponentCard title="Table (contenu libre)">
      <TableView striped>
        <TableCaptionView>Tableau générique</TableCaptionView>
        <TableHeaderView>
          <TableRowView>
            <TableHeadView>Nom</TableHeadView>
            <TableHeadView align="right">Quantité</TableHeadView>
          </TableRowView>
        </TableHeaderView>
        <TableBodyView>
          <TableRowView>
            <TableCellView>Item A</TableCellView>
            <TableCellView align="right">1</TableCellView>
          </TableRowView>
          <TableRowView>
            <TableCellView>Item B</TableCellView>
            <TableCellView align="right">2</TableCellView>
          </TableRowView>
        </TableBodyView>
      </TableView>
    </ComponentCard>
    <ComponentCard title="DataTable (piloté par données)">
      <DataTableView
        rows={[{ id: "a", name: "Item A", qty: 1 }, { id: "b", name: "Item B", qty: 2 }]}
        rowKey="id"
        columns={[{ id: "name", header: "Nom", accessor: "name" }, { id: "qty", header: "Quantité", accessor: "qty", align: "right" }]}
      />
    </ComponentCard>
    <ShowcaseGrid>
      <ComponentCard title="List">
        <ListView items={[{ id: "a", title: "Item A", description: "Description A" }, { id: "b", title: "Item B", description: "Description B" }]} />
      </ComponentCard>
      <ComponentCard title="DescriptionList & Timeline">
        <StackView gap="md">
          <DescriptionListView items={[{ term: "Statut", description: "Actif" }, { term: "Catégorie", description: "Générique" }]} />
          <DividerView />
          <TimelineView items={[{ id: "a", title: "Étape A", timestamp: "Date" }, { id: "b", title: "Étape B", timestamp: "Date", tone: "success" }]} />
        </StackView>
      </ComponentCard>
    </ShowcaseGrid>
  </ShowcaseSection>
);

export const Feedback = () => (
  <ShowcaseSection title="Feedback">
    <AlertView title="Information">Message générique.</AlertView>
    <CalloutView tone="warning" title="Attention">Note générique.</CalloutView>
    <InlineView align="center" gap="md">
      <SkeletonView className="h-8 w-32" />
      <SpinnerView />
      <ProgressView value={60} className="w-40" />
    </InlineView>
    <EmptyStateView title="Aucun élément" description="Ajoutez un élément pour commencer." />
    <ErrorStateView title="Erreur" description="Une erreur générique est survenue." />
  </ShowcaseSection>
);

export const Forms = () => (
  <ShowcaseSection title="Forms">
    <FormView>
      <FormSectionView title="Formulaire générique">
        <FormFieldView label="Utilisateur"><TextInputView placeholder="Nom" /></FormFieldView>
        <FormFieldView label="Email"><TextInputView type="email" placeholder="nom@example.com" /></FormFieldView>
        <SelectView label="Statut" options={options} placeholder="Choisir…" />
        <DatePickerView label="Date" />
        <TextareaView label="Description" />
      </FormSectionView>
      <FormActionsView>
        <ButtonView variant="outline" text="Annuler" />
        <ButtonView tone="primary" text="Valider" />
      </FormActionsView>
    </FormView>
  </ShowcaseSection>
);

export const Layout = () => (
  <ShowcaseSection title="Layout">
    <ShowcaseGrid columns={3}>
      <CardView className="p-4">Container</CardView>
      <CardView className="p-4">Stack</CardView>
      <CardView className="p-4">Grid</CardView>
    </ShowcaseGrid>
    <ComponentCard title="Inline & Stack">
      <InlineView wrap>
        <BadgeView>Élément</BadgeView>
        <BadgeView>Élément</BadgeView>
        <BadgeView>Élément</BadgeView>
      </InlineView>
    </ComponentCard>
  </ShowcaseSection>
);
