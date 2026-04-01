# Flibit Converter - Project Blueprint & Architecture
> **AI Usage Note:** This document serves as the living description and building plan for the Flibit Converter project. Any AI assistant tasked with modifying, refactoring, or extending this codebase must read this document first to understand the architecture, purpose of components, and known areas of improvement. Update this document periodically when significant architectural changes are introduced.

## Introduction
Flibit Converter is a modern, single-page React application designed to help users interactively convert and visualize binary numbers. Built with Vite, React, TypeScript, and Tailwind CSS, it supports 8, 16, and 32-bit integer conversion (signed and unsigned). It uses a **Zustand** global store for state management and **BigInt** for high-precision mathematical operations.

## Project Structure (v2.3.0+)

- `src/store/useFlibitStore.ts` — **Single Source of Truth**. Contains the global Zustand store (`bitPattern`, `bitsLength`, `isSigned`, `clickMode`), all business logic actions, and exported derived selectors/hooks used for reactive UI values.
- `src/components/` — Modular component directory.
  - `converter/` — core specialized components (`InputArea.tsx`, `BitDisplay.tsx`, `ConvertModeButton.tsx`).
  - `converter/` — core specialized components (`InputArea.tsx`, `BitDisplay.tsx`, `ConvertModeButton.tsx`).
  - `common/` — Generic UI elements (`LanguageSwitcher.tsx`, `InfoTooltip.tsx`, `interactive_logo.tsx`).
  - `layout/` — High-level layout wrappers (`SEOContent.tsx`).
- `src/utils/math.ts` — Core BigInt-based mathematical transformations.
- `test/` — Comprehensive Vitest suite with ~96% line coverage.

---

## Detailed Architectural Report

### 1. State Management (Zustand)
- **Description:** The application state is fully decoupled from the React component tree. Components subscribe only to the slices of state or derived values they need.
- **Pattern:** Using `useFlibitStore` for raw state and `useFlibitDerived` for complex calculations (like Error Detection and Binary Parsing).
- **Benefits:** Prevents unnecessary re-renders of the entire `App` component when a single bit is toggled.

### 2. Mathematical Logic (`src/utils/math.ts`)
- **Description:** All numerical operations are performant and overflow-safe using native `BigInt`.
- **Functions:**
  - `simulateHardwareTruncation`: Ensures the pattern always matches the selected bit width (8/16/32).
  - `toSigned` / `toUnsigned`: Interprets raw bit patterns as decimal values.
  - `toBinary`: Generates a high-performance bit array for the UI.

### 3. Core Components

#### `BitDisplay.tsx`
- **Logic:** Subscribes to `binaryArray` from the derived store.
- **UI:** Features a 3D-perspective "Bit Flip" animation using CSS `backface-visibility`. Supports keyboard navigation (Enter/Space) and "swipe" toggling (click-and-drag).

#### `InputArea.tsx`
- **Logic:** Connected to `inputString` and `handleInputChange`. Validates against `maxConvertNumber` and `minConvertNumber` derived states.
- **UI:** Large, high-impact typography with reactive error styling.

#### `ConvertModeButton.tsx`
- **Logic:** Directly updates store settings (`setBitsLength`, `setIsSigned`, `setClickMode`).
- **UI:** Segmented controls and custom dropdowns with interactive tooltips.

### 4. Internationalization & SEO
- **i18n:** Fully integrated using `react-i18next`. Localization files reside in `src/i18n/`.
- **SEO:** `SEOContent.tsx` provides high-density keywords and educational context (Two's Complement, Binary history) to improve search engine rankings.

---

## Technical Debt & Future Roadmap

1. **Dashboard Expansion:** The current card-based UI is ready to be expanded into a dashboard with a sidebar for "History" and "Bitwise Tools" (AND, OR, NOT).
2. **Additional Bases:** Logic is primed for Hexadecimal and Octal input/output support via the existing Zustand store.
3. **Floating Point:** Planned support for IEEE 754 (Float16/32/64) visualization. This will require new utility functions in `math.ts` to handle mantissa and exponent parsing.
4. **Visual Polish:** Transition the core layout to a more premium, glassmorphism-inspired design (as outlined in `UI_IDEAS.md`).
