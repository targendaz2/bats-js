import { expect } from 'chai';

import { formatOption } from '../src/formatting';

type OptionValue = boolean | number | RegExp | string | string[]
type OptionToFormat = [string, OptionValue, string | null];

describe('single option formatting tests', function () {
    const optionsToFormat: OptionToFormat[] = [
        ['count', true, '--count'],
        ['count', false, null],
        ['codeQuoteStyle', '""', '--code-quote-style "\\"\\""'],
        ['codeQuoteStyle', '\'\'', '--code-quote-style "\\\'\\\'"'],
        ['codeQuoteStyle', '||', '--code-quote-style "\\|\\|"'],
        ['codeQuoteStyle', 'custom', '--code-quote-style "custom"'],
        ['lineReferenceFormat', 'comma_line', '--line-reference-format "comma_line"'],
        ['lineReferenceFormat', 'colon', '--line-reference-format "colon"'],
        ['lineReferenceFormat', 'uri', '--line-reference-format "uri"'],
        ['lineReferenceFormat', 'custom', '--line-reference-format "custom"'],
        ['filter', /addition/, '--filter "addition"'],
        ['filterStatus', 'failed', '--filter-status "failed"'],
        ['filterStatus', 'missed', '--filter-status "missed"'],
        ['filterTags', 'tag1', '--filter-tags "tag1"'],
        ['filterTags', ['tag1'], '--filter-tags "tag1"'],
        ['filterTags', ['tag1', 'tag2'], '--filter-tags "tag1,tag2"'],
        ['filterTags', ['tag1', 'tag2', 'tag3'], '--filter-tags "tag1,tag2,tag3"'],
        ['formatter', 'pretty', '--formatter "pretty"'],
        ['formatter', 'tap', '--formatter "tap"'],
        ['formatter', 'tap13', '--formatter "tap13"'],
        ['formatter', 'junit', '--formatter "junit"'],
        ['jobs', 1, '--jobs 1'],
        ['jobs', 3, '--jobs 3'],
        ['parallelBinaryName', 'parallel', '--parallel-binary-name "parallel"'],
        ['noTempdirCleanup', true, '--no-tempdir-cleanup'],
        ['noTempdirCleanup', false, null],
        ['noParallelizeAcrossFiles', true, '--no-parallelize-across-files'],
        ['noParallelizeAcrossFiles', false, null],
        ['noParallelizeWithinFiles', true, '--no-parallelize-within-files'],
        ['noParallelizeWithinFiles', false, null],
        ['pretty', true, '--pretty'],
        ['pretty', false, null],
        ['printOutputOnFailure', true, '--print-output-on-failure'],
        ['printOutputOnFailure', false, null],
        ['recursive', true, '--recursive'],
        ['recursive', false, null],
        ['showOutputOfPassingTests', true, '--show-output-of-passing-tests'],
        ['showOutputOfPassingTests', false, null],
        ['tap', true, '--tap'],
        ['tap', false, null],
        ['timing', true, '--timing'],
        ['timing', false, null],
        ['trace', true, '--trace'],
        ['trace', false, null],
        ['verboseRun', true, '--verbose-run'],
        ['verboseRun', false, null],
    ];

    const testOptionFormatting = (optionToFormat: OptionToFormat) => function () {
        const [key, value, expectedOutput] = optionToFormat;
        const formattedOption = formatOption(key, value);

        expect(formattedOption).to.equal(expectedOutput);
    };

    optionsToFormat.forEach(optionToFormat => {
        const [key, value] = optionToFormat;
        const testName = `format { ${key}: ${value} }`;

        it(testName, testOptionFormatting(optionToFormat));
    });
});

// type OptionsToFormat = [{ [key: string]: OptionValue }, string | null];

// describe('multiple options formatting tests', function () {
//     const optionsToFormat: OptionsToFormat[] = [
//         [{count: true, recursive: true}, '--count --recursive'],
//         [{count: false, recursive: true}, '--recursive'],
//         [{count: false, recursive: false}, null],
//         [{count: true, filter: /addition/, recursive: true}, '--count --filter "addition" --recursive'],
//         [{count: false, filter: /addition/, recursive: false}, '--filter "addition"'],
//         [{filterTags: ['tag1'], recursive: true}, '--filter-tags "tag1"'],
//         ['filterTags', ['tag1,tag2'], '--filter-tags "tag1,tag2"'],
//         ['filterTags', ['tag1,tag2,tag3'], '--filter-tags "tag1,tag2,tag3"'],
//         ['noTempdirCleanup', true, '--no-tempdir-cleanup'],
//         ['noTempdirCleanup', false, null],
//     ];

//     const testOptionFormatting = (optionToFormat: OptionToFormat) => function () {
//         const [key, value, expectedOutput] = optionToFormat;
//         const formattedOption = formatOption(key, value);

//         expect(formattedOption).to.equal(expectedOutput);
//     };

//     optionsToFormat.forEach(optionToFormat => {
//         const [key, value] = optionToFormat;
//         const testName = `format { ${key}: ${value} }`;

//         it(testName, testOptionFormatting(optionToFormat));
//     });
// });
