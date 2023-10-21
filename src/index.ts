import cp from 'node:child_process';

import { BatsOptions } from './options';

/**
 * Runs a Bats command
 * 
 * @param testsPath - path to a Bats test file or a directory containing Bats test files
 * @param options - Bats command line options
 */
function run(testsPath: string, options?: BatsOptions) {
    // TODO: DRY
    if (!testsPath) throw new Error();

    let command = `bats ${testsPath}`;

    if (options && 'count' in options) {
        command += ' --count';
    }

    cp.spawnSync(command);
}

function count(testsPath: string, options?: BatsOptions) {
    bats.run(testsPath, {
        ...options,
        count: true,
    });
}

const bats = {
    run,
    count
};

export default bats;
