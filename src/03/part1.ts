import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

function findMaxJoltage(bank: string): number {
    const [value1, pos1] = findMaxChar(bank, 0, bank.length - 1);
    const [value2] = findMaxChar(bank, pos1 + 1, undefined);

    return parseInt(`${value1}${value2}`, 10);
}

function findMaxChar(input: string, startPos: number, stopPos: number | undefined) {
    return [...input.substring(startPos, stopPos)]
        .map(n => parseInt(n, 10))
        .reduce((acc, current, index) => current > acc[0] ? [current, index] : acc, [-1, -1]);
}

export function solve(input: string): number {
    const banks = input.split('\n').filter(Boolean);
    let totalJoltage = 0;

    for (const bank of banks) {
        totalJoltage += findMaxJoltage(bank);
    }

    return totalJoltage;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
