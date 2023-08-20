import { assert } from 'chai';

import * as cp from 'child_process';

import decamelize from 'decamelize';

import { bats, BatsOptions } from '../src/index.js';

suite('CLI parity tests', function () {
    const batsCommands: [string, BatsOptions?][] = [
        ['./fixtures/bats_files/addition.bats'],
        ['./fixtures/bats_files/'],
        ['./fixtures/bats_files/', { count: true }],
        ['./fixtures/bats_files/', { filter: 'Addition*' }],
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
        if (options) {
            for (const [option, value] of Object.entries(options)) {
                switch (typeof value) {
                    case 'boolean':
                        if (value === true) {
                            command += ' --' + decamelize(option, { separator: '-' });
                        }
                        break;
                    default:
                        command += ' --' + decamelize(option, { separator: '-' });
                        command += ' ' + value;
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
                switch (typeof value) {
                    case 'boolean':
                        if (value === true) {
                            command += ' --' + decamelize(option, { separator: '-' });
                        }
                        break;
                    default:
                        command += ' --' + decamelize(option, { separator: '-' });
                        command += ' ' + value;
                } 
            }
        }

        test(`parity for "${command}"`, testBatsCommand(tests, options));
    });
});
