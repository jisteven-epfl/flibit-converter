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
    set({ inputString: val });

    if (val === "" || val === "-") return;
    
    const parsed = Number(val);
    if (!Number.isInteger(parsed)) return;

    try {
      const state = get();
      const bigVal = BigInt(parsed);
      
      const minConvertBigInt = state.isSigned ? -(1n << BigInt(state.bitsLength - 1)) : 0n;
      const maxConvertBigInt = state.isSigned
        ? (1n << BigInt(state.bitsLength - 1)) - 1n
        : (1n << BigInt(state.bitsLength)) - 1n;

      if (bigVal >= minConvertBigInt && bigVal <= maxConvertBigInt) {
          const truncated = simulateHardwareTruncation(bigVal, state.bitsLength);
          set({ bitPattern: truncated });
      }
    } catch (e) {
      // Ignore parsing errors for partial input
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
    const inputAsNumber = Number(inputString);
    const isInputNoneInteger = !isInputEmpty && inputString !== "-" && !Number.isInteger(inputAsNumber);
    
    const isInputTooBig = !isInputEmpty && inputAsNumber > maxInputNumber;
    const isInputTooSmall = !isInputEmpty && inputAsNumber < minInputNumber;
    const isTooBigToConvert = !isInputEmpty && !isInputNoneInteger && inputString !== "-" && BigInt(inputAsNumber) > maxConvertBigInt;
    const isTooSmallToConvert = !isInputEmpty && !isInputNoneInteger && inputString !== "-" && BigInt(inputAsNumber) < minConvertBigInt;

    const isNegativeUnsigned = !isSigned && inputAsNumber < 0;

    const hasError = !isInputEmpty && inputString !== "-" && (
      isInputNoneInteger ||
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
        isInputEmpty, isInputNoneInteger, isInputTooBig, isInputTooSmall,
        isTooBigToConvert, isTooSmallToConvert, isNegativeUnsigned
    };
};
