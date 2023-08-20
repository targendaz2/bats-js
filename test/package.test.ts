import { assert } from 'chai';

import * as cp from 'child_process';

import decamelize from 'decamelize';

import { bats, BatsOptions } from '../src/index.js';

suite('test selection tests', function () {
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

suite('parameter tests', function () {
    const batsPath = './fixtures/bats_files/';
    const options: BatsOptions = {
        count: true,
        noTempdirCleanup: true,
        printOutputOnFailure: true,
        recursive: true,
        trace: true,
        verboseRun: true,
    };

    const testBoolOption = (option: string) => function () {
        const cliOption = decamelize(option, { separator: '-' });

        const result = cp.spawnSync(`npx bats ${batsPath} --${cliOption}`, {
            'cwd': '.',
            'shell': true
        });

        const tempOptions: BatsOptions = {};
        tempOptions[option] = true;

        assert.equal(
            bats(batsPath, tempOptions).output,
            result.stdout.toString()
        );
    };

    for (const option in options) {
        test(`${option} is a valid boolean option`, testBoolOption(option));
    }

    test('count returns number', function () {
        const result = cp.spawnSync('npx bats ' + batsPath + ' --count', {
            'cwd': '.',
            'shell': true
        });

        assert.equal(
            bats(batsPath, { count: true }).output,
            parseInt(result.stdout.toString())
        );
    });
});
