import { assert } from 'chai';

import * as cp from 'child_process';

import { bats } from '../src/index';

suite('Default Bats usage tests', function () {
    test('single file test', function () {
        const batsPath = './fixtures/bats_files/addition.bats';
        const result = cp.spawnSync('npx bats ' + batsPath, {
            'cwd': '.',
            'shell': true
        });
        
        assert.equal(
            bats(batsPath),
            result.stdout.toString()
        );
    });

    test('single folder test', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath, {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath),
            result.stdout.toString()
        );
    });
});

suite('Bats count tests', function () {
    test('single file test', function () {
        const batsPath = './fixtures/bats_files/addition.bats';
        const result = cp.spawnSync('npx bats ' + batsPath + ' -c', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats.count(batsPath),
            parseInt(result.stdout.toString())
        );
    });

    test('single folder test', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath + ' -c', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats.count(batsPath),
            parseInt(result.stdout.toString())
        );
    });
});
