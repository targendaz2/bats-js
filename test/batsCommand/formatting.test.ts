import { assert } from 'chai';

import { BatsCommand, InvalidCommandError } from '../../src/command.js';

suite('command formatting tests', function () {
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
