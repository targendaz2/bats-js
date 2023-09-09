import { assert } from 'chai';

import { BatsCommand, InvalidCommandError } from '../../src/command.js';
import { BatsOptions } from '../../src/options.js';
import { Formatting } from '../../src/formatting.js';

suite('tests path formatting tests', function () {
    suite('valid tests path formatting tests', function () {
        const testPaths: string[] = [
            './fixtures/bats_files',
            './fixtures/bats_files/',
            './fixtures/bats_files/addition.bats',
            './fixtures/bats_files/other tests.bats',
            './fixtures/bats files/addition.bats',
            'fixtures/bats_files',
            'fixtures/bats_files/',
            'fixtures/bats_files/addition.bats',
            'fixtures/bats_files/other tests.bats',
            'fixtures/bats files/addition.bats',
            '/fixtures/bats_files',
            '/fixtures/bats_files/',
            '/fixtures/bats_files/addition.bats',
            '/fixtures/bats_files/other tests.bats',
            '/fixtures/bats files/addition.bats',
        ];

        const testPathFormatting = (tests: string) => function () {
            // Given a command with a not empty tests path
            const command = new BatsCommand(tests);

            // When the command is formatted as a string

            // Then it should match the expected output
            const expectedOutput = `bats "${tests}"`;
            assert.equal(command.toString(), expectedOutput);
        };

        testPaths.forEach((tests) => {
            const testName = `format path "${tests}"`;
            test(testName, testPathFormatting(tests));
        });
    });

    suite('invalid tests path formatting tests', function () {
        const testPaths: (string | null)[] = [
            null,
            '',
        ];

        const testPathFormatting = (tests: string | null) => function () {
            // Given a command with an invalid tests path
            // @ts-ignore
            const command = new BatsCommand(tests);
            assert.throws(() => command.validate(), InvalidCommandError);

            // When the command is formatted as a string

            // Then it should match the expected output
            const expectedOutput = 'bats';
            assert.equal(command.toString(), expectedOutput);
        };

        testPaths.forEach((tests) => {
            const testName = `format path "${tests}"`;
            test(testName, testPathFormatting(tests));
        });
    });
});

suite('options formatting tests', function () {
    suite('single option formatting tests', function () {
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
            const actualOutput = Formatting.singleOption(option, value);

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

    suite('multiple options formatting tests', function () {
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
            const actualOutput = Formatting.batsOptions(options);

            assert.equal(
                actualOutput,
                expectedOutput,
            );
        };

        optionsToTest.forEach(optionsToTest => {
            const [options, _] = optionsToTest;
            let testName = 'format { ';

            for (const [option, value] of Object.entries(options)) {
                testName += `${option}: ${value}, `;
            }

            testName = testName.slice(0, -2) + ' }';

            test(testName, testBatsOptionsParsing(optionsToTest));
        });
    });
});
