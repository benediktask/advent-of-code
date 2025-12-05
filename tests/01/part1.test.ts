import { describe, it, expect } from 'vitest';
import { solve } from '../../src/01/part1';

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
        expect(solve(testInput)).toBe("3");
    });
});
