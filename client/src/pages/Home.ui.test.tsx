// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";
import { ThemeProvider } from "@/contexts/ThemeContext";

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

function renderHome() {
  return render(
    <ThemeProvider defaultTheme="light" switchable>
      <Home />
    </ThemeProvider>,
  );
}

function visibleTimelineItems() {
  return document.querySelectorAll(".timeline-item").length;
}

function openTimelineDetails() {
  return document.querySelectorAll('.timeline-detail:not([hidden])').length;
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.className = "";
});

describe("Home timeline interface", () => {
  it("filters the rendered timeline between all, academic, and professional chapters", () => {
    renderHome();

    expect(visibleTimelineItems()).toBe(6);

    fireEvent.click(screen.getByRole("tab", { name: "أكاديمي" }));
    expect(visibleTimelineItems()).toBe(1);
    expect(screen.getByText("أستاذ الأدب العربي (الأدب الأندلسي)")).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: "مهني" }));
    expect(visibleTimelineItems()).toBe(5);
    expect(screen.getByText("عميد كلية الدراسات العليا")).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: "كل الفصول" }));
    expect(visibleTimelineItems()).toBe(6);
  });

  it("shows and hides the archive note when a timeline chapter is clicked twice", async () => {
    renderHome();
    const firstChapter = document.querySelector<HTMLButtonElement>(".timeline-trigger");
    expect(firstChapter).not.toBeNull();
    if (!firstChapter) throw new Error("Timeline trigger was not rendered");

    expect(firstChapter.getAttribute("aria-expanded")).toBe("true");
    expect(openTimelineDetails()).toBe(1);
    fireEvent.click(firstChapter);
    await waitFor(() => {
      expect(firstChapter.getAttribute("aria-expanded")).toBe("false");
      expect(openTimelineDetails()).toBe(0);
    });

    fireEvent.click(firstChapter);
    await waitFor(() => {
      expect(openTimelineDetails()).toBe(1);
      expect(firstChapter.getAttribute("aria-expanded")).toBe("true");
    });
  });
});

  it("renders reading progress and applies transition states when language and theme change", () => {
    renderHome();

    const progress = screen.getByRole("progressbar", { name: "تقدم قراءة السيرة" });
    expect(progress.getAttribute("aria-valuenow")).toBe("0");

    fireEvent.click(screen.getByRole("button", { name: "التبديل إلى الإنجليزية" }));
    expect(document.querySelector(".site-shell")?.className).toContain("is-transitioning-language");
    expect(screen.getByRole("button", { name: "Switch to Arabic" })).toBeTruthy();

    const themeButton = document.querySelector<HTMLButtonElement>(".theme-button");
    expect(themeButton).not.toBeNull();
    if (!themeButton) throw new Error("Theme button was not rendered");
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.querySelector(".site-shell")?.className).toContain("is-transitioning-theme");
    expect(document.querySelector(".button-primary")).toBeTruthy();
  });

  it("opens a second timeline chapter in place without leaving another detail block behind", async () => {
    renderHome();
    const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>(".timeline-trigger"));
    const secondChapter = triggers[1];
    expect(secondChapter).toBeTruthy();
    if (!secondChapter) throw new Error("Second timeline trigger was not rendered");

    fireEvent.click(secondChapter);
    await waitFor(() => {
      expect(secondChapter.getAttribute("aria-expanded")).toBe("true");
      expect(document.querySelectorAll(".timeline-detail")).toHaveLength(1);
      expect(secondChapter.nextElementSibling?.classList.contains("timeline-detail")).toBe(true);
    });
  });

  it("opens every timeline chapter in sequence with exactly one detail block in place", async () => {
    renderHome();
    const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>(".timeline-trigger"));
    expect(triggers).toHaveLength(6);

    for (let index = 0; index < triggers.length; index += 1) {
      const trigger = triggers[index];
      if (index > 0) fireEvent.click(trigger);
      await waitFor(() => {
        expect(trigger.getAttribute("aria-expanded")).toBe("true");
        expect(document.querySelectorAll(".timeline-detail")).toHaveLength(1);
        expect(trigger.nextElementSibling?.classList.contains("timeline-detail")).toBe(true);
      });
    }
  });

  it("keeps a late chapter detail adjacent in a mobile-sized viewport", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    renderHome();
    const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>(".timeline-trigger"));
    const lateChapter = triggers[4];
    expect(lateChapter).toBeTruthy();
    if (!lateChapter) throw new Error("Late timeline trigger was not rendered");

    fireEvent.click(lateChapter);
    await waitFor(() => {
      const detail = lateChapter.nextElementSibling;
      expect(lateChapter.getAttribute("aria-expanded")).toBe("true");
      expect(detail?.classList.contains("timeline-detail")).toBe(true);
      expect(document.querySelectorAll(".timeline-detail")).toHaveLength(1);
      expect(document.querySelectorAll(".timeline-detail[hidden]")).toHaveLength(0);
      expect(detail?.previousElementSibling).toBe(lateChapter);
      expect(detail?.parentElement?.querySelectorAll(":scope > .timeline-detail")).toHaveLength(1);
    });
  });


  it("opens the internal search and filters sections by academic content", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "البحث داخل السيرة" }));
    const input = screen.getByRole("textbox", { name: "بحث" });
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: "الأدب الأندلسي" } });
    const results = document.querySelectorAll(".search-result");
    expect(results.length).toBeGreaterThan(0);
    expect(Array.from(results).some((result) => result.textContent?.includes("البحوث والكتب"))).toBe(true);
  });

  it("keeps the language, theme, PDF, and menu actions exposed as labeled controls", () => {
    renderHome();
    expect(screen.getByRole("button", { name: "التبديل إلى الإنجليزية" })).toBeTruthy();
    expect(document.querySelector(".theme-button")).toBeTruthy();
    expect(document.querySelector(".pdf-button")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Open menu" })).toBeTruthy();
  });
