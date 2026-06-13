import { describe, expect, it } from "vitest";
import {
  ApiError,
  buildQueryString,
  createMockClient,
  joinUrl,
} from "@basekit/api";

describe("url helpers", () => {
  it("joins base url and path tolerating slashes", () => {
    expect(joinUrl("https://api.test/", "/users")).toBe(
      "https://api.test/users",
    );
    expect(joinUrl("https://api.test", "users")).toBe("https://api.test/users");
  });

  it("passes through absolute urls", () => {
    expect(joinUrl("https://api.test", "https://other.test/x")).toBe(
      "https://other.test/x",
    );
  });

  it("builds query strings, repeating array keys and skipping nullish", () => {
    expect(
      buildQueryString({ q: "a", page: 2, skip: undefined, tags: ["x", "y"] }),
    ).toBe("?q=a&page=2&tags=x&tags=y");
    expect(buildQueryString()).toBe("");
  });
});

describe("createMockClient", () => {
  it("resolves matched routes", async () => {
    const api = createMockClient(
      [{ method: "GET", path: "/me", response: { name: "Rudolf" } }],
      { defaultDelay: 0 },
    );
    await expect(api.get("/me")).resolves.toEqual({ name: "Rudolf" });
  });

  it("throws a 404 ApiError for unmatched routes", async () => {
    const api = createMockClient([], { defaultDelay: 0 });
    await expect(api.get("/missing")).rejects.toBeInstanceOf(ApiError);
  });

  it("supports resolver functions and query stripping", async () => {
    const api = createMockClient(
      [{ path: "/echo", response: (p) => ({ path: p }) }],
      { defaultDelay: 0 },
    );
    await expect(api.get("/echo?x=1")).resolves.toEqual({ path: "/echo" });
  });
});
