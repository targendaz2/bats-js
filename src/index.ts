import * as cp from 'node:child_process';

/**
 * Runs a Bats command
 * 
 * @param testsPath - path to a Bats test file or a directory containing Bats test files
 * @param options - Bats command line options
 */
function run(testsPath: string, options?: object) {
    if (!testsPath) {
        throw new Error();
    }

    let command = `bats ${testsPath}`;

    if (options && 'count' in options) {
        command += ' --count';
    }

    cp.spawnSync(command);
}

export default {
    run
};
