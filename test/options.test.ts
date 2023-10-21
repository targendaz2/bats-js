import cp from 'node:child_process';

// import { escape } from 'shellwords';
import { expect } from 'chai';

import { BatsOptions, BatsOptionValue } from '../src/options';
import { formatOption, formatOptions } from '../src/formatting';

import bats from '../src';
import { BatsResult } from '../src/result';


type OptionToFormat = [string, BatsOptionValue, string | null];

describe('single option formatting function', function () {
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
        ['parallelBinaryName', 'rush', '--parallel-binary-name "rush"'],
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
        it(`formats { ${key}: ${value} }`, testOptionFormatting(optionToFormat));
    });
});

type OptionsToTest = [{ [key: string]: BatsOptionValue }, string | null];

describe('multiple options formatting function', function () {
    const optionsToTest: OptionsToTest[] = [
        [{count: true, recursive: true}, '--count --recursive'],
        [{count: false, recursive: true}, '--recursive'],
        [{count: false, recursive: false}, null],
        [{count: true, filter: /addition/, recursive: true}, '--count --filter "addition" --recursive'],
        [{count: false, filter: /addition/, recursive: false}, '--filter "addition"'],
        [{filterTags: ['tag1', 'tag2'], recursive: true}, '--filter-tags "tag1,tag2" --recursive'],
        [{ count: true, recursive: true, noTempdirCleanup: true }, '--count --recursive --no-tempdir-cleanup'],
    ];

    const testOptionsFormatting = (optionsToTest: OptionsToTest) => function () {
        const [optionsToFormat, expectedOutput] = optionsToTest;
        const formattedOptions = formatOptions(optionsToFormat);

        expect(formattedOptions).to.equal(expectedOutput);
    };

    optionsToTest.forEach(optionToTest => {
        const [optionsToFormat] = optionToTest;

        let optionsAsString = '{';
        Object.entries(optionsToFormat).forEach(([name, value]) => {
            optionsAsString += ` ${name}: ${value!.toString()},`;
        });
        optionsAsString = optionsAsString.slice(0, -1);
        optionsAsString += ' }';

        it(`formats ${optionsAsString}`, testOptionsFormatting(optionToTest));
    });
});

describe('option parity', function () {
    const testsPath = './fixtures/addition.bats';

    const optionsToTest: BatsOptions[] = [
        { count: true },
        // { codeQuoteStyle: '""' },
        // { codeQuoteStyle: '\'\'' },
        // { codeQuoteStyle: '||' },
        // { codeQuoteStyle: 'custom' },
        // { lineReferenceFormat: 'comma_line' },
        // { lineReferenceFormat: 'colon' },
        // { lineReferenceFormat: 'uri' },
        // { lineReferenceFormat: 'custom' },
        // { filter: /addition/ },
        // { filterStatus: 'failed' },
        // { filterStatus: 'missed' },
        // { filterTags: 'tag1' },
        // { filterTags: ['tag1'] },
        // { filterTags: ['tag1', 'tag2'] },
        // { filterTags: ['tag1', 'tag2', 'tag3'] },
        // { formatter: 'pretty' },
        // { formatter: 'tap' },
        // { formatter: 'tap13' },
        // { formatter: 'junit' },
        // { jobs: 1 },
        // { jobs: 3 },
        // { parallelBinaryName: 'parallel' },
        // { parallelBinaryName: 'rush' },
        // { noTempdirCleanup: true },
        // { noParallelizeAcrossFiles: true },
        // { noParallelizeWithinFiles: true },
        // { pretty: true },
        // { printOutputOnFailure: true },
        // { recursive: true },
        // { showOutputOfPassingTests: true },
        // { tap: true },
        // { timing: true },
        // { trace: true },
        // { verboseRun: true },
    ];

    const testOptionParity = (options: BatsOptions) => function () {
        // const command = `bats ${testsPath} ${formatOptions(options)}`;
        const command = `bats ${testsPath} --count`;
        const result = cp.spawnSync(command, { shell: true });

        const expectedResult = new BatsResult();
        expectedResult.exitCode = result.status;
        expectedResult.output = result.stdout.toString();

        const actualResult = bats(testsPath, options);

        expect(expectedResult.exitCode).to.equal(0);
        expect(actualResult.exitCode).to.equal(0);
        expect(expectedResult.output).to.equal(actualResult.output);
    };

    optionsToTest.forEach(options => {
        let optionsAsString = '{';
        Object.entries(options).forEach(([name, value]) => {
            optionsAsString += ` ${name}: ${value!.toString()},`;
        });

        optionsAsString = optionsAsString.slice(0, -1);
        optionsAsString += ' }';

        it(`has parity for ${optionsAsString}`, testOptionParity(options));
    });
});
