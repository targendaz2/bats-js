import { assert } from 'chai';

import * as cp from 'child_process';

import { bats, BatsOptions } from '../src/index';

suite('test running tests', function () {
    test('single file test', function () {
        const batsPath = './fixtures/bats_files/addition.bats';
        const result = cp.spawnSync('npx bats ' + batsPath, {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath).output,
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
            bats(batsPath).output,
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
            bats(batsPath, {recursive: true}).output,
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
            bats(batsPath, {count: true}).output,
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
            bats(batsPath, {count: true}).output,
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
            bats(batsPath, {count: true, recursive: true}).output,
            parseInt(result.stdout.toString())
        );
    });
});

suite('tempdir tests', function () {
    test('return value test', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath + ' --no-tempdir-cleanup --recursive', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, {noTempdirCleanup: true, recursive: true}).output,
            result.stdout.toString()
        );
    });

    test.skip('returns path to tempdir', function () {
        const batsPath = './fixtures/bats_files/';
        const result = cp.spawnSync('npx bats ' + batsPath + ' --no-tempdir-cleanup --recursive', {
            'cwd': '.',
            'shell': true
        });

        assert.include(
            result.stdout.toString(),
            bats(batsPath, {noTempdirCleanup: true, recursive: true}).tempdir as string
        );
    });
});

suite.skip('general parameter tests', function () {
    const batsPath = './fixtures/bats_files/';
    const options: BatsOptions = {
        count: true,
        noTempdirCleanup: true,
        printOutputOnFailure: true,
        recursive: true,
        timing: true,
        trace: true,
        verboseRun: true,
    };

    test('boolean parameters', function () {

        for (const option in options) {
            const result = cp.spawnSync(`npx bats ${batsPath} --${option}`, {
                'cwd': '.',
                'shell': true
            });

            const tempOptions: BatsOptions = {};
            tempOptions[option] = true;

            assert.equal(
                bats(batsPath, tempOptions).output,
                result.stdout.toString()
            );
        }
    });
});
