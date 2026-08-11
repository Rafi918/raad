export type TimelineCategory = "academic" | "professional";
export type TimelineMode = "all" | TimelineCategory;

export type TimelineRecord = {
  category: TimelineCategory;
  years: string;
  role: string;
  place: string;
  note: string;
};

export function filterTimelineItems<T extends TimelineRecord>(items: T[], mode: TimelineMode) {
  return mode === "all" ? items : items.filter((item) => item.category === mode);
}

export function toggleTimelineIndex(currentIndex: number, nextIndex: number) {
  return currentIndex === nextIndex ? -1 : nextIndex;
}
