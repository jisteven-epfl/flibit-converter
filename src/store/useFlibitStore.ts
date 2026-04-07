import { create } from 'zustand';
import { simulateHardwareTruncation, toSigned, toBinary } from '../utils/math';

interface FlibitState {
  bitsLength: 8 | 16 | 32;
  isSigned: boolean;
  clickMode: "flip" | "add";
  bitPattern: bigint;
  inputString: string;
  currentBase: 10 | 16 | 8 | 2;
  
  // Actions
  setBitsLength: (length: 8 | 16 | 32) => void;
  setIsSigned: (isSigned: boolean) => void;
  setClickMode: (mode: "flip" | "add") => void;
  setCurrentBase: (base: 10 | 16 | 8 | 2) => void;
  handleInputChange: (val: string) => void;
  handleInputBlur: () => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBitClick: (id: number) => void;
  triggerHistorySave: () => void;
}

// Internal helper so we don't expose it
function getSyncedInputString(state: Pick<FlibitState, 'isSigned' | 'bitPattern' | 'bitsLength' | 'currentBase'>): string {
  if (state.currentBase === 10) {
    const currentDecimalBigInt = state.isSigned 
      ? toSigned(state.bitPattern, state.bitsLength)
      : simulateHardwareTruncation(state.bitPattern, state.bitsLength);
    return currentDecimalBigInt.toString();
  } else {
    const unsignedBigInt = simulateHardwareTruncation(state.bitPattern, state.bitsLength);
    const str = unsignedBigInt.toString(state.currentBase);
    return state.currentBase === 16 ? str.toUpperCase() : str;
  }
}

export const useFlibitStore = create<FlibitState>((set, get) => ({
  bitsLength: 8,
  isSigned: false,
  clickMode: "flip",
  bitPattern: 0n,
  inputString: "0",
  currentBase: 10,

  setBitsLength: (length) => set((state) => {
    const newState = { ...state, bitsLength: length };
    return { bitsLength: length, inputString: getSyncedInputString(newState) };
  }),

  setIsSigned: (signed) => set((state) => {
    const newState = { ...state, isSigned: signed };
    return { isSigned: signed, inputString: getSyncedInputString(newState) };
  }),

  setClickMode: (mode) => set({ clickMode: mode }),

  setCurrentBase: (base) => set((state) => {
    const newState = { ...state, currentBase: base };
    return { currentBase: base, inputString: getSyncedInputString(newState) };
  }),

  handleInputChange: (val) => {
    if (val === "") {
      set({ inputString: val, bitPattern: 0n });
      return;
    }

    set({ inputString: val });

if (val === "-") {
  if (get().currentBase !== 10) return;
  return;
}

    const base = get().currentBase;
    const isNegativeAllowed = base === 10;
    
    if (!isNegativeAllowed && val.includes('-')) return;

    // validation per base
    if (base === 10 && !/^-?\d+$/.test(val)) return;
    if (base === 16 && !/^[0-9a-fA-F]+$/.test(val)) return;
    if (base === 8 && !/^[0-7]+$/.test(val)) return;
    if (base === 2 && !/^[01]+$/.test(val)) return;

    try {
      const state = get();

      let bigVal: bigint;
      if (base === 10) bigVal = BigInt(val);
      else if (base === 16) bigVal = BigInt("0x" + val);
      else if (base === 8) bigVal = BigInt("0o" + val);
      else bigVal = BigInt("0b" + val);

      // Always truncate to fit the current bit width and set the bit pattern.
      // Error flags in useFlibitDerived indicate out-of-range / truncation conditions.
      set({ bitPattern: simulateHardwareTruncation(bigVal, state.bitsLength) });
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
    const currentBase = useFlibitStore(s => s.currentBase);
    const bitPattern = useFlibitStore(s => s.bitPattern);
    
    // Bounds depend on base
    const minConvertBigInt = (isSigned && currentBase === 10) ? -(1n << BigInt(bitsLength - 1)) : 0n;
    const maxConvertBigInt = (isSigned && currentBase === 10)
      ? (1n << BigInt(bitsLength - 1)) - 1n
      : (1n << BigInt(bitsLength)) - 1n;

    const minConvertNumber = Number(minConvertBigInt);
    const maxConvertNumber = Number(maxConvertBigInt);
    
    // Abstract limits
    const minInputNumber = currentBase === 10 ? Number.MIN_SAFE_INTEGER : 0;
    const maxInputNumber = currentBase === 10 ? Number.MAX_SAFE_INTEGER : Number(maxConvertBigInt);

    const isInputEmpty = inputString === "";
    
    let isPlainInteger = false;
    if (currentBase === 10) isPlainInteger = /^-?\d+$/.test(inputString);
    else if (currentBase === 16) isPlainInteger = /^[0-9a-fA-F]+$/.test(inputString);
    else if (currentBase === 8) isPlainInteger = /^[0-7]+$/.test(inputString);
    else if (currentBase === 2) isPlainInteger = /^[01]+$/.test(inputString);

    const isInputNonInteger = !isInputEmpty && inputString !== "-" && !isPlainInteger;

    // Parse directly from string to avoid precision loss (only for valid plain integers)
    let inputAsBigInt: bigint | null = null;
    if (isPlainInteger) {
        if (currentBase === 10) inputAsBigInt = BigInt(inputString);
        else if (currentBase === 16) inputAsBigInt = BigInt("0x" + inputString);
        else if (currentBase === 8) inputAsBigInt = BigInt("0o" + inputString);
        else inputAsBigInt = BigInt("0b" + inputString);
    }

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
