import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

function calculateNewPosition(previousPosition: number, rotationCount: number): number {
    let newPosition = (previousPosition + rotationCount) % 100;
    if (newPosition < 0) {
        newPosition += 100;
    }

    return newPosition;
}

export function calculateClicksOnZero(previousPosition: number, rotationCount: number): number {
    let result = 0;

    const fullRotations = Math.floor(Math.abs(rotationCount) / 100);
    result += fullRotations;

    const newPosition = calculateNewPosition(previousPosition, rotationCount);

    if (previousPosition !== 0) {
        if (newPosition === 0) {
            result += 1;
        } else if (rotationCount > 0 && previousPosition > newPosition) {
            result += 1;
        } else if (rotationCount < 0 && previousPosition < newPosition) {
            result += 1;
        }
    }

    return result;
}

export function solve(input: string, initialPosition: number = 50): string {
    const lines = input.split('\n').map(line => line.trim()).filter(Boolean);
    const instructions: [string, number][] = lines.map(line => [line.substring(0, 1), Number(line.substring(1))]);

    let position = initialPosition;
    let zeroCount = 0;

    for (const [direction, rotationCount] of instructions) {
        const previousPosition = position;
        const rotations = direction === "L" ? -rotationCount : rotationCount;

        zeroCount += calculateClicksOnZero(previousPosition, rotations);

        position = calculateNewPosition(previousPosition, rotations);
    }

    return zeroCount.toString(10);
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
