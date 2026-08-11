import { describe, expect, it } from "vitest";
import { cvData } from "./cvData";

describe("academic CV content", () => {
  it("keeps the Arabic and English dossiers complete", () => {
    for (const locale of ["ar", "en"] as const) {
      const dossier = cvData[locale];
      expect(dossier.meta.name.length).toBeGreaterThan(10);
      expect(dossier.meta.email).toBe("ralwaili@uowasit.edu.iq");
      expect(dossier.education.items.length).toBeGreaterThanOrEqual(6);
      expect(dossier.experience.items.length).toBeGreaterThanOrEqual(6);
      expect(dossier.teaching.courses.length).toBeGreaterThanOrEqual(9);
      expect(dossier.research.books.length).toBeGreaterThanOrEqual(8);
      expect(dossier.honors.items.length).toBeGreaterThanOrEqual(8);
      expect(dossier.service.items.length).toBeGreaterThanOrEqual(14);
      expect(dossier.service.skills.length).toBeGreaterThanOrEqual(4);
      expect(dossier.about.tags.length).toBeGreaterThanOrEqual(6);
    }
  });
});
