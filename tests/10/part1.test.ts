import { describe, it, expect } from 'vitest';
import { pressButton, solve } from '../../src/10/part1';

describe('10', () => {
    it('solves', () => {
        const testInput = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;
        expect(solve(testInput)).toBe(7);
    });

    it('should transit state after button press', () => {
        // sanity
        expect(pressButton([0], [0])).toStrictEqual([1]);
        expect(pressButton([0], [1])).toStrictEqual([0]);

        // single button
        expect(pressButton([0], [0, 0])).toStrictEqual([1, 0]);
        expect(pressButton([1], [0, 0])).toStrictEqual([0, 1]);
        expect(pressButton([1], [0, 0])).toStrictEqual([0, 1]);
        expect(pressButton([0], [0, 0])).toStrictEqual([1, 0]);

        // multiple buttons
        expect(pressButton([0, 1], [0, 0])).toStrictEqual([1, 1]);
        expect(pressButton([0, 1], [0, 1])).toStrictEqual([1, 0]);
        expect(pressButton([0, 1], [1, 0])).toStrictEqual([0, 1]);
        expect(pressButton([0, 1], [1, 1])).toStrictEqual([0, 0]);

        // button press order does not matter
        expect(pressButton([1, 0], [1, 1])).toStrictEqual([0, 0]);
    });
});
