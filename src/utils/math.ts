export function toUnsigned(val: number, bitsLength: number): number {
    // Two's complement: wrap negative numbers into unsigned space
    return val < 0 ? val + Math.pow(2, bitsLength) : val;
}

export function simulateHardwareTruncation(val: number, bitsLength: number): number {
    const maxUnsigned = Math.pow(2, bitsLength);
    const mask = BigInt(maxUnsigned) - 1n; // e.g. 255n for 8 bits
    return Number(BigInt(val) & mask);
}

export function toSigned(unsignedVal: number, bitsLength: number): number {
    const msbValue = Math.pow(2, bitsLength - 1);
    // Two's complement: if MSB is set, it's a negative number
    return unsignedVal >= msbValue ? unsignedVal - Math.pow(2, bitsLength) : unsignedVal;
}

export function toBinary(n: number, bitsLength: number): Array<number> {
    const bits = Array.from({ length: bitsLength }, (_, i) => {
        const shiftAmount = bitsLength - 1 - i;
        return (n >>> shiftAmount) & 1;
    });
    return bits;
}
