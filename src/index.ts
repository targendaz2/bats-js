import cp from 'node:child_process';

import { BatsOptions } from './options';
import { BatsResult } from './result';

/**
 * Runs a Bats command
 * 
 * @param testsPath - path to a Bats test file or a directory containing Bats test files
 * @param options - Bats command line options
 */
function bats(testsPath: string, options?: BatsOptions) {
    if (!testsPath) throw new Error();

    let command = `bats ${testsPath}`;

    if (options && 'count' in options) {
        command += ' --count';
    }

    const commandResult = cp.spawnSync(command, {
        shell: true,
    });

    const batsResult = new BatsResult();
    batsResult.exitCode = commandResult.status;
    if (commandResult.stdout) batsResult.output = commandResult.stdout.toString();
    return batsResult;
}

export default bats;
