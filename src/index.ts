import * as cp from 'child_process';

interface BatsOptions {
    count?: boolean;
    noTempdirCleanup?: boolean;
    recursive?: boolean;
    timing?: boolean;
}

export function bats(path: string = '.', options?: BatsOptions): string | number {
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
        return parseInt(result.stdout.toString());
    }
    return result.stdout.toString();
}
