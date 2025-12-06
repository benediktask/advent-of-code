import { describe, it, expect } from 'vitest';
import { solve } from '../../src/04/part2';

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
        expect(solve(testInput)).toBe(43);
    });
});
