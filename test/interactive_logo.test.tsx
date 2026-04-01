import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { FlipBitInteractive } from "../src/components/common/interactive_logo";

describe("FlipBitInteractive", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("flips the bit upon clicking and handles animation lock", () => {
    render(<FlipBitInteractive />);

    // Initially should display '0'
    expect(screen.getByText("0")).toBeDefined();
    
    const container = screen.getByTitle("Click me!");

    // Click it
    fireEvent.click(container);
    
    // Should be locked to prevent multiple clicks immediately
    fireEvent.click(container); // This should hit `if (isFlipping) return;`

    // Advance timer past animation delay (450ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should have updated to '1'
    expect(screen.getByText("1")).toBeDefined();
    
    // Click again to flip back to 0
    fireEvent.click(container);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Should have updated to '0' again (the top value or next value, the element with 0 exists)
    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });
});
