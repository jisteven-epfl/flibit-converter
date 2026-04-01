import { create } from 'zustand';
import { simulateHardwareTruncation, toSigned, toBinary } from '../utils/math';

interface FlibitState {
  bitsLength: 8 | 16 | 32;
  isSigned: boolean;
  clickMode: "flip" | "add";
  bitPattern: bigint;
  inputString: string;
  
  // Actions
  setBitsLength: (length: 8 | 16 | 32) => void;
  setIsSigned: (isSigned: boolean) => void;
  setClickMode: (mode: "flip" | "add") => void;
  handleInputChange: (val: string) => void;
  handleInputBlur: () => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBitClick: (id: number) => void;
  triggerHistorySave: () => void;
}

// Internal helper so we don't expose it
function getSyncedInputString(state: Pick<FlibitState, 'isSigned' | 'bitPattern' | 'bitsLength'>): string {
  const currentDecimalBigInt = state.isSigned 
    ? toSigned(state.bitPattern, state.bitsLength)
    : simulateHardwareTruncation(state.bitPattern, state.bitsLength);
  return currentDecimalBigInt.toString();
}

export const useFlibitStore = create<FlibitState>((set, get) => ({
  bitsLength: 8,
  isSigned: false,
  clickMode: "flip",
  bitPattern: 0n,
  inputString: "0",

  setBitsLength: (length) => set((state) => {
    const newState = { ...state, bitsLength: length };
    return { bitsLength: length, inputString: getSyncedInputString(newState) };
  }),

  setIsSigned: (signed) => set((state) => {
    const newState = { ...state, isSigned: signed };
    return { isSigned: signed, inputString: getSyncedInputString(newState) };
  }),

  setClickMode: (mode) => set({ clickMode: mode }),

  handleInputChange: (val) => {
    if (val === "") {
      set({ inputString: val, bitPattern: 0n });
      return;
    }

    set({ inputString: val });

    if (val === "-") return;

    // Only accept plain signed decimal integers (no scientific notation, etc.)
    if (!/^-?\d+$/.test(val)) return;

    try {
      const state = get();
      const bigVal = BigInt(val);
      const bitsLengthBigInt = BigInt(state.bitsLength);

      if (state.isSigned) {
        const minConvertBigInt = -(1n << (bitsLengthBigInt - 1n));
        const maxConvertBigInt = (1n << (bitsLengthBigInt - 1n)) - 1n;

        if (bigVal >= minConvertBigInt && bigVal <= maxConvertBigInt) {
          const truncated = simulateHardwareTruncation(bigVal, state.bitsLength);
          set({ bitPattern: truncated });
        }
      } else {
        const maxConvertBigInt = (1n << bitsLengthBigInt) - 1n;

        if (bigVal >= 0n && bigVal <= maxConvertBigInt) {
          const truncated = simulateHardwareTruncation(bigVal, state.bitsLength);
          set({ bitPattern: truncated });
        } else if (bigVal < 0n) {
          // In unsigned mode, interpret negative input as truncated hardware pattern.
          const truncated = simulateHardwareTruncation(bigVal, state.bitsLength);
          set({ bitPattern: truncated });
        }
      }
    } catch {
      // Ignore parsing errors for partial input string states ("-", empty, etc)
    }
  },

  handleBitClick: (id) => {
    const state = get();
    const position = BigInt(state.bitsLength - 1 - id);

    let newPattern = state.bitPattern;
    if (state.clickMode === "add") {
      const addValue = 1n << position;
      newPattern = simulateHardwareTruncation(state.bitPattern + addValue, state.bitsLength);
    } else {
      const mask = 1n << position;
      newPattern = simulateHardwareTruncation(state.bitPattern ^ mask, state.bitsLength);
    }
    
    const newState = { ...state, bitPattern: newPattern };
    set({ bitPattern: newPattern, inputString: getSyncedInputString(newState) });
  },

  triggerHistorySave: () => {
    // Stub
  },

  handleInputBlur: () => {
    get().triggerHistorySave();
  },

  handleInputKeyDown: (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      get().triggerHistorySave();
      e.currentTarget.blur();
    }
  }
}));

// Derived Selectors
// Use this hook for any component that needs derived logic to avoid recalculation manually!
export const useFlibitDerived = () => {
    const bitsLength = useFlibitStore(s => s.bitsLength);
    const isSigned = useFlibitStore(s => s.isSigned);
    const inputString = useFlibitStore(s => s.inputString);
    const bitPattern = useFlibitStore(s => s.bitPattern);
    
    const minConvertBigInt = isSigned ? -(1n << BigInt(bitsLength - 1)) : 0n;
    const maxConvertBigInt = isSigned
      ? (1n << BigInt(bitsLength - 1)) - 1n
      : (1n << BigInt(bitsLength)) - 1n;

    const minConvertNumber = Number(minConvertBigInt);
    const maxConvertNumber = Number(maxConvertBigInt);
    const minInputNumber = Number.MIN_SAFE_INTEGER;
    const maxInputNumber = Number.MAX_SAFE_INTEGER;

    const isInputEmpty = inputString === "";
    const isPlainInteger = /^-?\d+$/.test(inputString);
    const isInputNonInteger = !isInputEmpty && inputString !== "-" && !isPlainInteger;

    // Parse directly from string to avoid precision loss (only for valid plain integers)
    const inputAsBigInt = isPlainInteger ? BigInt(inputString) : null;

    const isInputTooBig = inputAsBigInt !== null && inputAsBigInt > BigInt(maxInputNumber);
    const isInputTooSmall = inputAsBigInt !== null && inputAsBigInt < BigInt(minInputNumber);
    const isTooBigToConvert = inputAsBigInt !== null && inputAsBigInt > maxConvertBigInt;
    const isTooSmallToConvert = inputAsBigInt !== null && inputAsBigInt < minConvertBigInt;

    const isNegativeUnsigned = !isSigned && inputAsBigInt !== null && inputAsBigInt < 0n;

    const hasError = !isInputEmpty && inputString !== "-" && (
      isInputNonInteger ||
      isInputTooBig ||
      isInputTooSmall ||
      isTooBigToConvert ||
      isTooSmallToConvert ||
      isNegativeUnsigned
    );

    const binaryArray = toBinary(bitPattern, bitsLength);

    return {
        binaryArray,
        hasError,
        minConvertNumber, maxConvertNumber,
        minInputNumber, maxInputNumber,
        isInputEmpty, isInputNonInteger, isInputTooBig, isInputTooSmall,
        isTooBigToConvert, isTooSmallToConvert, isNegativeUnsigned
    };
};
