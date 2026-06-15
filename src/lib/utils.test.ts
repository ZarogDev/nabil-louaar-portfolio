import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (merge de classes Tailwind)", () => {
  it("garde la derniere classe en conflit", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("gere les classes conditionnelles", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("ignore les valeurs vides (null/undefined/\"\")", () => {
    expect(cn("", null, undefined, "x")).toBe("x");
  });
});
