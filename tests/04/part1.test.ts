import { describe, it, expect } from 'vitest';
import { solve } from '../../src/04/part1';

describe('04', () => {
    it('solves', () => {
        const testInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;
        expect(solve(testInput)).toBe(13);
    });
});
