import decamelize from 'decamelize';

/**
 * Formats an option and value as a string
 * @param option the option to format
 * @param value the value of that option
 * @returns the formatted option and value, or null
 */
export function formatOption(option: string, value: any): string | null {
    let formattedOption = '--' + decamelize(option, { separator: '-' });

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
