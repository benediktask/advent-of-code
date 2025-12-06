import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

function isWithinRange(idRange: string, id: string): boolean {
    const [rangeStart, rangeEnd] = idRange.split('-').map(n => parseInt(n, 10));

    return rangeStart <= parseInt(id, 10) && parseInt(id, 10) <= rangeEnd;
}

export function solve(input: string): number {
    const lines = input.split('\n');

    const blankLinePosition = lines.indexOf('');
    if (blankLinePosition === -1 || blankLinePosition === 0 || blankLinePosition === lines.length - 1) {
        throw Error('UnexpectedSeparatorPosition')
    }

    const ingredientIdRanges = lines.slice(0, blankLinePosition).filter(Boolean);
    const availableIngredientIds = lines.slice(blankLinePosition + 1).filter(Boolean);

    let freshIngredientCount = 0;
    for (const ingredientId of availableIngredientIds) {
        for (const ingredientIdRange of ingredientIdRanges) {
            if (isWithinRange(ingredientIdRange, ingredientId)) {
                freshIngredientCount++;
                break;
            }
        }
    }

    return freshIngredientCount;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
