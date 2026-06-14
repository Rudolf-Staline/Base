import { useState, type ReactNode } from "react";
import {
  AlertView,
  AvatarView,
  BadgeView,
  ButtonView,
  CalendarView,
  CardView,
  CheckboxGroupView,
  CheckboxView,
  ContainerView,
  DataTableView,
  DatePickerView,
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
  ModalView,
  MultiSelectView,
  NumberInputView,
  PasswordInputView,
  ProgressView,
  RadioGroupView,
  RangeSliderView,
  SearchInputView,
  SelectView,
  SkeletonView,
  SliderView,
  StackView,
  SwitchView,
  TextInputView,
  TextareaView,
  TimePickerView,
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

type ShowcaseSectionProps = {
  title: string;
  children: ReactNode;
};

const ShowcaseSection = ({ title, children }: ShowcaseSectionProps) => (
  <ContainerView className="py-6">
    <h1 className="mb-4 text-2xl font-bold">{title}</h1>
    <StackView gap="md">{children}</StackView>
  </ContainerView>
);

export const Foundations = () => (
  <ShowcaseSection title="Foundations">
    <CardView className="p-4">
      <p>Tokens BaseKit pour couleurs, typographie, spacing, radius, shadows et thèmes clair/sombre.</p>
    </CardView>
    <InlineView wrap>
      {tones.map((tone) => (
        <BadgeView key={tone} tone={tone}>{tone}</BadgeView>
      ))}
    </InlineView>
  </ShowcaseSection>
);

export const Buttons = () => (
  <ShowcaseSection title="Buttons">
    <InlineView wrap>
      {variants.map((variant) => (
        <ButtonView key={variant} variant={variant} tone="primary" text={variant} />
      ))}
      <IconButtonView icon="check" aria-label="Action" />
      <ButtonView loading text="Loading" />
      <ButtonView disabled text="Disabled" />
    </InlineView>
  </ShowcaseSection>
);

export const Inputs = () => {
  const [search, setSearch] = useState("abc");
  return (
    <ShowcaseSection title="Inputs">
      <GridView columns={2}>
        <TextInputView label="Utilisateur" placeholder="Nom" />
        <NumberInputView label="Quantité" minValue={0} maxValue={100} clampOnBlur />
        <PasswordInputView label="Mot de passe" />
        <SearchInputView label="Recherche" value={search} clearable onValueChange={setSearch} />
        <TextInputView type="email" label="Email" />
        <TextInputView type="tel" label="Téléphone" />
        <TextInputView type="url" label="URL" />
        <TextareaView label="Description" showCount maxLength={120} />
      </GridView>
    </ShowcaseSection>
  );
};

export const Selection = () => (
  <ShowcaseSection title="Selection">
    <RadioGroupView label="Type" options={options} />
    <CheckboxView label="Option active" />
    <CheckboxGroupView label="Options" options={options} />
    <SwitchView label="Statut" />
    <SelectView label="Statut" options={options} />
    <MultiSelectView label="Choix multiples" options={options} />
  </ShowcaseSection>
);

export const DateCalendar = () => (
  <ShowcaseSection title="Date & Calendar">
    <InlineView align="start" wrap>
      <CalendarView />
      <DatePickerView label="Date" clearable />
      <TimePickerView label="Heure" />
    </InlineView>
  </ShowcaseSection>
);

export const Feedback = () => (
  <ShowcaseSection title="Feedback">
    <AlertView title="Information">Message générique.</AlertView>
    <InlineView>
      <SkeletonView className="h-8 w-32" />
      <ProgressView value={60} />
    </InlineView>
    <EmptyStateView title="Aucun élément" description="Ajoutez un élément pour commencer." />
    <ErrorStateView title="Erreur" description="Une erreur générique est survenue." />
  </ShowcaseSection>
);

export const Overlays = () => (
  <ShowcaseSection title="Overlays">
    <InlineView wrap>
      <ModalView open={false} onClose={() => undefined} title="Modal">Contenu générique</ModalView>
      <DrawerView open={false} onClose={() => undefined} title="Drawer">Contenu générique</DrawerView>
      <ButtonView text="Modal" />
      <ButtonView text="Drawer" />
      <DropdownView trigger={<ButtonView text="Dropdown" />} items={[{ id: "a", label: "Item A" }, { id: "b", label: "Item B" }]} />
    </InlineView>
  </ShowcaseSection>
);

export const Layout = () => (
  <ShowcaseSection title="Layout">
    <GridView columns={3}>
      <CardView className="p-4">Container</CardView>
      <CardView className="p-4">Stack</CardView>
      <CardView className="p-4">Grid</CardView>
    </GridView>
  </ShowcaseSection>
);

export const DataDisplay = () => (
  <ShowcaseSection title="Data Display">
    <InlineView>
      <BadgeView>Statut</BadgeView>
      <AvatarView name="Utilisateur" />
      <CardView className="p-4">Quantité: 42</CardView>
    </InlineView>
    <DataTableView
      rows={[{ id: "a", name: "Item A", qty: 1 }, { id: "b", name: "Item B", qty: 2 }]}
      rowKey="id"
      columns={[{ id: "name", header: "Nom", accessor: "name" }, { id: "qty", header: "Quantité", accessor: "qty" }]}
    />
  </ShowcaseSection>
);

export const Forms = () => (
  <ShowcaseSection title="Forms">
    <FormView>
      <FormSectionView title="Formulaire générique">
        <FormFieldView label="Utilisateur"><TextInputView placeholder="Nom" /></FormFieldView>
        <FormFieldView label="Email"><TextInputView type="email" placeholder="nom@example.com" /></FormFieldView>
        <SelectView label="Statut" options={options} />
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

export const Sliders = () => (
  <ShowcaseSection title="Sliders">
    <SliderView label="Quantité" defaultValue={40} showValue />
    <RangeSliderView label="Intervalle" defaultValue={[20, 80]} showValue />
  </ShowcaseSection>
);
