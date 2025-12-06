import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function solve(input: string): number {
    const problemLines = input
        .split('\n')
        .filter(Boolean);

    const lineLength = problemLines[0].length;

    const operators = problemLines[problemLines.length - 1]
        .split(/ +/).filter(Boolean);

    const operandLines = problemLines.slice(0, problemLines.length - 1);

    const numberGroups = [];
    let numbers = [];
    for (let j = lineLength; j >= 0; j--) {
        let digits = '';

        for (let i = 0; i < operandLines.length; i++) {
            if (operandLines[i][j] !== undefined) {
                digits += operandLines[i][j].trim();
            }
        }

        if (digits !== '') {
            numbers.push(parseInt(digits, 10));
        }

        if (digits === '' || j === 0) {
            numberGroups.unshift(numbers);
            numbers = [];
        }
    }

    let grandTotal = 0;
    for (let k = operators.length - 1; k >= 0; k--) {
        const operator = operators[k];
        const operands = numberGroups[k];

        let operationResult = operator === '*' ? 1 : 0;
        if (operator === '*') {
            for (const operand of operands) {
                operationResult *= operand;
            }
        }

        if (operator === '+') {
            for (const operand of operands) {
                operationResult += operand;
            }
        }

        grandTotal += operationResult;
    }

    return grandTotal;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
