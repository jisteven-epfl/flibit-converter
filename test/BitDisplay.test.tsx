import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import BitDisplay from "../src/components/converter/BitDisplay";
import { useFlibitStore } from "../src/store/useFlibitStore";

describe("BitDisplay", () => {
  beforeEach(() => {
    useFlibitStore.setState({
      bitsLength: 8,
      bitPattern: 0n,
      isSigned: false,
      clickMode: "flip",
      inputString: "0"
    });
  });

  test("allows toggling bits via keyboard Enter and Space keys", () => {
    render(<BitDisplay />);

    const bits = screen.getAllByRole("button", { name: /Bit \d+, value is/i });
    expect(bits.length).toBe(8);

    // Focus on the first bit (bit 7, left-most) and hit Enter
    // Wait! The bits array from getAllByRole depends on rendering order.
    // LSB is at the end, MSB is at the beginning.
    // bits[0] is Bit 7.
    fireEvent.keyDown(bits[0], { key: "Enter", code: "Enter" });
    // bit 7 flipped: 10000000 = 128
    expect(useFlibitStore.getState().bitPattern).toBe(128n);
    
    // Focus on the second bit (bit 6) and hit Space
    fireEvent.keyDown(bits[1], { key: " ", code: "Space" });
    // bit 6 flipped: 11000000 = 192
    expect(useFlibitStore.getState().bitPattern).toBe(192n);

    // Other keys should not trigger a click
    fireEvent.keyDown(bits[2], { key: "A", code: "KeyA" });
    expect(useFlibitStore.getState().bitPattern).toBe(192n); // Still 192
  });
});

