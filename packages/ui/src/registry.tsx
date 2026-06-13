import type { ComponentType } from "react";
import {
  createRegistry,
  renderNode,
  type ComponentRegistry,
  type UIChild,
} from "@basekit/core";

import { ButtonView, IconButtonView } from "./primitives/Button";
import { InputView, TextareaView } from "./primitives/Input";
import { DateInputView } from "./primitives/DateInput";
import { SelectView } from "./primitives/Select";
import { CheckboxView, SwitchView } from "./primitives/Toggle";
import { TextView, HeadingView } from "./primitives/Text";
import {
  AvatarView,
  BadgeView,
  DividerView,
  KbdView,
  LinkView,
  SpinnerView,
} from "./primitives/Misc";
import {
  ContainerView,
  GridView,
  InlineView,
  ScrollAreaView,
  SectionView,
  SplitPaneView,
  StackView,
} from "./layout/Primitives";
import {
  AppShellView,
  PageHeaderView,
  SidebarView,
  TopbarView,
} from "./layout/Shell";
import { PageView } from "./layout/Layouts";
import {
  CardContentView,
  CardFooterView,
  CardHeaderView,
  CardView,
} from "./composition/Card";
import { DrawerView, ModalView } from "./composition/Modal";
import {
  AccordionView,
  DropdownView,
  TabsView,
} from "./composition/Disclosure";
import {
  AlertView,
  CalloutView,
  EmptyStateView,
  ErrorStateView,
} from "./feedback/Alert";
import { ProgressView, SkeletonView } from "./feedback/Status";
import { DataTableView } from "./data/DataTable";
import {
  DescriptionListView,
  ListView,
  MetricCardView,
  StatBlockView,
  TimelineView,
} from "./data/Display";
import {
  FilterBarView,
  FormActionsView,
  FormFieldView,
  FormSectionView,
  FormView,
} from "./form/Form";

type AnyComponent = ComponentType<Record<string, unknown>>;
const c = (component: unknown) => component as AnyComponent;

/**
 * The default registry maps every declarative component name to its React view.
 * Adding a component = add its `XView` here (and export its factory).
 */
const registryApi = createRegistry({
  // primitives
  Button: c(ButtonView),
  IconButton: c(IconButtonView),
  Input: c(InputView),
  Textarea: c(TextareaView),
  DateInput: c(DateInputView),
  Select: c(SelectView),
  Checkbox: c(CheckboxView),
  Switch: c(SwitchView),
  Text: c(TextView),
  Heading: c(HeadingView),
  Badge: c(BadgeView),
  Link: c(LinkView),
  Avatar: c(AvatarView),
  Divider: c(DividerView),
  Kbd: c(KbdView),
  Spinner: c(SpinnerView),
  // layout
  Stack: c(StackView),
  Inline: c(InlineView),
  Grid: c(GridView),
  Container: c(ContainerView),
  Section: c(SectionView),
  ScrollArea: c(ScrollAreaView),
  SplitPane: c(SplitPaneView),
  AppShell: c(AppShellView),
  Sidebar: c(SidebarView),
  Topbar: c(TopbarView),
  PageHeader: c(PageHeaderView),
  Page: c(PageView),
  // composition
  Card: c(CardView),
  CardHeader: c(CardHeaderView),
  CardContent: c(CardContentView),
  CardFooter: c(CardFooterView),
  Modal: c(ModalView),
  Drawer: c(DrawerView),
  Tabs: c(TabsView),
  Accordion: c(AccordionView),
  Dropdown: c(DropdownView),
  // feedback
  Alert: c(AlertView),
  Callout: c(CalloutView),
  EmptyState: c(EmptyStateView),
  ErrorState: c(ErrorStateView),
  Skeleton: c(SkeletonView),
  Progress: c(ProgressView),
  // data
  DataTable: c(DataTableView),
  MetricCard: c(MetricCardView),
  StatBlock: c(StatBlockView),
  List: c(ListView),
  DescriptionList: c(DescriptionListView),
  Timeline: c(TimelineView),
  // form
  Form: c(FormView),
  FormSection: c(FormSectionView),
  FormField: c(FormFieldView),
  FormActions: c(FormActionsView),
  FilterBar: c(FilterBarView),
});

export const defaultRegistry: ComponentRegistry = registryApi.registry;

/** Register (or override) a component in the default registry at runtime. */
export const registerComponent = (
  name: string,
  component: AnyComponent | string,
): void => registryApi.register(name, component);

export const registerComponents = registryApi.registerMany;

/** React component that renders a declarative node tree with the default registry. */
export const RenderNode = ({
  node,
  registry = defaultRegistry,
}: {
  node: UIChild;
  registry?: ComponentRegistry;
}) => <>{renderNode(node, registry)}</>;
