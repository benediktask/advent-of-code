import { describe, it, expect } from 'vitest';
import { solve } from '../../src/09/part1';

describe('09', () => {
    it('solves', () => {
        const testInput = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`;
        expect(solve(testInput)).toBe(50);
    });
});
