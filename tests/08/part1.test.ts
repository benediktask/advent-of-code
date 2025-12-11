import { describe, it, expect } from 'vitest';
import { calculateEuclidianDistance, solve } from '../../src/08/part1';

describe('08', () => {
    it('solves', () => {
        const testInput = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;
        expect(solve(testInput, 10)).toBe(40);
    });

    // just a sanity check
    it('calculates euclidian distance', () => {
        const pointA: [number, number, number] = [1, 1, 1];
        const pointB: [number, number, number] = [5, 5, 3];

        expect(calculateEuclidianDistance(pointA, pointB)).toBe(6);
    });
});
