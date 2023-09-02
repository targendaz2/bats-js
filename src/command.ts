import * as fs from 'fs';

import { BatsOptions, DoesNotExistError, NotImplementedError } from './options.js';

/** Object representation of a Bats command */
export class BatsCommand {
    tests: string;
    options?: BatsOptions;

    private _implementedOptions: {[key: string]: boolean} = {
        count: true,
        codeQuoteStyle: true,
        lineReferenceFormat: true,
        filter: true,
        filterStatus: true,
        filterTags: true,
        formatter: true,
        gatherTestOutputsIn: false,
        help: false,
        jobs: true,
        parallelBinaryName: true,
        noTempdirCleanup: true,
        noParallelizeAcrossFiles: true,
        noParallelizeWithinFiles: true,
        output: false,
        pretty: true,
        printOutputOnFailure: true,
        recursive: true,
        reportFormatter: false,
        showOutputOfPassingTests: true,
        tap: true,
        timing: false,
        trace: true,
        verboseRun: true,
        version: false,
    };

    private _testsPathIsValid(): boolean {
        // Check if the tests path is valid
        // We could delegate this to the binary and may do so in the future
        if (this.tests) {
            return true;
        }
        return false;
    }

    private _testsPathExists(): boolean {
        // Check if the tests path exists
        // We could delegate this to the binary and may do so in the future
        if (fs.existsSync(this.tests)) {
            return true;
        }
        return false;
    }
    
    private _optionExists(option: string): boolean {
        if (Object.keys(this._implementedOptions).includes(option)) {
            return true;
        }
        return false;
    }

    private _optionIsImplemented(option: string): boolean {
        return this._implementedOptions[option];
    }

    constructor(tests: string, options?: BatsOptions) {
        this.tests = tests;
        this.options = options;
    }

    validate() {
        // Check if the tests path is valid
        // We could delegate this to the binary and may do so in the future
        if (!this._testsPathIsValid() || !this._testsPathExists()) {
            throw new InvalidCommandError();
        }

        // If options are specified, check if they're implemented
        // We check for nonexistent options here to protect against new, future options that have yet to be implemented.
        // We check for not implemented options so we can acknowledge they exist
        if (this.options) {
            for (const [option, _] of Object.entries(this.options)) {
                if (!this._optionExists(option)) {
                    throw new DoesNotExistError();
                } else if (!this._optionIsImplemented(option)) {
                    throw new NotImplementedError();
                }
            }
        }
    }

    /** Formats the command as a callable string */
    toString(): string {
        if (!this._testsPathIsValid()) {
            throw new InvalidCommandError();
        }
        
        return `bats "${this.tests}"`;
    }
}

/** Error thrown for commands that fail validation */
export class InvalidCommandError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
