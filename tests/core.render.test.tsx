import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  createComponent,
  renderNode,
  type ComponentRegistry,
} from "@basekit/core";

const Box = createComponent<{ title?: string }>("Box");
const registry: ComponentRegistry = {
  Box: ({
    title,
    children,
  }: {
    title?: string;
    children?: React.ReactNode;
  }) => (
    <section data-testid="box">
      <h2>{title}</h2>
      {children}
    </section>
  ),
};

describe("renderNode", () => {
  it("renders text and numbers verbatim", () => {
    expect(renderNode("hello", registry)).toBe("hello");
    expect(renderNode(42, registry)).toBe(42);
  });

  it("renders empty values as null", () => {
    expect(renderNode(null, registry)).toBeNull();
    expect(renderNode(false, registry)).toBeNull();
    expect(renderNode(undefined, registry)).toBeNull();
  });

  it("renders a registered component with props and children", () => {
    const node = Box({ title: "Hi", children: ["world"] });
    const { getByTestId, getByText } = render(
      <>{renderNode(node, registry)}</>,
    );
    expect(getByTestId("box")).toBeInTheDocument();
    expect(getByText("Hi")).toBeInTheDocument();
    expect(getByText("world")).toBeInTheDocument();
  });

  it("falls back visibly for unknown components instead of throwing", () => {
    const node = createComponent("Mystery")({});
    const { container } = render(<>{renderNode(node, registry)}</>);
    expect(
      container.querySelector("[data-basekit-unknown='Mystery']"),
    ).not.toBeNull();
  });
});
