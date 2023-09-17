import _ from 'lodash';

import { BatsCommand } from './command.js';
import { IBatsOptions } from './options.js';

export namespace Format {

    /**
     * Formats a tests path as a string
     * @param testsPath the path to the tests
     * @returns the formatted tests path or null
     */
    export function testsPath(testsPath: string): string | null {
        if (!testsPath) {
            return null;
        }

        return `"${testsPath}"`;
    }

    /**
     * Formats an option and value as a string
     * @param option the option to format
     * @param value the value of that option
     * @returns the formatted option and value, or null
     */
    export function singleOption(option: string, value: unknown): string | null {
        let formattedOption = '--' + _.kebabCase(option);

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

    /**
     * Formats a BatsOptions object as a string
     * @param options the BatsOptions object to format
     * @returns the formatted options or null
     */
    export function options(options: IBatsOptions): string | null {
        let formattedOptions = '';

        if (!options) {
            return null;
        }

        for (const [option, value] of Object.entries(options)) {
            const formattedOption = singleOption(option, value);
            if (formattedOption) {
                formattedOptions += ' ' + formattedOption;
            }
        }

        return formattedOptions.trim() || null;
    }

    /**
     * Formats a BatsCommand object as a string
     * @param command the BatsCommand object to format
     * @returns the formatted command or null
     */
    export function command(command: BatsCommand): string | null {
        let formattedCommand = 'bats';

        if (command.testsPath) {
            formattedCommand += ` ${testsPath(command.testsPath)}`;
        }
        if (command.options) {
            formattedCommand += ` ${command.options.toString()}`;
        }

        if (formattedCommand === 'bats') {
            return null;
        } else {
            return formattedCommand;
        }
    }
}
