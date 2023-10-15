import cp from 'node:child_process';

import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import bats from '../src';


chai.use(sinonChai);


describe('Bats JS SDK', function () {
    const testsPath = './fixtures/project/test';

    let sandbox: sinon.SinonSandbox;

    this.beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    this.afterEach(function () {
        sandbox.restore();
    });

    it('requires a tests path', function () {
        // @ts-expect-error
        expect(() => bats.run()).to.throw(Error);
    });

    it('accepts a tests path', function () {
        expect(() => bats.run(testsPath)).not.to.throw(Error);
    });

    it('accepts CLI options', function () {
        expect(() => bats.run(testsPath, {})).not.to.throw(Error);
    });

    it('calls the bats binary with the provided tests path', function () {
        const spawnSyncSpy = sandbox.spy(cp, 'spawnSync');

        bats.run(testsPath);
        expect(spawnSyncSpy).to.have.been.calledWith(`bats ${testsPath}`);
    });
});
