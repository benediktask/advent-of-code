import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function isIdValid(id: string): boolean {
    // try to divide by length at first, to rule out
    // obvious invalid ids on first iteration basis (like '111', '22', etc.)
    // then proceed to divide into bigger parts with each iteration
    // and compare parts among themselves, if division resulted in equal num of parts
    for (let divider = id.length; divider >= 2; divider--) {
        if (id.length % divider !== 0) { continue; }

        const parts: string[] = [];
        const singlePartLength = id.length / divider;

        for (let partStart = 0; ;) {
            const slice = id.substring(partStart, partStart + singlePartLength);
            if (slice.length === 0) { break; }

            parts.push(slice);
            partStart += singlePartLength;
        }

        const allPartsEqual = parts.every(p => p === parts[0]);
        if (allPartsEqual) {
            return false;
        }
    }

    return true;
}

export function solve(input: string): string {
    const ranges = input.split(',');
    const idRanges = ranges.map(r => r.split('-'));

    let acc = 0;
    for (const idRange of idRanges) {
        const start = parseInt(idRange[0]);
        const end = parseInt(idRange[1]);

        for (let id = start; id <= end; id++) {
            if (!isIdValid(String(id))) {
                acc += id;
            }
        }
    }

    return acc.toString(10);
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
