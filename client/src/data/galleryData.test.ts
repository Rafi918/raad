import { describe, expect, it } from "vitest";
import { galleryData } from "./galleryData";

describe("archival gallery and document assets", () => {
  it("keeps a complete bilingual gallery with stable storage URLs", () => {
    for (const locale of ["ar", "en"] as const) {
      expect(galleryData[locale]).toHaveLength(4);
      for (const item of galleryData[locale]) {
        expect(item.image).toMatch(/^\/manus-storage\/raad-gallery-/);
        expect(item.title.trim().length).toBeGreaterThan(3);
        expect(item.description.trim().length).toBeGreaterThan(8);
        expect(item.tag.trim().length).toBeGreaterThan(1);
      }
    }
  });
});
