import * as cp from 'child_process';

export interface BatsOptions {
    /** Count test cases without running any tests */
    count?: boolean;
    /** Only run tests that match the regular expression */
    filter?: string;
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
    filterTags?: string;
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

    if (options?.count) {
        command += ' --count';
    }

    if (options?.filter) {
        command += ` --filter ${options.filter}`;
    }

    if (options?.filterStatus) {
        command += ` --filter-status ${options.filterStatus}`;
    }

    if (options?.filterTags) {
        command += ` --filter-tags ${options.filterTags}`;
    }

    if (options?.formatter) {
        command += ` --formatter ${options.formatter}`;
    }

    if (options?.jobs) {
        command += ` --jobs ${options.jobs}`;
    }

    if (options?.noTempdirCleanup) {
        command += ' --no-tempdir-cleanup';
    }

    if (options?.noParallelizeAcrossFiles) {
        command += ' --no-parallelize-across-files';
    }

    if (options?.noParallelizeWithinFiles) {
        command += ' --no-parallelize-within-files';
    }

    if (options?.pretty) {
        command += ' --pretty';
    }

    if (options?.recursive) {
        command += ' --recursive';
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
