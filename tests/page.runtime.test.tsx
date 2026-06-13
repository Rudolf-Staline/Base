import { describe, expect, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { createPage, isUINode, usePageRuntime } from "@basekit/core";

type State = { count: number };
type Actions = { increment: () => void };
type Data = { label: string };

const page = createPage<State, Actions, Data>({
  id: "demo",
  state: { count: 0 },
  data: async () => ({ label: "loaded" }),
  actions: ({ setState, getState }) => ({
    increment: () => setState({ count: getState().count + 1 }),
  }),
  view: ({ state }) => ({
    $$basekit: "node",
    component: "Text",
    props: { value: state.count },
    children: [],
  }),
});

describe("usePageRuntime", () => {
  it("seeds state, runs actions and loads data", async () => {
    const { result } = renderHook(() => usePageRuntime(page));

    expect(result.current.context.state.count).toBe(0);
    expect(result.current.context.loading).toBe(true);

    await waitFor(() => expect(result.current.context.loading).toBe(false));
    expect(result.current.context.data).toEqual({ label: "loaded" });

    act(() => result.current.context.actions.increment());
    expect(result.current.context.state.count).toBe(1);
    expect(isUINode(result.current.node)).toBe(true);
  });
});
