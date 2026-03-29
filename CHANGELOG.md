# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-03-29

### Added

- **Multi-Language Support (i18n)**: Integrated `i18next`/`react-i18next` with English and Chinese translations, a language switcher in the header, and browser/localStorage-based language preference detection. All UI strings are now fully localized via namespaced translation keys. (#31)

### Fixed

- **Visual Error Feedback**: Added a red border and focus ring to the input field when an invalid decimal value is entered, giving users immediate visual feedback on bad input. (#32)

## [2.1.1] - 2026-03-24

### Added

- **Site Ownership Verification**: Integrated Google Search Console property verification to monitor search performance and indexing.

## [2.1.0] - 2026-03-24

### Added

- **SEO & Search Visibility**: Comprehensive search engine optimization (SEO) including custom meta tags, Open Graph (OG) support, Twitter cards, and JSON-LD schema markup.
- **Search Indices**: Added `robots.txt` and `sitemap.xml` for better site discovery by search engines.
- **Educational Knowledge Base**: New visual section below the main app explaining Binary systems, Two's Complement, and bit-level architecture to improve both UX and SEO density.

### Fixed

- Improved semantic HTML hierarchy for better indexability.

## [2.0.0] - 2026-03-24

### Added
- **16-bit & 32-bit Conversions**: Added support to switch between 8-bit, 16-bit, and 32-bit conversion modes.
- **Signed vs Unsigned**: Added the ability to choose between signed (Two's Complement) and unsigned conversion targets.
- **Docker Support & CI/CD**: Added `Dockerfile` and automated GitHub Actions workflows (CI, CodeCov, GitHub Packages) for container image publishing to GHCR.
- **Swipe-to-Toggle Bits**: Enabled smooth click-and-drag (swipe) interaction to quickly paint bit patterns without clicking individually.
- **Copy to Clipboard Buttons**: Instantly copy calculated decimal values or raw binary strings directly to the clipboard.
- **Info Tooltips**: Interactive "i" hover icons explain technical settings (Width, Type, Action) to guide users.
- **Automated Testing Suite**: Introduced comprehensive automated testing architecture (`vitest`) for core logic and React UI components.
- **Dark Mode Support**: Implemented a full dark theme (using Tailwind class strategy) with a persistent theme toggle in the header.
- **Interactive Logo**: Added a notebook-style flip-calendar logo that physically animates when clicked, reflecting the "bit-flip" core concept.

### Changed
- **The "Flibit" Story**: Updated README to explain the brand’s origin (a playful reversal of "bit flip") and its inspiration from hardware-level state changes.
- **Bilingual Polish**: Refined both English and Chinese descriptions for clarity and natural flow.
- **UI & Layout Stability**: Refactored to a polished card-style layout with fixed containers to prevent flexbox jittering when tooltips or scrollbars appear.
- **Accessibility (A11y) Polish**: Improved ARIA-labeling for better screen reader support, especially for live error states and interactive bit controls.
- **Mathematical Overflow Protection**: Replaced native JavaScript 32-bit bitwise limits with pure mathematically derived logic to securely handle large unsigned integer operations without sign errors.
- **Derived State Reactivity**: Decomposed the legacy `App` component into modular units (`InputArea` and `BitDisplay`), abandoning redundant mutable state flags in favor of clean derived state for input validation.

### Fixed
- Fixed improper coloring of the "Flip" and "Add" buttons when Dark Mode is enabled.
- Resolved layout display inconsistency for the title on small mobile viewports.
- Fixed error message display behaviors during text input validation.
- Fixed numerous minor typo and testing-time false failure bugs.
