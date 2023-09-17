import _ from 'lodash';

import { BatsOptions } from './options.js';

export namespace Formatting {
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
    export function batsOptions(options: BatsOptions): string | null {
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
}
