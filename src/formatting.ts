import { escape } from 'shellwords';
import kebabCase from 'lodash.kebabcase';

export function formatOption(name: string, value: boolean | number | RegExp | string | string[]) {
    let formattedOption: string;

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
