import { describe, it, expect } from 'vitest';
import { solve, calculateClicksOnZero } from '../../src/01/part2';

describe('01', () => {
    it('solves', () => {
        const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
        expect(solve(testInput)).toBe("6");
    });

    it('calculates clicks', () => {
        expect(calculateClicksOnZero(1, -1)).toBe(1);
        expect(calculateClicksOnZero(1, 101)).toBe(1);
        expect(calculateClicksOnZero(1, -101)).toBe(2);
        expect(calculateClicksOnZero(-1, 1)).toBe(1);
        expect(calculateClicksOnZero(-1, 101)).toBe(2);
        expect(calculateClicksOnZero(50, 1000)).toBe(10);
        expect(calculateClicksOnZero(50, -1000)).toBe(10);
    });
});
