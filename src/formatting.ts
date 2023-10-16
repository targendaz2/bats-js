import { escape } from 'shellwords';
import kebabCase from 'lodash.kebabcase';

import { BatsOptions, BatsOptionValue } from './options';


export function formatOption(name: string, value: BatsOptionValue) {
    let formattedOption = '';

    if (value) {
        formattedOption = `--${kebabCase(name)}`;
    } else {
        return null;
    }

    if (typeof value === 'string') {
        formattedOption += ` "${escape(value)}"`;
    } else if (value instanceof Array) {
        formattedOption += ` "${value.toString()}"`;
    } else if (typeof value === 'number') {
        formattedOption += ` ${value.toString()}`;
    } else if (value instanceof RegExp) {
        formattedOption += ` "${value.source}"`;
    }

    return formattedOption;
}

export function formatOptions(options: BatsOptions) {
    let formattedOptions = '';

    Object.entries(options).forEach(([name, value]) => {
        const formattedOption = formatOption(name, value);
        if (formattedOption) formattedOptions += `${formattedOption} `;
    });

    if (formattedOptions) {
        return formattedOptions.trimEnd();
    } else {
        return null;
    }
}
