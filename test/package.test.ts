import { assert } from 'chai';

import * as cp from 'child_process';

import decamelize from 'decamelize';

import { bats, BatsOptions } from '../src/index.js';

suite('CLI parity tests', function () {
    const batsCommands: [string, BatsOptions?][] = [
        ['./fixtures/bats_files/addition.bats'],
        ['./fixtures/bats_files/'],
        ['./fixtures/bats_files/', { count: true }],
        ['./fixtures/bats_files/', { filter: /addition/ }],
        ['./fixtures/bats_files/', { filterStatus: 'failed' }],
        ['./fixtures/bats_files/', { filterStatus: 'missed' }],
        ['./fixtures/bats_files/', { filterTags: 'tag1,tag2' }],
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
