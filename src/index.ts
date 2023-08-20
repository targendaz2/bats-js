import * as cp from 'child_process';

export interface BatsOptions {
    /** Count test cases without running any tests */
    count?: boolean;
    /** Only run tests that match the regular expression */
    filter?: string;
    /** Preserve test output temporary directory */
    noTempdirCleanup?: boolean;
    /** Automatically print the value of `$output` on failed tests */
    printOutputOnFailure?: boolean;
    /** Include tests in subdirectories */
    recursive?: boolean;
    /** Add timing information to tests */
    timing?: boolean;
    /** Print test commands as they are executed (like `set -x`) */
    trace?: boolean;
    /** Make `run` print `$output` by default */
    verboseRun?: boolean;
}

class BatsResult {
    output: string | number;
    tempdir?: string;

    constructor(output: string | number, tempdir?: string) {
        this.output = output;
        this.tempdir = tempdir;
    }
}

export function bats(tests: string = '.', options?: BatsOptions): BatsResult {
    let command = 'npx bats ' + tests;

    if (options?.count) {
        command += ' --count';
    }

    if (options?.filter) {
        command += ` --filter ${options.filter}`;
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
