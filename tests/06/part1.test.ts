import { describe, it, expect } from 'vitest';
import { solve } from '../../src/06/part1';

describe('06', () => {
    it('solves', () => {
        const testInput = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   + `;
        expect(solve(testInput)).toBe(4277556);
    });
});
