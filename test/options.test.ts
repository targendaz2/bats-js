import { assert } from 'chai';

import * as cp from 'child_process';

import { bats, BatsOptions } from '../src/index.js';
import { formatOption } from '../src/formatting.js';
import { NotImplementedError } from '../src/errors.js';

suite('option parity tests', function () {
    const batsCommands: [string, BatsOptions?][] = [
        ['./fixtures/bats_files/addition.bats'],
        ['./fixtures/bats_files/'],
        ['./fixtures/bats_files/', { count: true }],
        ['./fixtures/bats_files/', { codeQuoteStyle: '""' }],
        ['./fixtures/bats_files/', { codeQuoteStyle: '--' }],
        ['./fixtures/bats_files/', { lineReferenceFormat: 'comma_line' }],
        ['./fixtures/bats_files/', { lineReferenceFormat: 'colon' }],
        ['./fixtures/bats_files/', { lineReferenceFormat: 'uri' }],
        ['./fixtures/bats_files/', { lineReferenceFormat: 'custom' }],
        ['./fixtures/bats_files/', { filter: /addition/ }],
        ['./fixtures/bats_files/', { filterStatus: 'failed' }],
        ['./fixtures/bats_files/', { filterStatus: 'missed' }],
        ['./fixtures/bats_files/', { filterTags: 'tag1' }],
        ['./fixtures/bats_files/', { filterTags: ['tag1', 'tag2'] }],
        ['./fixtures/bats_files/', { formatter: 'pretty' }],
        ['./fixtures/bats_files/', { formatter: 'tap' }],
        ['./fixtures/bats_files/', { formatter: 'tap13' }],
        ['./fixtures/bats_files/', { jobs: 2 }],
        ['./fixtures/bats_files/', { parallelBinaryName: 'parallel' }],
        ['./fixtures/bats_files/', { jobs: 2, parallelBinaryName: 'parallel' }],
        ['./fixtures/bats_files/', { noTempdirCleanup: true }],
        ['./fixtures/bats_files/', { noParallelizeAcrossFiles: true }],
        ['./fixtures/bats_files/', { jobs: 3, parallelBinaryName: 'parallel', noParallelizeAcrossFiles: true }],
        ['./fixtures/bats_files/', { noParallelizeWithinFiles: true }],
        ['./fixtures/bats_files/', { jobs: 3, parallelBinaryName: 'parallel', noParallelizeWithinFiles: true }],
        ['./fixtures/bats_files/', { pretty: true }],
        ['./fixtures/bats_files/', { printOutputOnFailure: true }],
        ['./fixtures/bats_files/', { recursive: true }],
        ['./fixtures/bats_files/', { showOutputOfPassingTests: true }],
        ['./fixtures/bats_files/', { tap: true }],
        ['./fixtures/bats_files/', { trace: true }],
        ['./fixtures/bats_files/', { verboseRun: true }],
        ['./fixtures/bats_files/', { count: true, noTempdirCleanup: true, recursive: true }],
        ['./fixtures/bats_files/', { count: true, filter: /addition/, noTempdirCleanup: true, recursive: true }],
    ];

    const testBatsCommand = (tests: string, options?: BatsOptions) => function () {
        let command = `npx bats ${tests}`;

        // parse options into command
        if (options) {
            for (const [option, value] of Object.entries(options)) {
                const formattedOption = formatOption(option, value);
                if (formattedOption) {
                    command += ' ' + formattedOption;
                }
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

    batsCommands.forEach(([tests, options]) => {
        let command = `bats ${tests}`;

        // parse options into command
        if (options) {
            for (const [option, value] of Object.entries(options)) {
                const formattedOption = formatOption(option, value);
                if (formattedOption) {
                    command += ' ' + formattedOption;
                }
            }
        }

        test(`parity for "${command}"`, testBatsCommand(tests, options));
    });
});

suite('not implemented option tests', function () {
    const batsCommands:BatsOptions[] = [
        // @ts-ignore
        { gatherTestOutputsIn: '/path/to/directory' },
        // @ts-ignore
        { help: true },
        // @ts-ignore
        { reportFormatter: 'pretty' },
        // @ts-ignore
        { output: '/path/to/directory' },
        // @ts-ignore
        { timing: true },
        // @ts-ignore
        { version: true },
    ];

    const testOptionNotImplemented = (options: BatsOptions) => function () {        
        assert.throws(() => bats('./fixtures/bats_files/', options), NotImplementedError);
    };

    batsCommands.forEach(options => {
        for (const [option, value] of Object.entries(options)) {
            test(`"${option}" is not implemented`, testOptionNotImplemented(options));
            break;
        }
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
