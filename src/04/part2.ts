import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function hasLessThanFourAdjacents(pointX: number, pointY: number, grid: string[]): boolean {
    return [
        grid[pointY - 1]?.[pointX - 1] === '@', // top-left
        grid[pointY - 1]?.[pointX + 0] === '@', // top
        grid[pointY - 1]?.[pointX + 1] === '@', // top-right
        grid[pointY + 0]?.[pointX + 1] === '@', // right
        grid[pointY + 1]?.[pointX + 1] === '@', // bottom-right
        grid[pointY + 1]?.[pointX + 0] === '@', // bottom
        grid[pointY + 1]?.[pointX - 1] === '@', // bottom-left
        grid[pointY + 0]?.[pointX - 1] === '@', // left
    ].filter(Boolean).length < 4;
}

export function solve(input: string): number {
    const grid = input.split('\n').filter(Boolean);

    let accessibleRollCount = 0;
    let needsReevaluation = true;
    while (needsReevaluation) {
        let removedAtLeastOneRoll = false;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === '@' && hasLessThanFourAdjacents(j, i, grid)) {
                    grid[i] = grid[i].substring(0, j) + '.' + grid[i].substring(j + 1);
                    accessibleRollCount++;
                    removedAtLeastOneRoll = true;
                }
            }
        }

        needsReevaluation = removedAtLeastOneRoll;
    }

    return accessibleRollCount;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
