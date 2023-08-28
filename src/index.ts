import * as cp from 'child_process';

import { BatsOptions, formatOption, NotImplementedError, notImplementedOptions } from './options.js';

class BatsResult {
    output: string | number;
    tempdir?: string;

    constructor(output: string | number, tempdir?: string) {
        this.output = output;
        this.tempdir = tempdir;
    }
}

export function bats(tests: string = '.', options?: BatsOptions): BatsResult {
    let command = `bats ${tests}`;

    if (options) {
        for (const [option, value] of Object.entries(options)) {
            if (notImplementedOptions.includes(option)) {
                throw new NotImplementedError();
            }

            const formattedOption = formatOption(option, value);
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
