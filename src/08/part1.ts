import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function calculateEuclidianDistance(
    pointA: [x1: number, y1: number, z1: number],
    pointB: [x2: number, y2: number, z2: number]
): number {
    const [x1, y1, z1] = pointA;
    const [x2, y2, z2] = pointB;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

function dfs(v: number, m: number[][], visited: number[]) {
    const s = [v];
    const path: number[] = [];

    while (s.length > 0) {
        const vv = s.pop();

        if (vv !== undefined && !visited.includes(vv)) {
            visited.push(vv);
            path.push(vv);

            for (let i = 0; i < m.length; i++) {
                if (m[vv][i] > 0 && !visited.includes(i)) {
                    s.push(i);
                }
            }
        }
    }

    return path;
}

function calculateDistancesBetweenPoints(pointCoordinatesList: [number, number, number][]) {
    const pointsAndDistances = [];

    for (let i = 0; i < pointCoordinatesList.length; i++) {
        for (let j = i + 1; j < pointCoordinatesList.length; j++) {
            pointsAndDistances.push([
                i,
                j,
                calculateEuclidianDistance(
                    pointCoordinatesList[i],
                    pointCoordinatesList[j],
                )
            ]);
        }
    }

    return pointsAndDistances;
}

function buildAdjacencyMatrix(pointCoordinatesList: [number, number, number][], connections: [number, number][]) {
    const matrix = Array.from(
        { length: pointCoordinatesList.length },
        () => Array.from({ length: pointCoordinatesList.length }, () => 0)
    );

    for (const [i, j] of connections) {
        matrix[i][j] = matrix[j][i] = 1;
    }

    return matrix;
}

function resolveCircuits(vertexList: number[], adjacencyMatrix: number[][]) {
    const paths = [];
    const visitedVertices: number[] = [];

    for (const vertex of vertexList) {
        const path = dfs(vertex, adjacencyMatrix, visitedVertices);
        if (path.length > 0) {
            paths.push(path);
        }
    }

    return paths;
}

export function solve(input: string, howManyShortestConnections: number): number {
    const lines = input
        .split('\n')
        .filter(Boolean);

    const coordinateList = lines
        .map(l => l.split(',').filter(Boolean).map(Number)) as [number, number, number][];

    const distances = calculateDistancesBetweenPoints(coordinateList);

    const shortestConnections = distances
        .sort(([, , distanceA], [, , distanceB]) => distanceA - distanceB)
        .slice(0, howManyShortestConnections)
        .map(([i, j]) => [i, j]) as [number, number][];

    const adjacencyMatrix = buildAdjacencyMatrix(coordinateList, shortestConnections);

    const sortedUniqueVertexList = Array.from(new Set(shortestConnections.flatMap(c => c).sort((a, b) => a - b)).values());

    const circuits = resolveCircuits(sortedUniqueVertexList, adjacencyMatrix);

    const threeLargestCircuits = circuits
        .sort((a, b) => b.length - a.length)
        .slice(0, 3);

    return threeLargestCircuits.reduce((acc, c) => acc * c.length, 1);
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput(), 1000));
}

if (require.main === module) {
    main();
}
