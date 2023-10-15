import * as cp from 'node:child_process';

function bats(testsPath: string, options?: object) {
    if (options) {
        console.log(options);
    }

    if (!testsPath) {
        throw new Error();
    }

    cp.spawnSync('bats');
}

export default bats;
