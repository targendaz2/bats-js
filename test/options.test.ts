import { expect } from 'chai';

import { formatOption } from '../src/formatting';


type ArrayOptionToFormat = [string, string[], string];
type BooleanOptionToFormat = [string, boolean, string];
type NumberOptionToFormat = [string, number, string];
type StringOptionToFormat = [string, string, string];
type OptionToFormat = ArrayOptionToFormat | BooleanOptionToFormat | NumberOptionToFormat | StringOptionToFormat;

describe('options formatting tests', function () {
    const testOptionFormatting = (optionToFormat: OptionToFormat) => function () {
        const [key, value, expectedOutput] = optionToFormat;
        const formattedOption = formatOption(key, value);

        expect(formattedOption).to.equal(expectedOutput);
    };

    describe('format boolean options', function () {
        const booleanOptionsToFormat: BooleanOptionToFormat[] = [
            ['count', true, '--count'],
            ['count', false, ''],
            ['noTempdirCleanup', true, '--no-tempdir-cleanup'],
            ['noTempdirCleanup', false, ''],
            ['noParallelizeAcrossFiles', true, '--no-parallelize-across-files'],
            ['noParallelizeAcrossFiles', false, ''],
            ['noParallelizeWithinFiles', true, '--no-parallelize-within-files'],
            ['noParallelizeWithinFiles', false, ''],
            ['pretty', true, '--pretty'],
            ['pretty', false, ''],
            ['printOutputOnFailure', true, '--print-output-on-failure'],
            ['printOutputOnFailure', false, ''],
            ['recursive', true, '--recursive'],
            ['recursive', false, ''],
            ['showOutputOfPassingTests', true, '--show-output-of-passing-tests'],
            ['showOutputOfPassingTests', false, ''],
            ['tap', true, '--tap'],
            ['tap', false, ''],
            ['timing', true, '--timing'],
            ['timing', false, ''],
            ['trace', true, '--trace'],
            ['trace', false, ''],
            ['verboseRun', true, '--verbose-run'],
            ['verboseRun', false, ''],
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
    // const optionsToFormat: OptionToFormat[] = [
    //     ['count', true, '--count'],
    //     ['count', false, ''],
    //     ['codeQuoteStyle', '""', '--code-quote-style "\\"\\""'],
    //     ['codeQuoteStyle', '\'\'', '--code-quote-style "\'\'"'],
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
    //     ['noTempdirCleanup', false, ''],
    //     ['noParallelizeAcrossFiles', true, '--no-parallelize-across-files'],
    //     ['noParallelizeAcrossFiles', false, ''],
    //     ['noParallelizeWithinFiles', true, '--no-parallelize-within-files'],
    //     ['noParallelizeWithinFiles', false, ''],
    //     ['pretty', true, '--pretty'],
    //     ['pretty', false, ''],
    //     ['printOutputOnFailure', true, '--print-output-on-failure'],
    //     ['printOutputOnFailure', false, ''],
    //     ['recursive', true, '--recursive'],
    //     ['recursive', false, ''],
    //     ['showOutputOfPassingTests', true, '--show-output-of-passing-tests'],
    //     ['showOutputOfPassingTests', false, ''],
    //     ['tap', true, '--tap'],
    //     ['tap', false, ''],
    //     ['timing', true, '--timing'],
    //     ['timing', false, ''],
    //     ['trace', true, '--trace'],
    //     ['trace', false, ''],
    //     ['verboseRun', true, '--verbose-run'],
    //     ['verboseRun', false, ''],
    // ];
});
