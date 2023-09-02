import { assert } from 'chai';

import * as fs from 'fs';

import { BatsCommand } from '../src/command.js';

suite('command instantiation tests', function () {
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
            const testsPath = './missing_fixtures/bats_files';
            assert.isFalse(fs.existsSync(testsPath));

            // When a command is instantiated

            // Then it should throw an error
            assert.throws(() => {
                new BatsCommand(testsPath);
            });
        });

        test('command instantiated with existing tests path', function () {
            // Given an existing tests path
            const testsPath = './fixtures/bats_files';
            assert.isTrue(fs.existsSync(testsPath));

            // When a command is instantiated

            // It should not throw an error
            assert.doesNotThrow(() => {
                new BatsCommand(testsPath);
            });
        });
    });
});
