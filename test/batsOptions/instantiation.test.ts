import { assert } from 'chai';

import { BatsOptions, IBatsOptions } from '../../src/options.js';

suite('Bats options object instantiation tests', function () {
    suite('instantiation from single option', function () {
        const optionsToTest: IBatsOptions[] = [
            { count: true },
            { codeQuoteStyle: '""' },
            { codeQuoteStyle: '--' },
            { lineReferenceFormat: 'comma_line' },
            { lineReferenceFormat: 'colon' },
            { lineReferenceFormat: 'uri' },
            { lineReferenceFormat: 'custom' },
            { filter: /addition/ },
            { filterStatus: 'failed' },
            { filterStatus: 'missed' },
            { filterTags: 'tag1' },
            { filterTags: ['tag1', 'tag2'] },
            { formatter: 'pretty' },
            { formatter: 'tap' },
            { formatter: 'tap13' },
            { jobs: 2 },
            { parallelBinaryName: 'parallel' },
            { noTempdirCleanup: true },
            { noParallelizeAcrossFiles: true },
            { noParallelizeWithinFiles: true },
            { pretty: true },
            { printOutputOnFailure: true },
            { recursive: true },
            { showOutputOfPassingTests: true },
            { tap: true },
            { trace: true },
            { verboseRun: true },
        ];

        const testInstantiation = (optionToTest: IBatsOptions) => function () {
            // Given a known Bats option

            // When a Bats options object is instantiated from that option
            const options = new BatsOptions(optionToTest);

            // Then the resulting object's options should match the option it was instantiated from
            assert.equal(options.options, optionToTest);
        };

        optionsToTest.forEach(optionToTest => {
            // Parse option into test name
            const [option, value] = Object.entries(optionToTest)[0];
            const testName = `instantiate from { ${option}: ${value} }`;

            test(testName, testInstantiation(optionToTest));
        });
    });

    suite('instantiation from multiple options', function () {
        const optionsToTest: IBatsOptions[] = [
            { count: true, noTempdirCleanup: true, recursive: true },
            { count: true, filter: /addition/, noTempdirCleanup: true, recursive: true },
            { count: true, filterTags: ['tag1', 'tag2'], noTempdirCleanup: true, recursive: true },
        ];

        const testInstantiation = (optionToTest: IBatsOptions) => function () {
            // Given known Bats options

            // When a Bats options object is instantiated from those options
            const options = new BatsOptions(optionToTest);

            // Then the resulting object's options should match the options it was instantiated from
            assert.equal(options.options, optionToTest);
        };

        optionsToTest.forEach(optionToTest => {
            // Parse option into test name
            let testName = `instantiate from { `;
            for (const [option, value] of Object.entries(optionToTest)) {
                testName += `${ option }: ${ value }, `;
            }
            
            testName = testName.slice(0, -2);
            testName += '}';

            test(testName, testInstantiation(optionToTest));
        });
    });
});
