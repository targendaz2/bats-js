import decamelize from 'decamelize';

export interface BatsOptions {
    /** Count test cases without running any tests */
    count?: boolean;
    /** 
     * A two character string of code quote delimiters
     * or 'custom' which requires setting $BATS_BEGIN_CODE_QUOTE and
     * $BATS_END_CODE_QUOTE. Can also be set via $BATS_CODE_QUOTE_STYLE
     * */
    codeQuoteStyle?: string;
    /**
     * Controls how file/line references e.g. in stack traces are printed:
     * * comma_line (default): a.bats, line 1
     * * colon:  a.bats:1
     * * uri: file:///tests/a.bats:1
     * * custom: provide your own via defining bats_format_file_line_reference_custom
     *   with parameters <filename> <line>, store via `printf -v "$output"`
     * */
    lineReferenceFormat?: 'comma_line' | 'colon' | 'uri' | 'custom';
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
    /** 
     * NOT IMPLEMENTED
     * 
     * Gather the output of failing *and* passing tests
     * as files in directory (if existing, must be empty) 
     * */
    gatherTestOutputsIn?: never;
    /** 
     * NOT IMPLEMENTED
     * 
     * Display the help message
     * */
    help?: never;
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
    /** 
     * NOT IMPLEMENTED
     * 
     * Directory to write report files (must exist)
     */
    output?: never;
    /** Shorthand for "formatter pretty" */
    pretty?: boolean;
    /** Automatically print the value of `$output` on failed tests */
    printOutputOnFailure?: boolean;
    /** Include tests in subdirectories */
    recursive?: boolean;
    /** 
     * NOT IMPLEMENTED
     * 
     * Switch between reporters (same options as formatter)
     * */
    reportFormatter?: never;
    /** Print output of passing tests */
    showOutputOfPassingTests?: boolean;
    /** Shorthand for "formatter tap" */
    tap?: boolean;
    /**
     * NOT IMPLEMENTED
     * 
     * Add timing information to tests
     */
    timing?: never;
    /** Print test commands as they are executed (like `set -x`) */
    trace?: boolean;
    /** Make `run` print `$output` by default */
    verboseRun?: boolean;
    /**
     * NOT IMPLEMENTED
     * 
     * Display the version number
     */
    version?: never;
}

export const notImplementedOptions = [
    'gatherTestOutputsIn',
    'help',
    'reportFormatter',
    'output',
    'timing',
    'version',
];

/**
 * Formats an option and value as a string
 * @param option the option to format
 * @param value the value of that option
 * @returns the formatted option and value, or null
 */
export function formatOption(option: string, value: any): string | null {
    let formattedOption = '--' + decamelize(option, { separator: '-' });

    switch (typeof value) {
        case 'boolean':
            if (value === false) {
                return null;
            }
            break;
        case 'object':
            if (value instanceof RegExp) {
                value = value.source;
            }
        default:
            formattedOption += ' ' + value;
            break;
    }
    return formattedOption;
}

export function formatOptions(options: BatsOptions): string | null {
    let formattedOptions = '';

    if (!options) {
        return null;
    }

    for (const [option, value] of Object.entries(options)) {
        const formattedOption = formatOption(option, value);
        if (formattedOption) {
            formattedOptions += ' ' + formattedOption;
        }
    }

    return formattedOptions.trim() || null;
}

export class NotImplementedError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
