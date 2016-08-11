export default class Template {

    constructor(props) {
        this.props = props
        this.padding = ' '.repeat(4)
    }

    renderHeaders(headers) {
        let offset = this.padding.repeat(3)

        let phpCode = []
        if (headers) {
            let headerNames = Object.keys(headers)
            for (let name of headerNames) {
                let _header = '"' + name + '" => "' + headers[name] + '"'
                phpCode.push(_header)
            }
        }


        if (phpCode.length === 0) {
            return '[]'
        }

        return '[\n' + offset +
            phpCode.join(',\n' + offset) + '\n' +
            this.padding.repeat(2) + ']'
    }

    renderRequestObjects(requests) {
        let reqArray = requests.map(request => {
            let _body = JSON.stringify(request.body) || null

            let body = []
            if (_body.length > 5000) {
                body = [ '# body was too long to be included\n', '"")' ]
            }
            else {
                body = [ _body + ')' ]
            }

            let result = [
                'new Request(\n',
                '"' + request.method + '",\n',
                '"' + request.uri + '",\n',
                this.renderHeaders(request.headers) + ',\n'
            ].concat(body)

            return result.join(this.padding.repeat(2))
        })

        return reqArray.join(',\n' + this.padding)
    }

    renderSingleRequest() {
        return `$request = ` +
            ::this.renderRequestObjects(this.props.requests) + `;

$response = $client->send($request);
echo "Response HTTP : " . $response->getStatusCode() . "\\n";`
    }

    renderMultipleRequests() {
        return `$requests = [
    ` + ::this.renderRequestObjects(this.props.requests) + `
];

$pool = new Pool($client, $requests, [
    "concurrency" => 5,
    "fulfilled" => function ($response, $index) {
        // this is delivered each successful response
        echo "Response HTTP : " . $response->getStatusCode();
    },
    "rejected" => function ($reason, $index) {
        // this is delivered each failed request
        echo "HTTP Request failed\\n";
        echo $reason;
    },
]);

// Initiate the transfers and create a promise
$promise = $pool->promise();

// Force the pool of requests to complete.
$promise->wait();`
    }

    render(props) {
        if (props) {
            this.props = props
        }

        let renderRequest = this.props.requests.length > 1 ?
            ::this.renderMultipleRequests :
            ::this.renderSingleRequest

        return `<?php

// Include Guzzle. If using Composer:
// require 'vendor/autoload.php';

use GuzzleHttp\\Pool;
use GuzzleHttp\\Client;
use GuzzleHttp\\Psr7\\Request;

$client = new Client();

` + renderRequest()
    }
}
