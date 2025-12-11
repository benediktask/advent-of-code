import { join, parse } from 'node:path';
import { readFile } from 'node:fs/promises';

async function loadInput(): Promise<string> {
    const buffer = await readFile(join(__dirname, 'input.txt'));
    return buffer.toString('utf-8');
}

export function pressButton(button: number[], state: number[]): number[] {
    const nextState = [...state];

    for (const indicatorPosition of button) {
        nextState[indicatorPosition] ^= 1;
    }

    return nextState;
}

function solveLine(line: { buttons: number[][], desiredLightState: number[] }) {
    const startingState = Array<number>(line.desiredLightState.length).fill(0);

    const stateQueue = [startingState];

    const distanceInPresses = new Map([[startingState.join(''), 0]]);

    const alreadyTraversedStates = new Set([startingState.join('')]);

    while (stateQueue.length > 0) {
        const state = stateQueue.shift();
        if (state === undefined) {
            continue;
        }

        const pressesSoFar = distanceInPresses.get(state.join(''));
        if (pressesSoFar === undefined) {
            continue;
        }

        if (state.join('') === line.desiredLightState.join('')) {
            return pressesSoFar;
        }

        for (const button of line.buttons) {
            const nextState = pressButton(button, state);

            if (!alreadyTraversedStates.has(nextState.join(''))) {
                alreadyTraversedStates.add(nextState.join(''));

                distanceInPresses.set(nextState.join(''), pressesSoFar + 1);

                if (nextState.join('') === line.desiredLightState.join('')) {
                    return pressesSoFar + 1;
                }

                stateQueue.push(nextState);
            }
        }
    }

    return null;
}

export function solve(input: string): number {
    const lines = input
        .split('\n')
        .filter(Boolean);

    const parsedLines = lines.map(l => {
        const [lightDiagram, ...remainingLineParts] = l.split(' ');
        const [, ...buttonParts] = remainingLineParts.reverse();

        const buttons = buttonParts
            .reverse()
            .map(bp => bp.substring(1, bp.length - 1).split(',').map(Number));

        return {
            lightDiagram,
            buttons,
            desiredLightState: lightDiagram
                .substring(1, lightDiagram.length - 1)
                .replaceAll('.', '0')
                .replaceAll('#', '1')
                .split('')
                .map(Number),
        };
    });

    let result = 0;
    for (let i = 0; i < parsedLines.length; i++) {
        const line = parsedLines[i];

        const minPressesNeeded = solveLine(line);
        if (minPressesNeeded !== null) {
            result += minPressesNeeded;
        }
    }

    return result;
}

export default async function main() {
    console.info('RESULT: %s', await solve(await loadInput()));
}

if (require.main === module) {
    main();
}
