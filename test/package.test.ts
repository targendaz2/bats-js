import { assert } from 'chai';

import * as cp from 'child_process';

import { bats } from '../src/index';

suite('Basic parameter tests', function () {
    test('version test', function () {
        const result = cp.spawnSync('npx bats --version', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats.version,
            result.stdout.toString()
        );
    });
});

suite('Test running tests', function () {
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

suite('Test count tests', function () {
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
