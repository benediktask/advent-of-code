import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function solve(input: string, initialPosition: number = 50): string {
    const lines = input.split('\n').map(line => line.trim()).filter(Boolean);
    const instructions: [string, number][] = lines.map(line => [line.substring(0, 1), Number(line.substring(1))]);

    let position = initialPosition;
    let zeroCount = 0;

    for (const [direction, rotationCount] of instructions) {
        position = (position + (direction === "L" ? -1 * rotationCount : rotationCount)) % 100;

        if (position < 0) {
            position += 100;
        }

        if (position === 0) {
            zeroCount++;
        }
    }

    return zeroCount.toString(10);
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
