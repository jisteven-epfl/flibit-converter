export function toUnsigned(val: bigint, bitsLength: number): bigint {
    // Two's complement: wrap negative numbers into unsigned space
    return val < 0n ? val + (1n << BigInt(bitsLength)) : val;
}

export function simulateHardwareTruncation(val: bigint, bitsLength: number): bigint {
    const mask = (1n << BigInt(bitsLength)) - 1n; // e.g. 255n for 8 bits
    return val & mask;
}

export function toSigned(unsignedVal: bigint, bitsLength: number): bigint {
    const msbValue = 1n << BigInt(bitsLength - 1);
    const mask = (1n << BigInt(bitsLength)) - 1n;
    const maskedVal = unsignedVal & mask; // Ensure we only consider the defined bitsLength
    // Two's complement: if MSB is set, it's a negative number
    return maskedVal >= msbValue ? maskedVal - (1n << BigInt(bitsLength)) : maskedVal;
}

export function toBinary(val: bigint, bitsLength: number): Array<number> {
    const valTruncated = simulateHardwareTruncation(val, bitsLength);
    const bits: number[] = [];
    for (let i = bitsLength - 1; i >= 0; i--) {
        const bit = Number((valTruncated >> BigInt(i)) & 1n);
        bits.push(bit);
    }
    return bits;
}

export function binaryToBigInt(binaryArray: Array<number>): bigint {
    return binaryArray.reduce((acc, bit) => (acc << 1n) | BigInt(bit), 0n);
}
