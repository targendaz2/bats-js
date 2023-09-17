import * as fs from 'fs';

import { BatsOptions, DoesNotExistError, NotImplementedError } from './options.js';
import { Format } from './formatting.js';

/** Object representation of a Bats command */
export class BatsCommand {
    testsPath: string;
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
        if (this.testsPath && fs.existsSync(this.testsPath)) {
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

    /** Checks if an option is implemented */
    private _optionIsImplemented(option: string): boolean {
        return this._implementedOptions[option];
    }

    constructor(testsPath: string, options?: BatsOptions) {
        this.testsPath = testsPath;
        this.options = options;
    }

    /** Validate the tests path and options */
    validate() {
        // Check if the tests path is valid
        // We could delegate this to the binary and may do so in the future
        if (!this._testsPathIsValid()) {
            throw new InvalidCommandError();
        }

        // If options are specified, check if they're implemented
        // We check for nonexistent options here to protect against new, future options that have yet to be implemented.
        // We check for not implemented options so we can acknowledge they exist
        if (this.options) {
            for (const [option] of Object.entries(this.options)) {
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
        let command = 'bats';

        let formattedTestsPath: string | null;
        if (this.testsPath) {
            formattedTestsPath = Format.testsPath(this.testsPath);

            if (formattedTestsPath) {
                command += ` ${formattedTestsPath}`;
            }
        }

        let formattedOptions: string | null;
        if (this.options) {
            formattedOptions = Format.options(this.options);

            if (formattedOptions) {
                command += ` ${formattedOptions}`;
            }
        }

        return command;
    }
}

/** Error thrown for commands that fail validation */
export class InvalidCommandError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
