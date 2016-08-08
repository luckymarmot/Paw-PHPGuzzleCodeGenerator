import {
    registerCodeGenerator
} from './__mocks__/Shims'

@registerCodeGenerator
export default class Generator {
    static identifier =
        'com.luckymarmot.PawExtensions.HARGenerator'
    static title = 'HAR Generator'
    static help =
        'https://github.com/luckymarmot/Paw-HARGenerator'

    static languageHighlighter= 'json'
    static fileExtension = 'har'

    // args: context, requests, options
    generate() {
        // TODO implement generate
        // console.log(requests.length, JSON.stringify(requests))
        return false
    }
}
