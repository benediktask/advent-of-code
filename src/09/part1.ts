import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function calculateEuclidianDistance(
    pointA: [x1: number, y1: number],
    pointB: [x2: number, y2: number]
): number {
    const [x1, y1] = pointA;
    const [x2, y2] = pointB;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function solve(input: string): number {
    const redTileCoordinateList = input
        .split('\n')
        .filter(Boolean)
        .map(l => l.split(',').map(c => Number(c))) as [x: number, y: number][];

    const areas = [];

    for (let i = 0; i < redTileCoordinateList.length; i++) {
        let maxArea = -1;

        for (let j = 0; j < redTileCoordinateList.length; j++) {
            if (i === j) { continue; }

            const area = Math.abs(redTileCoordinateList[i][0] - redTileCoordinateList[j][0] + 1) *
                Math.abs(redTileCoordinateList[i][1] - redTileCoordinateList[j][1] + 1);

            if (area > maxArea) {
                maxArea = area;
            }
        }

        areas.push(maxArea);
    }

    return Math.max(...areas);
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
