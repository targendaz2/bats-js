import { assert } from 'chai';

import * as cp from 'child_process';

import { bats } from '../../src/index.js';
import { BatsOptions } from '../../src/options.js';
import { Formatting } from '../../src/formatting.js';

suite('option parity tests', function () {
    const tests = './fixtures/bats_files';

    const testOptions = (options: BatsOptions) => function () {
        let command = `bats ${tests}`;

        // parse options into command
        for (const [option, value] of Object.entries(options)) {
            const formattedOption = Formatting.singleOption(option, value);
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

    suite('single option parity tests', function () {
        const optionsToTest: BatsOptions[] = [
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
            { noTempdirCleanup: true },
            { noParallelizeAcrossFiles: true },
            { noParallelizeWithinFiles: true },
            { pretty: true },
            { printOutputOnFailure: true },
            { recursive: true },
            { showOutputOfPassingTests: true },
            { tap: true },
            { trace: true },
            { verboseRun: true },
        ];

        optionsToTest.forEach((options) => {
            let command = '';

            // parse options into command
            for (const [option, value] of Object.entries(options)) {
                const formattedOption = Formatting.singleOption(option, value);
                if (formattedOption) {
                    command += formattedOption + ' ';
                }
            }

            test(`parity for "${command.trim()}"`, testOptions(options));
        });
    });

    suite('multiple options parity tests', function () {
        const optionsToTest: BatsOptions[] = [
            { jobs: 2, parallelBinaryName: 'parallel' },
            { jobs: 3, parallelBinaryName: 'parallel', noParallelizeAcrossFiles: true },
            { jobs: 3, parallelBinaryName: 'parallel', noParallelizeWithinFiles: true },
            { count: true, noTempdirCleanup: true, recursive: true },
            { count: true, filter: /addition/, noTempdirCleanup: true, recursive: true },
            { filter: /addition/, recursive: true },
            { filterTags: ['tag1', 'tag2'], recursive: true },
            { filter: /addition/, filterTags: ['tag1', 'tag2'], recursive: true },
        ];

        optionsToTest.forEach((options) => {
            let command = '';

            // parse options into command
            for (const [option, value] of Object.entries(options)) {
                const formattedOption = Formatting.singleOption(option, value);
                if (formattedOption) {
                    command += formattedOption + ' ';
                }
            }

            test(`parity for "${command.trim()}"`, testOptions(options));
        });
    });
});
