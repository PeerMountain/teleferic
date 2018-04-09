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
    let request = http.request(options, (response) => {
        let data = ""
        response.on('error', e => {
            reject(e.message)
        })
        response.on('data', chunk => {
            data += chunk
        })
        response.on('end', e => {
            if (response.statusCode >= 400)
                try {
                    reject(JSON.parse(data).error)
                } catch (e) {
                    reject(data)
                }
            else {
                resolve(JSON.parse(data))
            }
        })
    })
    if (httpMethod && httpMethod !== 'GET'){
        request.write(JSON.stringify(data))
    }
    request.end()

})

module.exports = request
