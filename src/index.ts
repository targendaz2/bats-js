import * as cp from 'child_process';


type BatsOption = 'count' | 'noTempdirCleanup' | 'recursive' | 'timing';

class BatsResult {
    output: string | number;
    tempdir?: string;

    constructor(output: string | number, tempdir?: string) {
        this.output = output;
        this.tempdir = tempdir;
    }
}

export function bats(path: string = '.', options?: BatsOption[]): BatsResult {
    let command = 'npx bats ' + path;

    if (options?.includes('count')) {
        command += ' --count';
    }

    if (options?.includes('noTempdirCleanup')) {
        command += ' --no-tempdir-cleanup';
    }

    if (options?.includes('recursive')) {
        command += ' --recursive';
    }

    if (options?.includes('timing')) {
        command += ' --timing';
    }

    const result = cp.spawnSync(command, {
        'cwd': '.',
        'shell': true
    });

    if (options?.includes('count')) {
        return new BatsResult(parseInt(result.stdout.toString()));
    }
    return new BatsResult(result.stdout.toString());
}
