import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App Integration', () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
        // Clear local storage for reproducible dark mode testing if needed
        localStorage.clear();
    });

    it('should render main components', () => {
        render(<App />);
        expect(screen.getByText(/Flibit/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Decimal Value/i)).toBeInTheDocument();
        expect(screen.getByText(/Binary Result/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /8-bit/i })).toBeInTheDocument();
    });

    it('should toggle bits correctly on click (Flip mode)', async () => {
        render(<App />);

        // Initial state is 0, so bit 0 should have label '0' inside the front face text
        // We'll target the button by aria-label
        const bit0Button = screen.getByRole('button', { name: 'Bit 0, value is 0' });

        // Click bit 0
        await user.click(bit0Button);

        // The input should update to 1
        const input = screen.getByLabelText(/Decimal Value/i) as HTMLInputElement;
        expect(input.value).toBe('1');

        // Bit 0 should now be toggled to 1
        expect(screen.getByRole('button', { name: 'Bit 0, value is 1' })).toBeInTheDocument();

        // Click again to flip back
        await user.click(bit0Button);
        expect(input.value).toBe('0');
    });

    it('should add values correctly on click (Add mode)', async () => {
        render(<App />);

        // Switch to 'add' mode
        const addModeButton = screen.getByRole('button', { name: /^add$/i });
        await user.click(addModeButton);

        // Click bit 0
        const bit0Button = screen.getByRole('button', { name: 'Bit 0, value is 0' });
        await user.click(bit0Button);

        // Input should update to 1
        const input = screen.getByLabelText(/Decimal Value/i) as HTMLInputElement;
        expect(input.value).toBe('1');

        // Click bit 0 again
        // In add mode, adding bit 0 again (value 1) should increment by 1
        // (1 + 1 = 2)
        const bit0ButtonNew = screen.getByRole('button', { name: 'Bit 0, value is 1' });
        await user.click(bit0ButtonNew);
        expect(input.value).toBe('2');

        // Bit 1 should now be 1, Bit 0 should be 0
        expect(screen.getByRole('button', { name: 'Bit 1, value is 1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bit 0, value is 0' })).toBeInTheDocument();
    });

    it('should validate InputArea logic correctly', async () => {
        render(<App />);
        const input = screen.getByLabelText(/Decimal Value/i) as HTMLInputElement;

        // Try an input too big for 8-bit unsigned (max 255)
        await user.type(input, '256');
        expect(input.value).toBe('256');

        // Should show error message for 256 in 8-bit unsigned
        expect(screen.getAllByText(/Input is too big too display, only took 8 LSB./i)[0]).toBeInTheDocument();

        // Try clearing
        await user.clear(input);
        expect(input.value).toBe('');
        expect(screen.getAllByText(/Empty input./i)[0]).toBeInTheDocument();

        // Try negative input for unsigned
        await user.type(input, '-1');
        expect(screen.getAllByText(/Negative input: Displaying bits as interpreted by the hardware./i)[0]).toBeInTheDocument();

        // Try switching to signed
        const signedButton = screen.getByRole('button', { name: /^signed$/i });
        await user.click(signedButton);

        // -1 should no longer show negative hardware warning, since it's signed mode now
        // And it is within 8-bit signed range [-128, 127]
        expect(screen.queryByText(/Negative input:/i)).not.toBeInTheDocument();

        await user.clear(input);
        // Test non-integer input (e.g. 1.5)
        // Since we prevent '.', 'e' onKeyDown, typing '.' won't register normally, so let's fire event
        fireEvent.change(input, { target: { value: '1.5' } });
        expect(screen.getAllByText(/Input is not integer./i)[0]).toBeInTheDocument();
    });

    it('should simulate swipe-to-toggle logic', () => {
        render(<App />);

        const bit0Button = screen.getByRole('button', { name: 'Bit 0, value is 0' });
        const bit1Button = screen.getByRole('button', { name: 'Bit 1, value is 0' });

        // Simulate swipe by firing mouseenter with buttons: 1
        fireEvent.mouseEnter(bit0Button, { buttons: 1 });
        fireEvent.mouseEnter(bit1Button, { buttons: 1 });

        const input = screen.getByLabelText(/Decimal Value/i) as HTMLInputElement;
        expect(input.value).toBe('3'); // Bit 0 (1) + Bit 1 (2) = 3
    });
});
