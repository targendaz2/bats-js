import { escape } from 'shellwords';
import kebabCase from 'lodash.kebabcase';

export function formatOption(name: string, value: boolean | number | string | string[]) {
    let formattedOption: string;

    if (value) {
        formattedOption = `--${kebabCase(name)}`;
    } else {
        return '';
    }

    if (typeof value === 'string') {
        formattedOption += ` "${escape(value)}"`;
    } else if (value instanceof Array) {
        formattedOption += ` "${value.toString()}"`;
    } else if (typeof value === 'number') {
        formattedOption += ` ${value.toString()}`;
    }

    return formattedOption;
}
