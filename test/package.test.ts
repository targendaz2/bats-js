import { assert } from 'chai';

import * as cp from 'child_process';

import { bats } from '../src/index';

suite('test running tests', function () {
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

    test('recursive folder test', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath + ' --recursive', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, { recursive: true }),
            result.stdout.toString()
        );
    });
});

suite('test count tests', function () {
    test('single file test', function () {
        const batsPath = './fixtures/bats_files/addition.bats';
        const result = cp.spawnSync('npx bats ' + batsPath + ' -c', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, { count: true }),
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
            bats(batsPath, { count: true }),
            parseInt(result.stdout.toString())
        );
    });

    test('recursive folder test', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath + ' --count --recursive', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, { count: true, recursive: true }),
            parseInt(result.stdout.toString())
        );
    });
});

suite('test parameter tests', function () {
    test('single file test', function () {
        const batsPath = './fixtures/bats_files/addition.bats';
        const result = cp.spawnSync('npx bats ' + batsPath + ' --timing', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, { timing: true }),
            result.stdout.toString()
        );
    });

    test('single folder test', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath + ' --timing', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, { timing: true }),
            result.stdout.toString()
        );
    });
});
