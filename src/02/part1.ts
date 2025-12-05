import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function isIdValid(id: string): boolean {
    return id.substring(0, id.length / 2) !== id.substring(id.length / 2);
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
