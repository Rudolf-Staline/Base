import { describe, expect, it } from "vitest";
import {
  createComponent,
  createNode,
  isUINode,
  normalizeChildren,
} from "@basekit/core";

describe("normalizeChildren", () => {
  it("wraps a single child into an array", () => {
    expect(normalizeChildren("hi")).toEqual(["hi"]);
  });

  it("drops null, undefined, false and true but keeps 0 and empty string", () => {
    expect(normalizeChildren([null, undefined, false, true, 0, ""])).toEqual([
      0,
      "",
    ]);
  });

  it("flattens nested arrays", () => {
    expect(normalizeChildren([["a", ["b"]], "c"])).toEqual(["a", "b", "c"]);
  });
});

describe("createNode", () => {
  it("creates a tagged UINode with normalised children", () => {
    const node = createNode("Box", { id: "x" }, ["a", null, "b"]);
    expect(node.$$basekit).toBe("node");
    expect(node.component).toBe("Box");
    expect(node.props).toEqual({ id: "x" });
    expect(node.children).toEqual(["a", "b"]);
    expect(isUINode(node)).toBe(true);
  });

  it("reads children from props when not passed explicitly", () => {
    const node = createNode("Box", { children: ["only"] } as never);
    expect(node.children).toEqual(["only"]);
  });
});

describe("createComponent", () => {
  it("produces a factory that builds nodes and carries its name", () => {
    const Box = createComponent<{ tone?: string }>("Box");
    expect(Box.componentName).toBe("Box");
    const node = Box({ tone: "primary", children: "hello" });
    expect(node.component).toBe("Box");
    expect(node.props.tone).toBe("primary");
    expect(node.children).toEqual(["hello"]);
  });
});
