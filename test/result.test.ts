import cp from 'node:child_process';
import path from 'node:path';

import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiFS from 'chai-fs';
import sinonChai from 'sinon-chai';

import bats from '../src';


chai.use(chaiFS);
chai.use(sinonChai);


describe('Bats result object', function () {
    const testsPath = path.resolve(__dirname, '..', 'fixtures');

    let sandbox: sinon.SinonSandbox;

    this.beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    this.afterEach(function () {
        sandbox.restore();
    });

    it('returns the raw results of the command', function () {
        const batsResult = bats(testsPath);
        const rawResult = cp.spawnSync(`bats ${testsPath}`, {
            shell: true,
        }).stdout;
        expect(batsResult.output).to.equal(rawResult.toString());
    });

    it('returns the command exit code for valid commands', function () {
        const batsResult = bats(testsPath);
        expect(batsResult.exitCode).to.equal(0);
    });

    it.skip('returns the command exit code for invalid commands', function () {
        // @ts-expect-error
        const batsResult = bats(testsPath, { fakeOption: true });
        expect(batsResult.exitCode).to.equal(1);
    });

    it.skip('returns the path to the tests list file', function () {
        const result = bats(testsPath, { noTempdirCleanup: true });
        expect(result.testsListFile).to.be.a.file();
    });
});
