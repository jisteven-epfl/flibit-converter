import { useState } from "react";
import InputArea from "./InputArea";
import BitDisplay from "./BitDisplay";
import ConvertModeButton from "./ConvertModeButton";

function App() {
  const [bitsLength, setBitsLength] = useState<8 | 16 | 32>(8);
  const maxConvertNumber = Math.pow(2, bitsLength) - 1;
  const maxInputNumber = Number.MAX_SAFE_INTEGER;

  const [inputNumber, setInputNumber] = useState<number | "">("");
  const isInputEmpty = inputNumber === "";
  const isInputNoneInteger = !Number.isInteger(inputNumber);
  const isInputTooBig = !isInputEmpty && inputNumber > maxInputNumber;
  const isTooBigToConvert = !isInputEmpty && inputNumber > maxConvertNumber;
  const isInputValid = !(isInputEmpty || isInputNoneInteger || isInputTooBig);
  const binaryArray = toBinary(isInputValid ? (inputNumber as number) : 0);

  /////////////////////// Handle interaction /////////////////////////////////

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newValueAsNumber = Number(newValue);
    setInputNumber(newValueAsNumber);
  };

  function handleClick(id: number) {
    const newArray =
      inputNumber === "" ? Array(bitsLength).fill(0) : [...binaryArray];
    newArray[id] = binaryArray[id] ^ 1;

    const newNumber = newArray.reduce((acc, bit) => (acc << 1) | bit, 0);
    setInputNumber(newNumber);
  }

  /////////////////////// Helper functions /////////////////////////////////

  function toBinary(n: number): Array<number> {
    const bits = Array.from({ length: bitsLength }, (_, i) => {
      const shiftAmount = bitsLength - 1 - i;
      return (n >> shiftAmount) & 1;
    });
    return bits;
  }

  const getErrorMessage = 
    isInputEmpty ? "empty input" :
    isInputNoneInteger ? "input is not integer" :
    isInputTooBig ? "input is too big too handle" :
    isTooBigToConvert ? `input is too big too display, only took ${bitsLength} LSB` :
    "";

  /////////////////////// Actual Body /////////////////////////////////

  return (
    <div>
      <p
        className="
          w-full
          py-4
          text-center
          font-bold
          bg-blue-300"
      >
        Online Binary Converter
      </p>

      <InputArea
        inputNumber={inputNumber}
        onInputChange={handleInput}
        maxInputNumber={maxInputNumber}
      />

      <ConvertModeButton
        currentMode={bitsLength}
        onModeChange={setBitsLength}
      />

      <BitDisplay
        binaryArray={binaryArray}
        onBitClick={handleClick}
        errorMessage={getErrorMessage}
        bitsLength={bitsLength}
      />
    </div>
  );
}

export default App;
