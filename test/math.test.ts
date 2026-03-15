import { describe, it, expect } from 'vitest';
import { toBinary, toSigned, toUnsigned, simulateHardwareTruncation } from '../src/utils/math';

describe('Math Utilities', () => {
    describe('toUnsigned', () => {
        it('should correctly handle 8-bit unsigned', () => {
            expect(toUnsigned(127, 8)).toBe(127);
            expect(toUnsigned(-1, 8)).toBe(255);
            expect(toUnsigned(-128, 8)).toBe(128);
        });

        it('should correctly handle 16-bit unsigned', () => {
            expect(toUnsigned(32767, 16)).toBe(32767);
            expect(toUnsigned(-1, 16)).toBe(65535);
            expect(toUnsigned(-32768, 16)).toBe(32768);
        });

        it('should correctly handle 32-bit unsigned', () => {
            expect(toUnsigned(2147483647, 32)).toBe(2147483647);
            expect(toUnsigned(-1, 32)).toBe(4294967295);
            expect(toUnsigned(-2147483648, 32)).toBe(2147483648);
        });
    });

    describe('toSigned', () => {
        it('should correctly handle 8-bit signed', () => {
            expect(toSigned(127, 8)).toBe(127);
            expect(toSigned(255, 8)).toBe(-1);
            expect(toSigned(128, 8)).toBe(-128);
        });

        it('should correctly handle 16-bit signed', () => {
            expect(toSigned(32767, 16)).toBe(32767);
            expect(toSigned(65535, 16)).toBe(-1);
            expect(toSigned(32768, 16)).toBe(-32768);
        });

        it('should correctly handle 32-bit signed', () => {
            expect(toSigned(2147483647, 32)).toBe(2147483647);
            expect(toSigned(4294967295, 32)).toBe(-1);
            expect(toSigned(2147483648, 32)).toBe(-2147483648);
        });
    });

    describe('simulateHardwareTruncation', () => {
        it('should truncate 8-bit correctly', () => {
            expect(simulateHardwareTruncation(255, 8)).toBe(255);
            expect(simulateHardwareTruncation(256, 8)).toBe(0);
            expect(simulateHardwareTruncation(257, 8)).toBe(1);
        });

        it('should truncate 16-bit correctly', () => {
            expect(simulateHardwareTruncation(65535, 16)).toBe(65535);
            expect(simulateHardwareTruncation(65536, 16)).toBe(0);
            expect(simulateHardwareTruncation(65537, 16)).toBe(1);
        });

        it('should truncate 32-bit correctly', () => {
            expect(simulateHardwareTruncation(4294967295, 32)).toBe(4294967295);
            expect(simulateHardwareTruncation(4294967296, 32)).toBe(0);
            expect(simulateHardwareTruncation(4294967297, 32)).toBe(1);
        });
    });

    describe('toBinary', () => {
        it('should convert 8-bit numbers correctly', () => {
            expect(toBinary(0, 8)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
            expect(toBinary(255, 8)).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
            expect(toBinary(1, 8)).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
            expect(toBinary(128, 8)).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('should convert 16-bit numbers correctly', () => {
            expect(toBinary(0, 16)).toEqual(new Array(16).fill(0));
            expect(toBinary(65535, 16)).toEqual(new Array(16).fill(1));
            const arr = new Array(16).fill(0);
            arr[15] = 1;
            expect(toBinary(1, 16)).toEqual(arr);
        });

        it('should convert 32-bit numbers correctly', () => {
            expect(toBinary(0, 32)).toEqual(new Array(32).fill(0));
            expect(toBinary(4294967295, 32)).toEqual(new Array(32).fill(1));
            const arr = new Array(32).fill(0);
            arr[31] = 1;
            expect(toBinary(1, 32)).toEqual(arr);
        });
    });
});
