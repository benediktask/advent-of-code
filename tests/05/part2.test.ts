import { describe, it, expect } from 'vitest';
import { adjustRangeToFit, solve } from '../../src/05/part2';

describe('05', () => {
    it('solves', () => {
        const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
        expect(solve(testInput)).toBe(14);
    });

    it('adjusts range', () => {
        expect(adjustRangeToFit(0, 1, [[1, 2]])).toStrictEqual([0, 0]);
        expect(adjustRangeToFit(2, 3, [[1, 2]])).toStrictEqual([3, 3]);
        expect(adjustRangeToFit(1, 2, [[0, 3]])).toStrictEqual(null);
        expect(adjustRangeToFit(0, 3, [[1, 2]])).toStrictEqual([0, 3]);
    });
});
