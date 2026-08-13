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
      expect(dossier.experience.items.every((item) => item.category === "academic" || item.category === "professional")).toBe(true);
      expect(dossier.experience.items.filter((item) => item.category === "academic").length).toBeGreaterThanOrEqual(1);
      expect(dossier.experience.items.filter((item) => item.category === "professional").length).toBeGreaterThanOrEqual(5);
      expect(dossier.teaching.courses.length).toBeGreaterThanOrEqual(9);
      expect(dossier.research.books.length).toBeGreaterThanOrEqual(8);
      expect(dossier.honors.items.length).toBeGreaterThanOrEqual(8);
      expect(dossier.service.items.length).toBeGreaterThanOrEqual(14);
      expect(dossier.service.skills.length).toBeGreaterThanOrEqual(4);
      expect(dossier.about.tags.length).toBeGreaterThanOrEqual(6);
    }
  });
});


  it("does not expose the removed specialization phrase or malformed cleanup text", () => {
    const serialized = JSON.stringify(cvData);
    expect(serialized).not.toContain("القانون الدولي");
    expect(serialized).not.toContain("International Law");
    expect(serialized).not.toContain("international law");
    expect(serialized).not.toContain("في والأدب");
    expect(serialized).not.toContain("embrand");
    expect(serialized).not.toContain("الدكتوراه الأولى");
    expect(serialized).not.toContain("First Ph.D.");
    expect(cvData.ar.meta.primarySpec).toContain("النقد الأدبي");
    expect(cvData.en.meta.primarySpec).toContain("Literary Criticism");
  });
