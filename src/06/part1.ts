import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function solve(input: string): number {
    const problemGrid = input
        .split('\n')
        .filter(Boolean)
        .map(r => r.split(/ +/).filter(Boolean))
        .reverse();

    const columnCount = problemGrid[0].length;
    const operators = problemGrid.slice(0, 1).flat();;
    const remainingGrid = problemGrid.slice(1);

    let acc = 0;
    for (let i = 0; i < columnCount; i++) {
        let result = operators[i] === '*' ? 1 : 0;

        for (let j = 0; j < remainingGrid.length; j++) {
            const num = parseInt(remainingGrid[j][i], 10);

            if (operators[i] === '*') {
                result *= num;
            }

            if (operators[i] === '+') {
                result += num;
            }
        }

        acc += result;
    }

    return acc;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
