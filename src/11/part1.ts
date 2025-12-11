import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function solve(input: string): number {
    const lines = input
        .split('\n')
        .filter(Boolean);

    const adjacencyMap = new Map();
    for (let line of lines) {
        const v = line.split(':')[0];
        const e = line.split(':')[1].split(' ').filter(Boolean);

        adjacencyMap.set(v, e);
    }

    const paths = dfs('you', 'out', adjacencyMap);

    return paths.length;
}

function dfs(root: string, target: string, m: Map<string, string[]>): string[][] {
    const paths = [];
    const s = [root];
    const path: string[] = [];

    while (s.length > 0) {
        const vv = s.pop();

        if (vv === undefined) {
            continue;
        }

        if (vv === target) {
            paths.push([...path]);
        } else {
            path.push(vv);

            const e = m.get(vv);
            if (e) {
                for (let i = 0; i < e.length; i++) {
                    s.push(e[i]);
                }
            }
        }
    }

    return paths;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
