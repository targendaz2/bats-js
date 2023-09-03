import { assert } from 'chai';

import * as fs from 'fs';

import { BatsCommand, InvalidCommandError } from '../../src/command.js';
import { DoesNotExistError, NotImplementedError } from '../../src/options.js';

suite('command validation tests', function () {
    const testsPath = './fixtures/bats_files';

    suite('tests path validation tests', function () {
        test('command does not have tests path', function () {
            // Given a command with no tests path
            // @ts-ignore
            const command = new BatsCommand();

            // When that command is validated

            // Then it should throw an error
            assert.throws(() => command.validate(), InvalidCommandError);
        });

        test('command has empty tests path', function () {
            // Given a command with an empty tests path
            const command = new BatsCommand('');

            // When that command is validated

            // The it should throw an error
            assert.throws(() => command.validate(), InvalidCommandError);
        });

        test('command has nonexistent tests path', function () {
            // Given a command with a nonexistent tests path
            const nonexistentTestsPath = './missing_fixtures/bats_files';
            assert.isFalse(fs.existsSync(nonexistentTestsPath));

            const command = new BatsCommand(nonexistentTestsPath);

            // When that command is validated

            // Then it should throw an error
            assert.throws(() => command.validate(), InvalidCommandError);
        });

        test('command has existing tests path', function () {
            // Given a command with an existing tests path
            assert.isTrue(fs.existsSync(testsPath));
            const command = new BatsCommand(testsPath);

            // When that command is validated

            // It should not throw an error
            assert.doesNotThrow(() => command.validate(), InvalidCommandError);
        });
    });

    suite('options validation tests', function () {
        test('command does not have options', function () {
            // Given a command with no options
            const command = new BatsCommand(testsPath);

            // When that command is validated

            // Then it should not throw an error
            assert.doesNotThrow(() => command.validate(), InvalidCommandError);
        });

        test('command has empty options', function () {
            // Given a command with an empty set of options
            const command = new BatsCommand(testsPath, {});

            // When that command is validated

            // Then it should not throw an error
            assert.doesNotThrow(() => command.validate(), InvalidCommandError);
        });

        test('command has unknown options', function () {
            // Given a command with unknown options
            // @ts-ignore
            const command = new BatsCommand(testsPath, { fakeOption1: true, fakeOption2: true });

            // When that command is validated

            // Then it should throw an error
            assert.throws(() => command.validate(), DoesNotExistError);
        });

        test('command has not implemented options', function () {
            // Given a command with not implemented options
            // @ts-ignore
            const command = new BatsCommand(testsPath, { gatherTestOutputsIn: './directory', timing: true });

            // When that command is validated

            // Then it should throw an error
            assert.throws(() => command.validate(), NotImplementedError);
        });

        test('command has implemented options', function () {
            // Given a command with exclusively implemented options
            const command = new BatsCommand(testsPath, { count: true, recursive: true });

            // When that command is validated

            // Then it should not throw an error
            assert.doesNotThrow(() => command.validate(), InvalidCommandError);
        });
    });
});
