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
    expect(document.querySelector(".site-shell")?.className).toContain("is-transitioning-theme");
  });
