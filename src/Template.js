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
                let _header = '\'' + name + '\' => \'' + headers[name] + '\''
                phpCode.push(_header)
            }
        }


        if (phpCode.length === 0) {
            return '[]'
        }

        return '[\n' + offset +
            phpCode.join(',\n' + offset) +
            this.padding.repeat(2) + ']'
    }

    renderRequestObjects(requests) {
        let reqArray = requests.map(request => {
            let result = [
                'new Request(',
                request.method + ',\n',
                request.uri + ',\n',
                this.renderHeaders(request.headers) + ',\n',
                request.body + ')'
            ]

            return result.join(this.padding.repeat(2))
        })

        return reqArray.join()
    }

    renderSingleRequest() {
        return `$request = ` +
            this.renderRequestObjects(this.props.requests) + `;

$response = $client->send($request);
echo "Response HTTP : " . $response->getStatusCode();`
    }

    renderMultipleRequests() {
        return `$requests = [
    ` + this.renderRequestObjects(this.props.requests) + `
];

$pool = new Pool($client, $requests, [
    'concurrency' => 5,
    'fulfilled' => function ($response, $index) {
        // this is delivered each successful response
        echo "Response HTTP : " . $response->getStatusCode();
    },
    'rejected' => function ($reason, $index) {
        // this is delivered each failed request
        echo "HTTP Request failed\\n";
        echo $reason;
    },
]);`
    }

    render(props) {
        if (props) {
            this.props = props
        }

        let renderRequest = this.props.requests.length > 1 ?
            this.renderMultipleRequests :
            this.renderSingleRequest
        return `<?php

// Include Guzzle. If using Composer:
// require 'vendor/autoload.php';

use GuzzleHttp\\Pool;
use GuzzleHttp\\Client;
use GuzzleHttp\\Psr7\\Request;

$client = new Client()

` + renderRequest() + `
// Initiate the transfers and create a promise
$promise = $pool->promise();

// Force the pool of requests to complete.
$promise->wait();
`

    }
}
