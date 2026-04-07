import { describe, it, expect, beforeEach } from "vitest";
import { useFlibitStore } from "../src/store/useFlibitStore";

describe("useFlibitStore Multi-base Logic", () => {
  beforeEach(() => {
    // Reset Zustand store to default state
    useFlibitStore.setState({
      bitsLength: 8,
      isSigned: false,
      clickMode: "flip",
      bitPattern: 0n,
      inputString: "0",
      currentBase: 10,
    });
  });

  it("should parse negative decimal correctly (Signed mode)", () => {
    useFlibitStore.getState().setIsSigned(true);
    useFlibitStore.getState().handleInputChange("-5");
    // -5 in 8-bit two's complement is 251 (11111011)
    expect(useFlibitStore.getState().bitPattern).toBe(251n);
    expect(useFlibitStore.getState().inputString).toBe("-5");
  });

  it("should parse hexadecimal input securely without throwing on invalid chars", () => {
    useFlibitStore.getState().setCurrentBase(16);
    useFlibitStore.getState().handleInputChange("FF");
    expect(useFlibitStore.getState().bitPattern).toBe(255n);
    // Synced string expects hex format, the getter returns "FF" or "ff", usually we return radix string directly.
    expect(useFlibitStore.getState().inputString.toLowerCase()).toBe("ff");

    // Invalid hex string (like "G" or empty)
    useFlibitStore.getState().handleInputChange("XX");
    // Should fallback or keep state safely handled (0n if completely invalid)
    // Looking at the codebase, BigInt parsing is wrapped in try-catch.
    expect(useFlibitStore.getState().inputString).toBe("XX"); 
  });

  it("should parse octal input securely", () => {
    useFlibitStore.getState().setCurrentBase(8);
    useFlibitStore.getState().handleInputChange("77"); // 63 in decimal
    expect(useFlibitStore.getState().bitPattern).toBe(63n);
    expect(useFlibitStore.getState().inputString).toBe("77");

    // Invalid octal digit '9'
    useFlibitStore.getState().handleInputChange("99");
    expect(useFlibitStore.getState().inputString).toBe("99");
  });

  it("should parse binary input securely", () => {
    useFlibitStore.getState().setCurrentBase(2);
    useFlibitStore.getState().handleInputChange("1010"); // 10 in decimal
    expect(useFlibitStore.getState().bitPattern).toBe(10n);
    expect(useFlibitStore.getState().inputString).toBe("1010");
  });

  it("should handle currentBase toggling efficiently", () => {
    useFlibitStore.getState().setCurrentBase(16);
    expect(useFlibitStore.getState().currentBase).toBe(16);
    useFlibitStore.getState().setCurrentBase(10);
    expect(useFlibitStore.getState().currentBase).toBe(10);
  });
});
