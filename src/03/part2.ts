import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

function findMaxJoltage(bank: string, expectedLength: number = 12): number {
    const qualifyingDigits: number[] = [];
    let digitsToRemove = bank.length - expectedLength;

    for (let i = 0; i < bank.length; i++) {
        const digit = Number(bank[i]);

        while (digitsToRemove > 0
            && qualifyingDigits.length > 0
            && qualifyingDigits[qualifyingDigits.length - 1] < digit
        ) {
            qualifyingDigits.pop();
            digitsToRemove--;
        }

        qualifyingDigits.push(digit);
    }

    while (digitsToRemove > 0) {
        qualifyingDigits.pop();
        digitsToRemove--;
    }

    return Number(qualifyingDigits.join(''));
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
