import { describe, it, expect } from 'vitest';
import { toBinary, toSigned, toUnsigned, simulateHardwareTruncation, binaryToBigInt } from '../src/utils/math';

describe('Math Utilities', () => {
    describe('toUnsigned', () => {
        it('should correctly handle 8-bit unsigned', () => {
            expect(toUnsigned(127n, 8)).toBe(127n);
            expect(toUnsigned(-1n, 8)).toBe(255n);
            expect(toUnsigned(-128n, 8)).toBe(128n);
        });

        it('should correctly handle 16-bit unsigned', () => {
            expect(toUnsigned(32767n, 16)).toBe(32767n);
            expect(toUnsigned(-1n, 16)).toBe(65535n);
            expect(toUnsigned(-32768n, 16)).toBe(32768n);
        });

        it('should correctly handle 32-bit unsigned', () => {
            expect(toUnsigned(2147483647n, 32)).toBe(2147483647n);
            expect(toUnsigned(-1n, 32)).toBe(4294967295n);
            expect(toUnsigned(-2147483648n, 32)).toBe(2147483648n);
        });
    });

    describe('toSigned', () => {
        it('should correctly handle 8-bit signed', () => {
            expect(toSigned(127n, 8)).toBe(127n);
            expect(toSigned(255n, 8)).toBe(-1n);
            expect(toSigned(128n, 8)).toBe(-128n);
        });

        it('should correctly handle 16-bit signed', () => {
            expect(toSigned(32767n, 16)).toBe(32767n);
            expect(toSigned(65535n, 16)).toBe(-1n);
            expect(toSigned(32768n, 16)).toBe(-32768n);
        });

        it('should correctly handle 32-bit signed', () => {
            expect(toSigned(2147483647n, 32)).toBe(2147483647n);
            expect(toSigned(4294967295n, 32)).toBe(-1n);
            expect(toSigned(2147483648n, 32)).toBe(-2147483648n);
        });
    });

    describe('simulateHardwareTruncation', () => {
        it('should truncate 8-bit correctly', () => {
            expect(simulateHardwareTruncation(255n, 8)).toBe(255n);
            expect(simulateHardwareTruncation(256n, 8)).toBe(0n);
            expect(simulateHardwareTruncation(257n, 8)).toBe(1n);
        });

        it('should truncate 16-bit correctly', () => {
            expect(simulateHardwareTruncation(65535n, 16)).toBe(65535n);
            expect(simulateHardwareTruncation(65536n, 16)).toBe(0n);
            expect(simulateHardwareTruncation(65537n, 16)).toBe(1n);
        });

        it('should truncate 32-bit correctly', () => {
            expect(simulateHardwareTruncation(4294967295n, 32)).toBe(4294967295n);
            expect(simulateHardwareTruncation(4294967296n, 32)).toBe(0n);
            expect(simulateHardwareTruncation(4294967297n, 32)).toBe(1n);
        });
    });

    describe('toBinary', () => {
        it('should convert 8-bit numbers correctly', () => {
            expect(toBinary(0n, 8)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
            expect(toBinary(255n, 8)).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
            expect(toBinary(1n, 8)).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
            expect(toBinary(128n, 8)).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('should convert 16-bit numbers correctly', () => {
            expect(toBinary(0n, 16)).toEqual(new Array(16).fill(0));
            expect(toBinary(65535n, 16)).toEqual(new Array(16).fill(1));
            const arr = new Array(16).fill(0);
            arr[15] = 1;
            expect(toBinary(1n, 16)).toEqual(arr);
        });

        it('should convert 32-bit numbers correctly', () => {
            expect(toBinary(0n, 32)).toEqual(new Array(32).fill(0));
            expect(toBinary(4294967295n, 32)).toEqual(new Array(32).fill(1));
            const arr = new Array(32).fill(0);
            arr[31] = 1;
            expect(toBinary(1n, 32)).toEqual(arr);
        });
    });
    
    describe('binaryToBigInt', () => {
        it('should convert array back to BigInt', () => {
            expect(binaryToBigInt([0, 0, 0, 0, 0, 0, 0, 0])).toBe(0n);
            expect(binaryToBigInt([1, 1, 1, 1, 1, 1, 1, 1])).toBe(255n);
            expect(binaryToBigInt([1, 0, 0, 0, 0, 0, 0, 0])).toBe(128n);
        });
    });
});
