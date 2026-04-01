---
name: flibit-architecture
description: Specialized knowledge on the Flibit Converter architectural state, 64-bit BigInt logic, and Zustand store management.
---
# Flibit Converter Architecture Skill

This skill provides the required context and implementation patterns for the Flibit Converter project, specifically focusing on the 64-bit BigInt logic, derived bit patterns, and global state management via Zustand.

## Core Logic Principles:

1. **State Persistence**: 
   The single source of truth is `bitPattern` (`bigint`) stored in `useFlibitStore`. This stores the exact raw bit configuration of the hardware simulation.

2. **Derived UI State**: 
   Use the `useFlibitDerived` hook to obtain:
   - `binaryArray`: The bit-by-bit representation (0/1).
   - `hasError`: Boolean flag for UI validation.
   - `isTooBigToConvert`: Flag if the decimal input overflows the current bit width.
   - DO NOT recalculate these in components; always subscribe to the derived hook.

3. **Hardware Simulation**: 
   - Use `simulateHardwareTruncation(bigval, bits)` from `src/utils/math.ts` to ensure bit patterns always fit within the selected width (8, 16, or 32 bits).
   - Use `toSigned(pattern, bits)` to interpret the raw pattern as a Two's Complement signed integer.

4. **Zustand Usage**:
   - `useFlibitStore` handles `bitsLength`, `isSigned`, `clickMode`, `bitPattern`, and `inputString`.
   - Actions (setters) are located directly inside the store to keep logic encapsulated.
   - Use atomic selectors: `const val = useFlibitStore(s => s.val)`.

## Future Maintenance and Updates:

- When adding new numerical bases (e.g., Hex, Float16/32/64), extend the `useFlibitStore` state and the `useFlibitDerived` selectors to provide consistent outputs across all conversion modes.
- Ensure all business logic remains in the `src/store/` directory, keeping components purely as UI view layers.

## Testing Guidelines:

- **State Cleanliness**: You MUST use `useFlibitStore.setState(...)` inside a `beforeEach` block in integration tests to ensure tests are isolated.
- **Coverage**: Maintain the current 96% line coverage by writing unit tests for any new `useFlibitDerived` results.
