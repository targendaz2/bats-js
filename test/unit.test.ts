import cp from 'node:child_process';

import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import bats from '../src/main';


chai.use(sinonChai);


describe('Bats JS SDK', function () {
    const testsPath = './fixtures/project/test';

    it('requires a tests path', function () {
        // @ts-expect-error
        expect(() => bats()).to.throw(Error);
    });

    it('accepts a tests path', function () {
        expect(() => bats(testsPath)).not.to.throw(Error);
    });

    it('accepts CLI options', function () {
        expect(() => bats(testsPath, {})).not.to.throw(Error);
    });

    it('calls the bats binary', function () {
        const sandbox = sinon.createSandbox();
        const spawnSyncSpy = sandbox.spy(cp, 'spawnSync');

        after(function () {
            sandbox.restore();
        });

        bats(testsPath);
        expect(spawnSyncSpy).to.have.been.called;
    });
});
