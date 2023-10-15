import { expect } from 'chai';

import { formatOption } from '../src/formatting';


type ArrayOptionToFormat = [string, string[], string | null];
type BooleanOptionToFormat = [string, boolean, string | null];
type NumberOptionToFormat = [string, number, string | null];
type RegExpOptionToFormat = [string, RegExp, string | null];
type StringOptionToFormat = [string, string, string | null];
type OptionToFormat = ArrayOptionToFormat | BooleanOptionToFormat | NumberOptionToFormat | RegExpOptionToFormat | StringOptionToFormat;

describe('options formatting tests', function () {
    const testOptionFormatting = (optionToFormat: OptionToFormat) => function () {
        const [key, value, expectedOutput] = optionToFormat;
        const formattedOption = formatOption(key, value);

        expect(formattedOption).to.equal(expectedOutput);
    };

    describe('format boolean options', function () {
        const booleanOptionsToFormat: BooleanOptionToFormat[] = [
            ['count', true, '--count'],
            ['count', false, null],
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

        booleanOptionsToFormat.forEach(optionToFormat => {
            const [key, value] = optionToFormat;
            const testName = `format { ${key}: ${value} }`;

            it(testName, testOptionFormatting(optionToFormat));
        });
    });

    describe('format string options', function () {
        const stringOptionsToFormat: StringOptionToFormat[] = [
            ['codeQuoteStyle', '""', '--code-quote-style "\\"\\""'],
            ['codeQuoteStyle', '\'\'', '--code-quote-style "\\\'\\\'"'],
            ['codeQuoteStyle', '||', '--code-quote-style "\\|\\|"'],
            ['codeQuoteStyle', 'custom', '--code-quote-style "custom"'],
            ['lineReferenceFormat', 'comma_line', '--line-reference-format "comma_line"'],
            ['lineReferenceFormat', 'colon', '--line-reference-format "colon"'],
            ['lineReferenceFormat', 'uri', '--line-reference-format "uri"'],
            ['lineReferenceFormat', 'custom', '--line-reference-format "custom"'],
            ['filterStatus', 'failed', '--filter-status "failed"'],
            ['filterStatus', 'missed', '--filter-status "missed"'],
            ['filterTags', 'tag1', '--filter-tags "tag1"'],
            ['formatter', 'pretty', '--formatter "pretty"'],
            ['formatter', 'tap', '--formatter "tap"'],
            ['formatter', 'tap13', '--formatter "tap13"'],
            ['formatter', 'junit', '--formatter "junit"'],
            ['parallelBinaryName', 'parallel', '--parallel-binary-name "parallel"'],
        ];

        stringOptionsToFormat.forEach(optionToFormat => {
            const [key, value] = optionToFormat;
            const testName = `format { ${key}: ${value} }`;

            it(testName, testOptionFormatting(optionToFormat));
        });
    });

    describe('format array options', function () {
        const arrayOptionsToFormat: ArrayOptionToFormat[] = [
            ['filterTags', ['tag1'], '--filter-tags "tag1"'],
            ['filterTags', ['tag1,tag2'], '--filter-tags "tag1,tag2"'],
            ['filterTags', ['tag1,tag2,tag3'], '--filter-tags "tag1,tag2,tag3"'],
        ];

        arrayOptionsToFormat.forEach(optionToFormat => {
            const [key, value] = optionToFormat;
            const testName = `format { ${key}: ${value} }`;

            it(testName, testOptionFormatting(optionToFormat));
        });
    });

    describe('format number options', function () {
        const numberOptionsToFormat: NumberOptionToFormat[] = [
            ['jobs', 1, '--jobs 1'],
            ['jobs', 3, '--jobs 3'],
            ['jobs', 12, '--jobs 12'],
        ];

        numberOptionsToFormat.forEach(optionToFormat => {
            const [key, value] = optionToFormat;
            const testName = `format { ${key}: ${value} }`;

            it(testName, testOptionFormatting(optionToFormat));
        });
    });

    describe('format regexp options', function () {
        const regExpOptionsToFormat: RegExpOptionToFormat[] = [
            ['filter', /addition/, '--filter "addition"'],
        ];

        regExpOptionsToFormat.forEach(optionToFormat => {
            const [key, value] = optionToFormat;
            const testName = `format { ${key}: ${value} }`;

            it(testName, testOptionFormatting(optionToFormat));
        });
    });
    // const optionsToFormat: OptionToFormat[] = [
    //     ['count', true, '--count'],
    //     ['count', false, null],
    //     ['codeQuoteStyle', '""', '--code-quote-style "\\"\\""'],
    //     ['codeQuoteStyle', '\'\null, '--code-quote-style "\'\'"'],
    //     ['codeQuoteStyle', '||', '--code-quote-style "||"'],
    //     ['codeQuoteStyle', 'custom', '--code-quote-style "custom"'],
    //     ['lineReferenceFormat', 'comma_line', '--line-reference-format "comma_line"'],
    //     ['lineReferenceFormat', 'colon', '--line-reference-format "colon"'],
    //     ['lineReferenceFormat', 'uri', '--line-reference-format "uri"'],
    //     ['lineReferenceFormat', 'custom', '--line-reference-format "custom"'],
    //     ['filter', /addition/, '--filter "addition"'],
    //     ['filterStatus', 'failed', '--filter-status "failed"'],
    //     ['filterStatus', 'missed', '--filter-status "missed"'],
    //     ['filterTags', 'tag1', '--filter-tags "tag1"'],
    //     ['filterTags', ['tag1'], '--filter-tags "tag1"'],
    //     ['filterTags', ['tag1,tag2'], '--filter-tags "tag1,tag2"'],
    //     ['filterTags', ['tag1,tag2,tag3'], '--filter-tags "tag1,tag2,tag3"'],
    //     ['formatter', 'pretty', '--formatter "pretty"'],
    //     ['formatter', 'tap', '--formatter "tap"'],
    //     ['formatter', 'tap13', '--formatter "tap13"'],
    //     ['formatter', 'junit', '--formatter "junit"'],
    //     ['jobs', 1, '--jobs 1'],
    //     ['jobs', 3, '--jobs 3'],
    //     ['parallelBinaryName', 'parallel', '--parallel-binary-name "parallel"'],
    //     ['noTempdirCleanup', true, '--no-tempdir-cleanup'],
    //     ['noTempdirCleanup', false, null],
    //     ['noParallelizeAcrossFiles', true, '--no-parallelize-across-files'],
    //     ['noParallelizeAcrossFiles', false, null],
    //     ['noParallelizeWithinFiles', true, '--no-parallelize-within-files'],
    //     ['noParallelizeWithinFiles', false, null],
    //     ['pretty', true, '--pretty'],
    //     ['pretty', false, null],
    //     ['printOutputOnFailure', true, '--print-output-on-failure'],
    //     ['printOutputOnFailure', false, null],
    //     ['recursive', true, '--recursive'],
    //     ['recursive', false, null],
    //     ['showOutputOfPassingTests', true, '--show-output-of-passing-tests'],
    //     ['showOutputOfPassingTests', false, null],
    //     ['tap', true, '--tap'],
    //     ['tap', false, null],
    //     ['timing', true, '--timing'],
    //     ['timing', false, null],
    //     ['trace', true, '--trace'],
    //     ['trace', false, null],
    //     ['verboseRun', true, '--verbose-run'],
    //     ['verboseRun', false, null],
    // ];
});
