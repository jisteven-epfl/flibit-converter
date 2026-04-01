# Flibit Converter - Project Blueprint & Architecture
> **AI Usage Note:** This document serves as the living description and building plan for the Flibit Converter project. Any AI assistant tasked with modifying, refactoring, or extending this codebase must read this document first to understand the architecture, purpose of components, and known areas of improvement. Update this document periodically when significant architectural changes are introduced.

## Introduction
Flibit Converter is a modern, single-page React application designed to help users interactively convert and visualize binary numbers. Built with Vite, React, TypeScript, and Tailwind CSS, it supports up to 32-bit integer conversion (both signed and unsigned). It allows users to toggle bits using an interactive UI or mathematically add bits to observe bitwise effects. It also features internationalization through `i18next` and dark mode support.

## Project Index

- `package.json` / build scripts — Project configuration and dependencies.
- `src/` — Main source directory.
  - `main.tsx` — Application entry point.
  - `App.tsx` — The main container and logic handler.
  - `InputArea.tsx` — Component for the decimal input field.
  - `ConvertModeButton.tsx` — Handles type, bit width, and click mode selection.
  - `BitDisplay.tsx` — Visualizes the binary array with interactive bits.
  - `SEOContent.tsx` — SEO optimized static text.
  - `LanguageSwitcher.tsx` — UI for switching languages.
  - `InfoTooltip.tsx` — Tooltips providing user guidance on the control interface.
  - `utils/math.ts` — Contains core math and conversion utility functions.
  - `interactive_logo.tsx` & `static_logo.tsx` — Logo components.
  - `i18n/` — Internationalization config and locales.
- `test/` — Unit testing suite with Vitest.

---

## Detailed Component Report

### 1. `src/App.tsx`
- **Description:** The root component of the app. It holds all the main state (`inputNumber`, `bitsLength`, `isSigned`, `clickMode`, `isDarkMode`), handles user interactions (input typing, bit clicking), and computes the bounds and errors. 
- **Current State:** Functional but overloaded. It mixes side effects (dark mode toggling), state management, complex domain logic (bit manipulation), and UI layout in one large file.
- **Improvements/Problems:** 
  - **Refactoring target:** The complex bit-flipping and addition logic, along with bounds checking, should be moved into a custom hook (e.g., `useConverterLogic.ts`) to improve testability and separate business logic from the UI.
  - **Theming:** Dark mode side effects can be decoupled into a `useTheme` hook or a ThemeContext.

### 2. `src/utils/math.ts`
- **Description:** A utility file handling the pure mathematical transformations (`toUnsigned`, `simulateHardwareTruncation`, `toSigned`, `toBinary`).
- **Current State:** Uses JS `BigInt` for truncation safely but relies on JS bitwise operators (`>>>`) in `toBinary`.
- **Improvements/Problems:** 
  - **Future Proofing:** JavaScript's bitwise operator `>>>` is strictly limited to 32-bit integers. If the app ever expands to 64-bit support, `toBinary` will silently fail. This should be rewritten using `BigInt` shifting if scaling up the feature set.

### 3. `src/ConvertModeButton.tsx`
- **Description:** Renders the control switches for Width (8/16/32-bit), Type (Unsigned/Signed), and Action (Flip/Add).
- **Current State:** Clean presentation component. 
- **Improvements/Problems:** 
  - Works well, but currently passes an extensive list of props. If more settings are added, they might benefit from a unified `Settings` object or context.

### 4. `src/BitDisplay.tsx`
- **Description:** Responsible for formatting bits into chunks of 8, rendering `BitButton` components with 3D flip animations, and a copy-to-clipboard functionality.
- **Current State:** Well-implemented with good modularity via the internal `BitButton` subcomponent.
- **Improvements/Problems:**
  - Hardcoded layout styles are mostly good, but watch for responsive layout behavior if scaling up to 64-bit arrays.

### 5. `src/InputArea.tsx`
- **Description:** Simply handles decimal input via an HTML number input, and bounds validation visualization.
- **Current State:** Good, lightweight component.
- **Improvements/Problems:**
  - Logic relies on parent (`App.tsx`) to pass bounds and errors.

### 6. `src/InfoTooltip.tsx`
- **Description:** A portal-based reusable tooltip component triggered on hover/focus.
- **Improvements/Problems:** 
  - Handles scroll and resize events cleanly, minimal issues. Keep an eye on memory leaks if unmounting isn't clean strictly (though useEffect cleanup handles this).

### 7. Localization (`LanguageSwitcher.tsx`, `i18n/config.ts`)
- **Description:** Enables easy transitions between languages using `react-i18next`.
- **Improvements/Problems:** The setup is sound.

---

## Conclusion & Proposed Refactor Roadmap

For upcoming feature additions, it is highly recommended to perform a controlled refactor with the following steps:
1. **Extract Custom Hooks:** Pull `useConverter` logic and `useTheme` out of `App.tsx`.
2. **Upgrade Math Functions:** Fortify `utils/math.ts` against potential >32-bit numbers using native `BigInt` consistently everywhere.
3. **Enhance Test Coverage:** Ensure tests are present for the newly extracted hooks and all mathematical boundaries.
4. **Architectural Restructuring:** Introduce Context API (or Zustand/Redux if state gets heavier) instead of prop-drilling for settings.
