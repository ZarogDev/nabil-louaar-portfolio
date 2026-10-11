import { describe, expect, it } from "vitest";
import { buildCsp } from "./middleware";

describe("buildCsp", () => {
  it("authorises Next.js inline scripts via the per-request nonce in production", () => {
    const csp = buildCsp("abc123", false);
    expect(csp).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(csp).not.toContain("unsafe-inline' 'unsafe-eval");
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it("allows eval and websockets only in development", () => {
    const csp = buildCsp("n", true);
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain("connect-src 'self' ws: wss:");
    expect(buildCsp("n", false)).not.toContain("unsafe-eval");
  });
});
