import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import InfoTooltip from "../src/components/common/InfoTooltip";

describe("InfoTooltip", () => {
  test("renders correctly and shows tooltip on hover", () => {
    const { container: containerElement } = render(<InfoTooltip text="Mock Tooltip Text" />);
    
    // The tooltip should not be visible initially
    expect(screen.queryByText("Mock Tooltip Text")).toBeNull();

    // Find the SVG trigger element's parent container
    const container = containerElement.querySelector("svg")?.parentElement;
    
    // Simulate hover
    if (container) {
      fireEvent.mouseEnter(container);
    }

    // Now it should be visible (portal)
    expect(screen.getByText("Mock Tooltip Text")).toBeDefined();

    // Trigger scroll and resize event to cover `updatePosition` effect lines
    fireEvent.scroll(window);
    fireEvent.resize(window);

    // Simulate mouse leave
    if (container) {
      fireEvent.mouseLeave(container);
    }
    
    // The tooltip should be removed
    expect(screen.queryByText("Mock Tooltip Text")).toBeNull();
  });
});
