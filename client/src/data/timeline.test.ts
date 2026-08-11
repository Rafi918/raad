import { describe, expect, it } from "vitest";
import { cvData } from "./cvData";
import { filterTimelineItems, toggleTimelineIndex } from "./timeline";

describe("interactive academic timeline", () => {
  it("changes the visible chapter set for each filter", () => {
    const items = cvData.ar.experience.items;
    expect(filterTimelineItems(items, "all")).toHaveLength(6);
    expect(filterTimelineItems(items, "academic")).toHaveLength(1);
    expect(filterTimelineItems(items, "professional")).toHaveLength(5);
  });

  it("opens a selected chapter and closes it on the second activation", () => {
    expect(toggleTimelineIndex(0, 2)).toBe(2);
    expect(toggleTimelineIndex(2, 2)).toBe(-1);
    expect(toggleTimelineIndex(-1, 0)).toBe(0);
  });
});
