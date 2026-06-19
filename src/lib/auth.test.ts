import { describe, it, expect, vi, beforeEach } from "vitest";

vi.stubEnv("ADMIN_JWT_SECRET", "test-secret-key-at-least-32-chars-long!!");

const { signAdminToken, verifyAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } = await import("./auth");

describe("auth admin — JWT", () => {
  it("génère un token valide", async () => {
    const token = await signAdminToken();
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  it("vérifie un token légitimement signé", async () => {
    const token = await signAdminToken();
    const valid = await verifyAdminToken(token);
    expect(valid).toBe(true);
  });

  it("rejette un token forgé", async () => {
    const valid = await verifyAdminToken("header.payload.badsignature");
    expect(valid).toBe(false);
  });

  it("rejette un token vide", async () => {
    const valid = await verifyAdminToken("");
    expect(valid).toBe(false);
  });

  it("COOKIE_NAME est défini", () => {
    expect(COOKIE_NAME).toBe("admin_token");
  });

  it("COOKIE_MAX_AGE est 8 heures en secondes", () => {
    expect(COOKIE_MAX_AGE).toBe(60 * 60 * 8);
  });
});
