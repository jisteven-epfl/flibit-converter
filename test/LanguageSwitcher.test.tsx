import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import i18n from "i18next";
import LanguageSwitcher from "../src/components/common/LanguageSwitcher";

function renderSwitcher(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <LanguageSwitcher />
    </MemoryRouter>,
  );
}

describe("LanguageSwitcher", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    i18n.changeLanguage("en");
    localStorage.clear();
  });

  it("renders language buttons", () => {
    renderSwitcher();
    expect(screen.getByRole("button", { name: /English/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toBeInTheDocument();
  });

  it("marks the active language with aria-pressed=true", () => {
    renderSwitcher();
    const enBtn = screen.getByRole("button", { name: /English/i });
    const zhBtn = screen.getByRole("button", { name: /中文/i });

    expect(enBtn).toHaveAttribute("aria-pressed", "true");
    expect(zhBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to Chinese when 中文 is clicked", async () => {
    renderSwitcher();
    const zhBtn = screen.getByRole("button", { name: /中文/i });

    await user.click(zhBtn);

    expect(i18n.language).toBe("zh");
    expect(localStorage.getItem("flibit-language")).toBe("zh");
  });

  it("switches back to English when English is clicked", async () => {
    i18n.changeLanguage("zh");
    renderSwitcher("/zh");

    const enBtn = screen.getByRole("button", { name: /English/i });
    await user.click(enBtn);

    expect(i18n.language).toBe("en");
    expect(localStorage.getItem("flibit-language")).toBe("en");
  });
});
