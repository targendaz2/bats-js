import * as cp from 'child_process';

import decamelize from 'decamelize';

export interface BatsOptions {
    /** Count test cases without running any tests */
    count?: boolean;
    /** Only run tests that match the regular expression */
    filter?: RegExp;
    /** 
     * Only run tests with the given status in the last completed (no CTRL+C/SIGINT) run.
     * 
     * Valid <status> values are:
     * * failed - runs tests that failed or were not present in the last run
     * * missed - runs tests that were not present in the last run
     * */
    filterStatus?: 'failed' | 'missed';
    /** 
     * Only run tests that match all the tags in the list (&&).
     * 
     * You can negate a tag via prepending '!'.
     * */
    filterTags?: string[] | string;
    /** Switch between formatters: pretty (default), tap (default w/o term), tap13, junit */
    formatter?: 'pretty' | 'tap' | 'tap13' | 'junit';
    /** Number of parallel jobs (requires GNU parallel or shenwei356/rush) */
    jobs?: number;
    /** Name of parallel binary */
    parallelBinaryName?: string;
    /** Preserve test output temporary directory */
    noTempdirCleanup?: boolean;
    /** Serialize test file execution instead of running them in parallel (requires jobs >1) */
    noParallelizeAcrossFiles?: boolean;
    /** Serialize test execution within files instead of running them in parallel (requires jobs >1) */
    noParallelizeWithinFiles?: boolean;
    /** Shorthand for "formatter pretty" */
    pretty?: boolean;
    /** Automatically print the value of `$output` on failed tests */
    printOutputOnFailure?: boolean;
    /** Include tests in subdirectories */
    recursive?: boolean;
    /** Print output of passing tests */
    showOutputOfPassingTests?: boolean;
    /** Shorthand for "formatter tap" */
    tap?: boolean;
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

    if (options) {
        for (const [option, value] of Object.entries(options)) {
            switch (typeof value) {
                case 'boolean':
                    if (value === true) {
                        command += ' --' + decamelize(option, { separator: '-' });
                    }
                    break;
                default:
                    command += ' --' + decamelize(option, { separator: '-' });
                    command += ' ' + value;
            }
        }
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
