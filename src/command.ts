import * as fs from 'fs';

import { BatsOptions, DoesNotExistError, NotImplementedError } from './options.js';

export class BatsCommand {
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

    private _testsPathIsValid(tests: string): boolean {
        // Check if the tests path is valid on instantiation
        // We could delegate this to the binary and may do so in the future
        if (tests && fs.existsSync(tests)) {
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
        // Check if the tests path is valid on instantiation
        // We could delegate this to the binary and may do so in the future
        if (!this._testsPathIsValid(tests)) {
            throw new Error();
        }

        // If options are specified, check if they're implemented
        // We check for nonexistent options here to protect against new, future options that have yet to be implemented.
        // We check for not implemented options so we can acknowledge they exist
        if (options) {
            for (const [option, _] of Object.entries(options)) {
                if (!this._optionExists(option)) {
                    throw new DoesNotExistError();
                } else if (!this._optionIsImplemented(option)) {
                    throw new NotImplementedError();
                }
            }
        }
    }
}
