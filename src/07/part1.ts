import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

function addBeam(line: string, atPos: number) {
    return line.substring(0, atPos) + '|' + line.substring(atPos + 1);
}

export function solve(input: string): number {
    const lines = input
        .split('\n')
        .filter(Boolean);

    let splitCount = 0;
    for (let i = 1; i < lines.length; i++) {
        const previousLine = lines[i - 1];
        let currentLine = lines[i];

        for (let j = 0; j < currentLine.length; j++) {
            if ((previousLine[j] === '|' || previousLine[j] === 'S') && currentLine[j] === '.') {
                currentLine = addBeam(currentLine, j);
            }

            if (currentLine[j] === '^' && previousLine[j] === '|') {
                splitCount += 1;

                if (currentLine[j - 1] === '.') {
                    currentLine = addBeam(currentLine, j - 1);
                }

                if (currentLine[j + 1] === '.') {
                    currentLine = addBeam(currentLine, j + 1);
                }
            }
        }

        lines.splice(i, 1, currentLine);
    }

    return splitCount;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
