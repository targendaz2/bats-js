import * as cp from 'node:child_process';

/**
 * Runs a Bats command
 * 
 * @param testsPath - path to a Bats test file or a directory containing Bats test files
 * @param options - Bats command line options
 */
function run(testsPath: string, options?: object) {
    if (options) {
        console.log(options);
    }

    if (!testsPath) {
        throw new Error();
    }

    cp.spawnSync(`bats ${testsPath}`);
}

export default {
    run
};
