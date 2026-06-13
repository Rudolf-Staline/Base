import { createElement, Fragment, type ComponentType, type ReactNode } from "react";

export type UIPrimitive = string | number | boolean | null | undefined;
export type UIChild = UINode | UIPrimitive | ReactNode;
export type UINode<Props extends Record<string, unknown> = Record<string, unknown>> = { component: string; props: Props; children: UIChild[] };
export type DeclarativeComponent<Props extends Record<string, unknown>> = ((props: Props & { children?: UIChild | UIChild[] }) => UINode<Props>) & { componentName: string };
export type ComponentRegistry = Record<string, ComponentType<Record<string, unknown>> | string>;

export const normalizeChildren = (children?: UIChild | UIChild[]): UIChild[] => (Array.isArray(children) ? children : children === undefined || children === null || children === false ? [] : [children]).filter((child) => child !== null && child !== undefined && child !== false);
export const createNode = <Props extends Record<string, unknown>>(component: string, props = {} as Props, children?: UIChild | UIChild[]): UINode<Props> => ({ component, props, children: normalizeChildren(children ?? props.children as UIChild | UIChild[] | undefined) });
export const createComponent = <Props extends Record<string, unknown>>(component: string): DeclarativeComponent<Props> => Object.assign((props: Props & { children?: UIChild | UIChild[] }) => createNode(component, props, props.children), { componentName: component });
export const renderChildren = (children: UIChild | UIChild[] | undefined, registry: ComponentRegistry): ReactNode[] => normalizeChildren(children).map((child, index) => createElement(Fragment, { key: index }, renderNode(child, registry)));
export const renderNode = (node: UIChild, registry: ComponentRegistry): ReactNode => {
  if (node === null || node === false || node === undefined || node === true) return null;
  if (typeof node === "string" || typeof node === "number") return node;
  if (typeof node === "object" && "component" in node && "props" in node) {
    const uiNode = node as UINode;
    const Component = registry[uiNode.component] ?? uiNode.component;
    const { children: _children, ...props } = uiNode.props;
    return createElement(Component, props, ...renderChildren(uiNode.children, registry));
  }
  return node as ReactNode;
};
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
export type PageLayout = "dashboard" | "auth" | "reader" | "settings" | "default";
export type PageContext<State extends object, Actions extends object, Data> = { state: State; actions: Actions; data: Data };
export type PageDefinition<State extends object = Record<string, never>, Actions extends object = Record<string, never>, Data = unknown> = { id: string; layout?: PageLayout; state?: State; actions?: Actions; view: (ctx: PageContext<State, Actions, Data>) => UINode };
export const createPage = <State extends object, Actions extends object, Data>(definition: PageDefinition<State, Actions, Data>) => definition;
export type PageNodeProps = { id?: string; layout?: PageLayout; title?: string; description?: string; content?: UIChild | UIChild[]; actions?: UIChild | UIChild[] };
export const Page = (props: PageNodeProps) => createNode("Page", props as unknown as Record<string, unknown>, props.content);
export const DashboardPage = (props: Omit<PageNodeProps, "layout">) => Page({ ...props, layout: "dashboard" });
export const AuthPage = (props: Omit<PageNodeProps, "layout">) => Page({ ...props, layout: "auth" });
export const SettingsPage = (props: Omit<PageNodeProps, "layout">) => Page({ ...props, layout: "settings" });
export const ReaderPage = (props: Omit<PageNodeProps, "layout">) => Page({ ...props, layout: "reader" });
