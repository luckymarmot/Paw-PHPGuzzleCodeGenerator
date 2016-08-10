import {
    registerCodeGenerator
} from './__mocks__/Shims'

import Template from './Template'

@registerCodeGenerator
export default class Generator {
    // TODO update static information with correct ones
    // Organisation
    static organisation = 'luckymarmot'
    static repository = 'Paw-PHPGuzzleCodeGenerator'

    // Generator
    static identifier = 'com.luckymarmot.PawExtensions.PHPGuzzleCodeGenerator'
    static title = 'PHP Guzzle Code Generator'

    static languageHighlighter= 'php'
    static fileExtension = 'php'

    static help = 'https://github.com/luckymarmot/Paw-PHPGuzzleCodeGenerator'

    constructor() {
        this.template = new Template()
    }

    // args: context, requests, options
    /* eslint-disable no-unused-vars */
    generate(context, requests, options) {
        // TODO implement generate
        this.padding = ' '.repeat(4)

        let generated = this._extractRequests(requests)

        const model = {
            requests: generated
        }

        return this.template.render(model)
    }
    /* eslint-enable no-unused-vars */

    _extractRequests(requests) {
        let result = []

        requests.forEach(request => {
            let _request = this._extractRequest(request)
            if (_request) {
                result.push(_request)
            }
        })

        return result
    }

    _extractRequest(request) {
        let method = request.method
        let uri = request.url
        let headers = request.headers
        let body = request.body

        return {
            method: method,
            uri: uri,
            headers: headers,
            body: body
        }
    }
}
