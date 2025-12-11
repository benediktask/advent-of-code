import { describe, it, expect } from 'vitest';
import { solve } from '../../src/11/part1';

describe('11', () => {
    it('solves', () => {
        const testInput = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`;
        expect(solve(testInput)).toBe(5);
    });
});
