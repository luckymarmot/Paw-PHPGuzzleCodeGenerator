import {
    registerCodeGenerator
} from './__mocks__/Shims'

@registerCodeGenerator
export default class Generator {
    // TODO update static information with correct ones
    static identifier = 'com.luckymarmot.PawExtensions.MySuperGenerator'
    static title = 'My Super Generator'
    static organisation = 'luckymarmot'
    static repository = 'Paw-ES7-Generator-Template'
    static help =
        'https://github.com/' + organisation + '/' + repository

    static languageHighlighter= 'json'
    static fileExtension = 'har'

    // args: context, requests, options
    generate() {
        // TODO implement generate
        return false
    }
}
