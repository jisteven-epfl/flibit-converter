import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, it, expect, beforeEach } from "vitest";
import i18n from "i18next";
import SEO from "../src/components/common/SEO";

function renderSEO(initialPath = "/") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <SEO />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("SEO component", () => {
  beforeEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders English title when language is 'en'", () => {
    renderSEO("/");
    expect(document.title).toBe(
      "Flibit | Binary, Octal & Hex Converter",
    );
  });

  it("renders Chinese title when language is 'zh'", () => {
    i18n.changeLanguage("zh");
    renderSEO("/zh");
    expect(document.title).toBe(
      "Flibit | 二进制、八进制与十六进制转换器",
    );
  });

  it("renders meta description in English", () => {
    renderSEO("/");
    const meta = document.querySelector("meta[name='description']");
    expect(meta?.getAttribute("content")).toContain("intuitive");
  });

  it("renders meta description in Chinese", () => {
    i18n.changeLanguage("zh");
    renderSEO("/zh");
    const meta = document.querySelector("meta[name='description']");
    expect(meta?.getAttribute("content")).toContain("直观、交互式的进制转换工具");
  });

  it("includes hreflang alternate links for both locales", () => {
    renderSEO("/");
    const hreflangEn = document.querySelector("link[hreflang='en']");
    const hreflangZh = document.querySelector("link[hreflang='zh']");
    const hreflangDefault = document.querySelector("link[hreflang='x-default']");

    expect(hreflangEn).not.toBeNull();
    expect(hreflangZh).not.toBeNull();
    expect(hreflangDefault).not.toBeNull();
    expect(hreflangZh?.getAttribute("href")).toBe(
      "https://flibit-converter.vercel.app/zh",
    );
  });
});
