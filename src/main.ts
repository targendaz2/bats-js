import * as cp from 'child_process';

import { IBatsOptions, NotImplementedError, notImplementedOptions } from './options.js';
import { Format } from './formatting.js';

class BatsResult {
    output: string | number;
    tempdir?: string;

    constructor(output: string | number, tempdir?: string) {
        this.output = output;
        this.tempdir = tempdir;
    }
}

export function bats(tests: string = '.', options?: IBatsOptions): BatsResult {
    let command = `bats ${tests}`;

    if (options) {
        for (const [option, value] of Object.entries(options)) {
            if (notImplementedOptions.includes(option)) {
                throw new NotImplementedError();
            }

            const formattedOption = Format.singleOption(option, value);
            if (formattedOption) {
                command += ' ' + formattedOption;
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
