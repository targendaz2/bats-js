import { assert } from 'chai';

import { BatsCommand, InvalidCommandError } from '../../src/command.js';
import { BatsOptions } from '../../src/options.js';
import { Formatting } from '../../src/formatting.js';

suite('Bats path formatting tests', function () {
    suite('valid tests paths', function () {
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
            // Given a command with a valid tests path
            const command = new BatsCommand(tests);

            // When the command is formatted as a string
            const actualResult = command.toString();

            // Then it should match the expected result
            const expectedResult = `bats "${tests}"`;
            assert.equal(actualResult, expectedResult);
        };

        testPaths.forEach((tests) => {
            const testName = `format path "${tests}"`;
            test(testName, testPathFormatting(tests));
        });
    });

    suite('invalid tests paths', function () {
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
            const actualResult = command.toString();

            // Then it should match the expected result
            const expectedResult = 'bats';
            assert.equal(actualResult, expectedResult);
        };

        testPaths.forEach((tests) => {
            const testName = `format path "${tests}"`;
            test(testName, testPathFormatting(tests));
        });
    });
});

suite('Bats options formatting tests', function () {
    suite('single option formatting', function () {
        type OptionToTest = [string, unknown, string | null];
        const optionsToTest: OptionToTest[] = [
            ['count', true, '--count'],
            ['count', false, null],
            ['lineReferenceFormat', 'colon', '--line-reference-format colon'],
            ['filter', /subtraction/, '--filter subtraction'],
            ['filterTags', ['tag1', 'tag2', 'tag3'], '--filter-tags tag1,tag2,tag3'],
            ['noTempdirCleanup', true, '--no-tempdir-cleanup'],
            ['noTempdirCleanup', false, null],
        ];

        const testBatsOptionFormatting = (optionToTest: OptionToTest) => function () {
            // Given a Bats option and value, and expected result
            const [option, value, expectedResult] = optionToTest;

            // When the option and value are formatted for the CLI
            const actualResult = Formatting.singleOption(option, value);

            // Then the formatted option and value should match the expected result
            assert.equal(actualResult, expectedResult);
        };

        optionsToTest.forEach(optionToTest => {
            const [option, value] = optionToTest;
            test(`format option "${option}: ${value}"`, testBatsOptionFormatting(optionToTest));
        });
    });

    suite('multiple options formatting', function () {
        type OptionsToTest = [BatsOptions, string | null];
        const optionsToTest: OptionsToTest[] = [
            [{ count: true, noTempdirCleanup: true, recursive: true }, '--count --no-tempdir-cleanup --recursive'],
            [{ count: true, filter: /addition/, noTempdirCleanup: true, recursive: true }, '--count --filter addition --no-tempdir-cleanup --recursive'],
            [{ count: true, filterTags: ['tag1', 'tag2', 'tag3'], recursive: true }, '--count --filter-tags tag1,tag2,tag3 --recursive'],
            [{ count: false, noTempdirCleanup: false, recursive: true }, '--recursive'],
            [{ count: false, noTempdirCleanup: false, recursive: false }, null],
        ];

        const testBatsOptionsFormatting = (optionsToTest: OptionsToTest) => function () {
            // Given an object of Bats options and an expected result
            const [options, expectedResult] = optionsToTest;

            // When the options object is formatted for the CLI
            const actualResult = Formatting.batsOptions(options);

            // Then the formatted options should match the expected results
            assert.equal(actualResult, expectedResult);
        };

        optionsToTest.forEach(optionsToTest => {
            const [options] = optionsToTest;
            let testName = 'format options "';

            for (const [option, value] of Object.entries(options)) {
                testName += `${option}: ${value}, `;
            }

            testName = testName.slice(0, -2) + '"';

            test(testName, testBatsOptionsFormatting(optionsToTest));
        });
    });
});

suite('Bats command formatting tests', function () {
    suite('valid command formatting', function () {
        type CommandToTest = [string, BatsOptions, string | null];
        const commandsToTest: CommandToTest[] = [
            ['./fixtures/bats_files', {}, null],
            ['fixtures/bats_files', { recursive: true }, '--recursive'],
            ['/fixtures/bats_files', { recursive: false }, null],
            ['/fixtures/bats_files/addition.bats', { filter: /addition/ }, '--filter addition'],
            ['./fixtures/bats_files/addition.bats', { count: true, noTempdirCleanup: true, recursive: true }, '--count --no-tempdir-cleanup --recursive'],
        ];

        const testBatsCommandFormatting = (commandToTest: CommandToTest) => function () {
            // Given a Bats command and an expected result
            const [testsPath, options, expectedOptionsResult] = commandToTest;
            const command = new BatsCommand(testsPath, options);

            // When the command is formatted for the CLI
            const actualResult = command.toString();

            // Then the formatted command should match the expected result
            let expectedResult = `bats "${testsPath}"`;
            if (expectedOptionsResult) {
                expectedResult += ` ${ expectedOptionsResult }`;
            }
            assert.equal(actualResult, expectedResult);
        };

        commandsToTest.forEach(commandToTest => {
            const [testsPath, options] = commandToTest;
            let testName = `format command with path "${testsPath}"`;

            let testOptions = '';
            for (const [option, value] of Object.entries(options)) {
                testOptions += `${option}: ${value}, `;
            }

            testOptions = testOptions.slice(0, -2);
            testName += ` and options "${testOptions}"`;

            test(testName, testBatsCommandFormatting(commandToTest));
        });
    });

    suite('invalid command formatting', function () {
        type CommandToTest = [string | null, BatsOptions, string | null];
        const commandsToTest: CommandToTest[] = [
            [null, {}, null],
            ['', { recursive: true }, '--recursive'],
            [null, { recursive: false }, null],
            ['', { filter: /addition/ }, '--filter addition'],
            [null, { count: true, noTempdirCleanup: true, recursive: true }, '--count --no-tempdir-cleanup --recursive'],
        ];

        const testBatsCommandFormatting = (commandToTest: CommandToTest) => function () {
            // Given an invalid Bats command and an expected result
            const [testsPath, options, expectedOptionsResult] = commandToTest;

            // @ts-ignore
            const command = new BatsCommand(testsPath, options);
            assert.throws(() => command.validate(), InvalidCommandError);

            // When the command is formatted for the CLI
            const actualResult = command.toString();

            // Then the formatted command should match the expected result
            let expectedResult = 'bats';
            if (testsPath) {
                expectedResult += ` "${testsPath}"`;
            }
            if (expectedOptionsResult) {
                expectedResult += ` ${expectedOptionsResult}`;
            }

            assert.equal(actualResult, expectedResult);
        };

        commandsToTest.forEach(commandToTest => {
            const [testsPath, options] = commandToTest;
            let testName = `format command with path "${testsPath}"`;

            let testOptions = '';
            for (const [option, value] of Object.entries(options)) {
                testOptions += `${option}: ${value}, `;
            }

            testOptions = testOptions.slice(0, -2);
            testName += ` and options "${testOptions}"`;

            test(testName, testBatsCommandFormatting(commandToTest));
        });
    });
});
