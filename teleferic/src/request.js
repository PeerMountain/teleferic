const http = require('http')
const querystring = require('querystring')
const {logger} = require('winston')

const AUTHORIZER_ENDPOINT_HOSTNAME = process.env.AUTHORIZER_ENDPOINT_HOSTNAME
const AUTHORIZER_ENDPOINT_PORT = process.env.AUTHORIZER_ENDPOINT_PORT

const request = (endpointName, data, httpMethod) => new Promise((resolve, reject) => {
    logger.info(`Requesting data (${httpMethod}) from Authorizer on ${endpointName}`)
    var path, headers
    data = data || {}
    if (httpMethod === 'GET' || !httpMethod)
        path = '/' + endpointName + '?' + querystring.stringify(data)
    else {
        path = endpointName
        headers = {
            "Content-Type" : "application/json"
        }
    }
    let options = {
        host: AUTHORIZER_ENDPOINT_HOSTNAME,
        port: AUTHORIZER_ENDPOINT_PORT,
        path: path,
        method: httpMethod,
        headers: headers
    }
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
                reject(JSON.parse(data).error)
            resolve(JSON.parse(data))
        })
    })
    if (httpMethod && httpMethod !== 'GET')
        request.write(JSON.stringify(data))
    request.end()

})

module.exports = request
