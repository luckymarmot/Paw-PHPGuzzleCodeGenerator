import {
    registerCodeGenerator
} from './__mocks__/Shims'

@registerCodeGenerator
export default class Generator {
    // TODO update static information with correct ones
    // Organisation
    static organisation = 'luckymarmot'
    static repository = 'Paw-ES7-Generator-Template'

    // Generator
    static identifier = 'com.luckymarmot.PawExtensions.MySuperGenerator'
    static title = 'My Super Generator'

    static languageHighlighter= 'json'
    static fileExtension = 'har'

    static help = 'https://github.com/' + organisation + '/' + repository

    // args: context, requests, options
    generate() {
        // TODO implement generate
        return false
    }
}
