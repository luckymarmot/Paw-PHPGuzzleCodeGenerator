if (
    typeof registerDynamicValueClass === 'undefined' ||
    typeof InputField === 'undefined'
) {
    let mocks = require('./PawMocks.js')
    module.exports = {
        registerCodeGenerator: mocks.registerCodeGenerator,
        InputField: mocks.InputField
    }
}
else {
    /* eslint-disable no-undef */
    module.exports = {
        registerCodeGenerator: registerCodeGenerator,
        InputField: InputField
    }
    /* eslint-enable no-undef */
}
