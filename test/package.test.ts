import { assert } from 'chai';

import * as cp from 'child_process';

import { bats } from '../src/index';

suite('Default Bats usage tests', function () {
    test('single file test', function () {
        const result = cp.spawnSync('npx bats ./fixtures/bats_files/addition.bats', {
            'cwd': '.',
            'shell': true
        });
        
        assert.equal(
            bats('../fixtures/bats_files/addition.bats'),
            result.stdout.toString()
        );
    });
});
