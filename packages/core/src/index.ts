import { createElement, Fragment, type ComponentType, type ReactNode } from "react";
import type { Tone, Variant } from "@basekit/tokens";
export type UIChild = UINode | string | number | null | false | undefined;
export type UINode<Props = any> = { component: string; props: Props; children?: UIChild[] };
export type DeclarativeComponent<Props> = ((props: Props & { children?: UIChild | UIChild[] }) => UINode<Props>) & { componentName: string };
export const normalizeChildren = (children?: UIChild | UIChild[]): UIChild[] => Array.isArray(children) ? children.filter(Boolean) : children ? [children] : [];
export const createNode = <Props extends Record<string, any>>(component: string, props: Props = {} as Props, children?: UIChild | UIChild[]): UINode<Props> => ({ component, props, children: normalizeChildren(children ?? props.children) });
export const createComponent = <Props extends Record<string, any>>(component: string): DeclarativeComponent<Props> => Object.assign((props: Props & { children?: UIChild | UIChild[] }) => createNode(component, props, props.children), { componentName: component });
export type ComponentRegistry = Record<string, ComponentType<any> | string>;
export const renderNode = (node: UIChild | ReactNode, registry: ComponentRegistry): ReactNode => {
  if (node === null || node === false || node === undefined) return null;
  if (typeof node === "string" || typeof node === "number") return node;
  if (typeof node === "object" && "component" in node) {
    const Component = registry[node.component] ?? node.component;
    const { children: _ignored, ...props } = node.props ?? {};
    return createElement(Component, props, ...(node.children ?? []).map((child, index) => createElement(Fragment, { key: index }, renderNode(child, registry))));
  }
  return node as ReactNode;
};
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
export const toneClass = (tone: Tone = "neutral", variant: Variant = "solid") => `${tone}-${variant}`;
export type PageLayout = "dashboard" | "auth" | "reader" | "settings" | "default";
export type PageDefinition<State extends object = {}, Actions extends object = {}, Data = unknown> = { id: string; layout?: PageLayout; state?: State; actions?: Actions; view: (ctx: { state: State; actions: Actions; data: Data }) => UINode };
export const createPage = <S extends object, A extends object, D>(definition: PageDefinition<S,A,D>) => definition;
export type PageNodeProps = { id?: string; layout?: PageLayout; title?: string; description?: string; content?: UIChild | UIChild[]; actions?: UIChild | UIChild[] };
export const Page = (props: PageNodeProps) => createNode("Page", props, props.content);
export const DashboardPage = (props: Omit<PageNodeProps,"layout">) => Page({ ...props, layout: "dashboard" });
export const AuthPage = (props: Omit<PageNodeProps,"layout">) => Page({ ...props, layout: "auth" });
export const FormPage = (props: PageNodeProps) => createNode("FormPage", props, props.content);
export const SettingsPage = (props: Omit<PageNodeProps,"layout">) => Page({ ...props, layout: "settings" });
export const ReaderPage = (props: Omit<PageNodeProps,"layout">) => Page({ ...props, layout: "reader" });
