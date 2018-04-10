const http = require('http')
const querystring = require('querystring')
const {logger} = require('./log')

const AUTHORIZER_ENDPOINT_HOSTNAME = process.env.AUTHORIZER_ENDPOINT_HOSTNAME
const AUTHORIZER_ENDPOINT_PORT = process.env.AUTHORIZER_ENDPOINT_PORT

const request = (endpointName, data, httpMethod) => new Promise((resolve, reject) => {
    let path, headers
    data = data || {}

    if (httpMethod === 'GET' || !httpMethod) {
        queryString = querystring.stringify(data)
        path = `/${endpointName}?${queryString}`
    } else {
        path = `/${endpointName}`
        headers = {
            'Content-Type' : 'application/json',
            'Content-Length': JSON.stringify(data).length
        }
    }

    let options = {
        host: AUTHORIZER_ENDPOINT_HOSTNAME,
        port: AUTHORIZER_ENDPOINT_PORT,
        path: path,
        method: httpMethod,
        headers: headers
    }

    logger.info(JSON.stringify(options))
    logger.info(JSON.stringify(data))

    let sendRequest = http.request(options, (response) => {
        let return_data = ''
        response.on('error', e => {
            logger.error(e)
            reject(e.message)
        })
        response.on('data', chunk => {
            return_data += chunk
        })
        response.on('end', e => {
            if (response.statusCode >= 400)
                try {
                    reject(JSON.parse(return_data).error)
                } catch (e) {
                    logger.error(return_data)
                    reject(return_data)
                }
            else {
                resolve(JSON.parse(return_data))
            }
        })
    })
    if (httpMethod && httpMethod !== 'GET'){
        sendRequest.write(JSON.stringify(data))
    }

    sendRequest.end()
})

const sendMessage = envelope =>
    request(
        'send_message',
        {
            envelope: envelope
        },
        'POST'
    )

const getMessages = args =>
    request(
        'messages',
        args,
        'GET'
    )

const getTelefericData = () =>
    request(
        'teleferic',
        {},
        'GET'
    )

const getPersona = args =>
    request(
        'persona',
        args,
        'GET'
    )

const getObject = hash =>
    request(
        'objects',
        {
            object_hash: hash
        },
        'GET'
    )

module.exports = {
    sendMessage,
    getMessages,
    getPersona,
    getTelefericData,
    getObject
}
