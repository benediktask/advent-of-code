import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function adjustRangeToFit(start: number, end: number, ranges: [number, number][]): [number, number] | null {
    let s = start, e = end;

    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];

        if (s >= range[0] && e <= range[1]) {
            return null;
        }

        if (s < range[0] && e > range[1]) {
            ranges.splice(i, 1, [0, -1]);

            return adjustRangeToFit(s, e, ranges);
        }

        if (s <= range[1] && e >= range[0]) {
            if (s >= range[0] && s <= range[1]) {
                s = range[1] + 1;
            }

            if (s > e) {
                return null;
            }

            if (e >= range[0] && e <= range[1]) {
                e = range[0] - 1;
            }

            if (s > e) {
                return null;
            }
        }
    }

    return [s, e];
}

export function solve(input: string): number {
    const lines = input.split('\n');

    const blankLinePosition = lines.indexOf('');
    if (blankLinePosition === -1 || blankLinePosition === 0 || blankLinePosition === lines.length - 1) {
        throw Error('UnexpectedSeparatorPosition')
    }

    const ingredientIdRanges = lines
        .slice(0, blankLinePosition)
        .filter(Boolean);

    let ranges: [s: number, e: number][] = [];
    for (const idRange of ingredientIdRanges) {
        const [rangeStart, rangeEnd] = idRange.split('-').map(Number);
        const adjustedToFitRange = adjustRangeToFit(rangeStart, rangeEnd, ranges);

        if (adjustedToFitRange !== null) {
            ranges.push(adjustedToFitRange);
        }
    }

    return ranges
        .filter(r => r[0] <= r[1])
        .reduce((acc, current) => acc + (current[1] - current[0] + 1), 0);
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
