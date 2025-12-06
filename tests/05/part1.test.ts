import { describe, it, expect } from 'vitest';
import { solve } from '../../src/05/part1';

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
        expect(solve(testInput)).toBe(3);
    });
});
