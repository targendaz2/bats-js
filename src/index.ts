import * as cp from 'child_process';

class BatsResult {
    output: string | number;
    tempdir?: string;

    constructor(output: string | number, tempdir?: string) {
        this.output = output;
        this.tempdir = tempdir;
    }
}

interface BatsOptions {
    count?: boolean;
    noTempdirCleanup?: boolean;
    recursive?: boolean;
    timing?: boolean;
}

export function bats(path: string = '.', options?: BatsOptions): BatsResult {
    let command = 'npx bats ' + path;
    if (options?.count) {
        command += ' --count';
    }

    if (options?.noTempdirCleanup) {
        command += ' --no-tempdir-cleanup';
    }

    if (options?.recursive) {
        command += ' --recursive';
    }

    if (options?.timing) {
        command += ' --timing';
    }

    const result = cp.spawnSync(command, {
        'cwd': '.',
        'shell': true
    });

    if (options?.count) {
        return new BatsResult(parseInt(result.stdout.toString()));
    }
    return new BatsResult(result.stdout.toString());
}
