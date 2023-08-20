import { assert } from 'chai';

import * as cp from 'child_process';

import decamelize from 'decamelize';

import { bats, BatsOptions } from '../src/index.js';

suite('CLI parity tests', function () {
    const batsCommands: [string, BatsOptions?][] = [
        ['./fixtures/bats_files/addition.bats'],
        ['./fixtures/bats_files/'],
        ['./fixtures/bats_files/', { count: true }],
        ['./fixtures/bats_files/', { noTempdirCleanup: true }],
        ['./fixtures/bats_files/', { printOutputOnFailure: true }],
        ['./fixtures/bats_files/', { recursive: true }],
        ['./fixtures/bats_files/', { trace: true }],
        ['./fixtures/bats_files/', { verboseRun: true }],
        ['./fixtures/bats_files/', { count: true, noTempdirCleanup: true, recursive: true }],
    ];

    const testBatsCommand = (tests: string, options?: BatsOptions) => function () {
        let command = `npx bats ${tests}`;

        // parse options into command
        for (const option in options) {
            command += ' --' + decamelize(option, { separator: '-' });
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
        for (const option in options) {
            command += ' --' + decamelize(option, { separator: '-' });
        }

        test(`parity for "${command}"`, testBatsCommand(tests, options));
    });
});
