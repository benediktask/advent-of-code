import { describe, it, expect } from 'vitest';
import { solve } from '../../src/03/part1';

describe('03', () => {
    it('solves', () => {
        const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`;
        expect(solve(testInput)).toBe(357);
    });
});
