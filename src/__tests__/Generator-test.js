import {
    UnitTest, registerTest, against, targets, desc
} from '../__utils__/TestUtils'

import {
    ClassMock
} from '../__mocks__/Mocks'

import Generator from '../Generator'

@registerTest
@against(Generator)
export class TestGenerator extends UnitTest {

    @targets('generate')
    @desc('dummy test')
    testEvaluateCallsGetSchemaDict() {
        const gen = this.__init()

        gen.spyOn('generate', () => {
            return 42
        })

        const expected = 42
        const result = gen.generate()

        this.assertEqual(gen.spy.generate.count, 1)
        this.assertEqual(expected, result)
    }

    @targets('generate')
    @desc('tests starting with underscore are ignored')
    @desc('@desc decorator is optional, if not used, the name of the func ' +
          'will be used instead')
    _testEvaluateCallsMaterializeSchemas() {
        // should fail if test is not ignored
        this.assertTrue(false)
    }

    @targets('_extractRequests')
    _testExtractRequests() {}

    @targets('_extractRequest')
    _testExtractRequest() {}

    __init() {
        const gen = new ClassMock(new Generator())
        return gen
    }
}
