import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import bats from '../src';


chai.use(sinonChai);


describe('Bats count() method', function () {
    const testsPath = './fixtures/project/test';

    let sandbox: sinon.SinonSandbox;

    this.beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    this.afterEach(function () {
        sandbox.restore();
    });

    it('fails without a tests path', function () {
        // @ts-expect-error
        expect(() => bats.count()).to.throw(Error);
    });

    it('accepts a tests path', function () {
        expect(() => bats.count(testsPath)).not.to.throw(Error);
    });

    it('accepts CLI options', function () {
        expect(() => bats.count(testsPath, { recursive: true })).not.to.throw(Error);
    });

    it('calls the run command with the count argument', function () {
        const runSpy = sandbox.spy(bats, 'run');

        bats.count(testsPath);
        expect(runSpy).to.have.been.calledWith(testsPath, { count: true });
    });
});
