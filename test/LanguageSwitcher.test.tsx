import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import i18n from "i18next";
import LanguageSwitcher from "../src/components/common/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    i18n.changeLanguage("en");
    localStorage.clear();
  });

  it("renders language buttons", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: /English/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toBeInTheDocument();
  });

  it("marks the active language with aria-pressed=true", () => {
    render(<LanguageSwitcher />);
    const enBtn = screen.getByRole("button", { name: /English/i });
    const zhBtn = screen.getByRole("button", { name: /中文/i });

    expect(enBtn).toHaveAttribute("aria-pressed", "true");
    expect(zhBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to Chinese when 中文 is clicked", async () => {
    render(<LanguageSwitcher />);
    const zhBtn = screen.getByRole("button", { name: /中文/i });

    await user.click(zhBtn);

    expect(i18n.language).toBe("zh");
    expect(localStorage.getItem("flibit-language")).toBe("zh");
  });

  it("switches back to English when English is clicked", async () => {
    i18n.changeLanguage("zh");
    render(<LanguageSwitcher />);

    const enBtn = screen.getByRole("button", { name: /English/i });
    await user.click(enBtn);

    expect(i18n.language).toBe("en");
    expect(localStorage.getItem("flibit-language")).toBe("en");
  });
});
