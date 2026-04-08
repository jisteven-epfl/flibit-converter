import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "../src/App";

// Helper to track internal router location
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

function renderApp(initialPath = "/") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <LocationDisplay />
        <App />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe("Integration Tests", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    localStorage.clear();
    // Mock window.scrollTo since jsdom doesn't implement it
    window.scrollTo = vi.fn();
  });

  it("should scroll to top when logo/title is clicked", async () => {
    renderApp("/");
    const titleLink = screen.getByText(/Flibit/i, { selector: 'span' }).closest("a")!;
    await user.click(titleLink);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("should redirect from an invalid route to home", async () => {
    renderApp("/some-invalid-route");
    // Should see the main app content
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
  });

  it("should sync i18n language with the URL path on initial load (/zh)", async () => {
    renderApp("/zh");
    // Wait for the useEffect in App.tsx to sync the language
    await waitFor(() => {
      expect(document.documentElement.lang).toBe("zh");
    });
    // Check for some Chinese text (using getAll because it might be in multiple places)
    expect(screen.getAllByText(/二进制/i)[0]).toBeInTheDocument();
  });

  it("should handle navigation between languages and maintain state", async () => {
    renderApp("/");
    
    // Switch to Chinese via UI
    const zhBtn = screen.getByRole("button", { name: /中文/i });
    await user.click(zhBtn);
    
    expect(screen.getByTestId("location-display")).toHaveTextContent("/zh");
    expect(document.documentElement.lang).toBe("zh");

    // Switch back to English
    const enBtn = screen.getByRole("button", { name: /English/i });
    await user.click(enBtn);

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    expect(document.documentElement.lang).toBe("en");
  });
});
