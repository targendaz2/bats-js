import { assert } from 'chai';

import * as fs from 'fs';

import { DoesNotExistError, NotImplementedError } from '../src/options.js';
import { BatsCommand } from '../src/command.js';

suite('command instantiation tests', function () {
    const testsPath = './fixtures/bats_files';

    suite('tests path tests', function () {
        test('command instantiated without tests path', function () {
            // Given there is no tests path

            // When a command is instantiated

            // Then it should throw an error
            assert.throws(() => {
                // @ts-ignore
                new BatsCommand();
            });
        });

        test('command instantiated with empty tests path', function () {
            // Given an empty tests path

            // When a command is instantiated

            // The it should throw an error
            assert.throws(() => {
                new BatsCommand('');
            });
        });

        test('command instantiated with nonexistent tests path', function () {
            // Given a nonexistent tests path
            const nonexistentTestsPath = './missing_fixtures/bats_files';
            assert.isFalse(fs.existsSync(nonexistentTestsPath));

            // When a command is instantiated

            // Then it should throw an error
            assert.throws(() => {
                new BatsCommand(nonexistentTestsPath);
            });
        });

        test('command instantiated with existing tests path', function () {
            // Given an existing tests path
            assert.isTrue(fs.existsSync(testsPath));

            // When a command is instantiated

            // It should not throw an error
            assert.doesNotThrow(() => {
                new BatsCommand(testsPath);
            });
        });
    });

    suite('options tests', function () {
        test('command instantiated without options', function () {
            // Given there are no options

            // When a command is instantiated

            // Then it should not throw an error
            assert.doesNotThrow(() => {
                new BatsCommand(testsPath);
            });
        });

        test('command instantiated with empty options', function () {
            // Given an empty set of options

            // When a command is instantiated

            // Then it should not throw an error
            assert.doesNotThrow(() => {
                new BatsCommand(testsPath, {});
            });
        });

        test('command instantiated with unknown options', function () {
            // Given a set of unknown options

            // When a command is instantiated

            // Then it should throw an error
            assert.throws(() => {
                // @ts-ignore
                new BatsCommand(testsPath, { fakeOption1: true, fakeOption2: true });
            }, DoesNotExistError);
        });

        test('command instantiated with not implemented options', function () {
            // Given a set of not implemented options

            // When a command is instantiated

            // Then it should throw an error
            assert.throws(() => {
                // @ts-ignore
                new BatsCommand(testsPath, { gatherTestOutputsIn: './directory', timing: true });
            }, NotImplementedError);
        });

        test('command instantiated with implemented options', function () {
            // Given a set of implemented options

            // When a command is instantiated

            // Then it should not throw an error
            assert.doesNotThrow(() => {
                new BatsCommand(testsPath, { count: true, recursive: true });
            });
        });
    });
});
