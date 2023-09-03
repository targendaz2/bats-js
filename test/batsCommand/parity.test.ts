import { assert } from 'chai';

import * as cp from 'child_process';

import { BatsOptions, formatOption, formatOptions, NotImplementedError } from '../../src/options.js';
import { bats } from '../../src/index.js';

suite('option parity tests', function () {
    const tests = './fixtures/bats_files';

    const batsCommands: BatsOptions[] = [
        { count: true },
        { codeQuoteStyle: '""' },
        { codeQuoteStyle: '--' },
        { lineReferenceFormat: 'comma_line' },
        { lineReferenceFormat: 'colon' },
        { lineReferenceFormat: 'uri' },
        { lineReferenceFormat: 'custom' },
        { filter: /addition/ },
        { filterStatus: 'failed' },
        { filterStatus: 'missed' },
        { filterTags: 'tag1' },
        { filterTags: ['tag1', 'tag2'] },
        { formatter: 'pretty' },
        { formatter: 'tap' },
        { formatter: 'tap13' },
        { jobs: 2 },
        { parallelBinaryName: 'parallel' },
        { jobs: 2, parallelBinaryName: 'parallel' },
        { noTempdirCleanup: true },
        { noParallelizeAcrossFiles: true },
        { jobs: 3, parallelBinaryName: 'parallel', noParallelizeAcrossFiles: true },
        { noParallelizeWithinFiles: true },
        { jobs: 3, parallelBinaryName: 'parallel', noParallelizeWithinFiles: true },
        { pretty: true },
        { printOutputOnFailure: true },
        { recursive: true },
        { showOutputOfPassingTests: true },
        { tap: true },
        { trace: true },
        { verboseRun: true },
        { count: true, noTempdirCleanup: true, recursive: true },
        { count: true, filter: /addition/, noTempdirCleanup: true, recursive: true },
    ];

    const testBatsOptions = (options: BatsOptions) => function () {
        let command = `bats ${tests}`;

        // parse options into command
        for (const [option, value] of Object.entries(options)) {
            const formattedOption = formatOption(option, value);
            if (formattedOption) {
                command += ' ' + formattedOption;
            }
        }

        const result = cp.spawnSync(command, {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(tests, options).output,
            result.stdout.toString()
        );
    };

    batsCommands.forEach((options) => {
        let command = '';

        // parse options into command
        for (const [option, value] of Object.entries(options)) {
            const formattedOption = formatOption(option, value);
            if (formattedOption) {
                command += formattedOption + ' ';
            }
        }

        test(`parity for "${command.trim()}"`, testBatsOptions(options));
    });
});

suite('option formatting tests', function () {
    type OptionToTest = [string, any, string | null];
    const optionsToTest: OptionToTest[] = [
        ['count', true, '--count'],
        ['count', false, null],
        ['lineReferenceFormat', 'colon', '--line-reference-format colon'],
        ['filter', /subtraction/, '--filter subtraction'],
        ['filterTags', ['tag1', 'tag2', 'tag3'], '--filter-tags tag1,tag2,tag3'],
        ['noTempdirCleanup', true, '--no-tempdir-cleanup'],
        ['noTempdirCleanup', false, null],
    ];

    const testBatsOptionParsing = (optionToTest: OptionToTest) => function () {
        const [option, value, expectedOutput] = optionToTest;
        const actualOutput = formatOption(option, value);

        assert.equal(
            actualOutput,
            expectedOutput,
        );
    };

    optionsToTest.forEach(optionToTest => {
        const [option, value, _] = optionToTest;
        test(`format "${option}: ${value}"`, testBatsOptionParsing(optionToTest));
    });
});

suite('options formatting tests', function () {
    type OptionsToTest = [BatsOptions, string | null];
    const optionsToTest: OptionsToTest[] = [
        [{ count: true, noTempdirCleanup: true, recursive: true }, '--count --no-tempdir-cleanup --recursive'],
        [{ count: true, filter: /addition/, noTempdirCleanup: true, recursive: true }, '--count --filter addition --no-tempdir-cleanup --recursive'],
        [{ count: true, filterTags: ['tag1', 'tag2', 'tag3'], recursive: true }, '--count --filter-tags tag1,tag2,tag3 --recursive'],
        [{ count: false, noTempdirCleanup: false, recursive: true }, '--recursive'],
        [{ count: false, noTempdirCleanup: false, recursive: false }, null],
    ];

    const testBatsOptionsParsing = (optionsToTest: OptionsToTest) => function () {
        const [options, expectedOutput] = optionsToTest;
        const actualOutput = formatOptions(options);

        assert.equal(
            actualOutput,
            expectedOutput,
        );
    };

    optionsToTest.forEach(optionsToTest => {
        const [options, _] = optionsToTest;
        let testName = 'format { ';
        
        for(const [option, value] of Object.entries(options)) {
            testName += `${option}: ${value}, `;
        }

        testName = testName.slice(0, -2) + ' }';

        test(testName, testBatsOptionsParsing(optionsToTest));
    });
});
