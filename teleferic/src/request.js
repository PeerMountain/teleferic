const http = require('http')
const querystring = require('querystring')
const {logger} = require('./log')

const AUTHORIZER_ENDPOINT_HOSTNAME = process.env.AUTHORIZER_ENDPOINT_HOSTNAME
const AUTHORIZER_ENDPOINT_PORT = process.env.AUTHORIZER_ENDPOINT_PORT

const request = (endpointName, data, httpMethod) => new Promise((resolve, reject) => {
    logger.info(`Requesting data from ${endpointName}, request data is ${data}`)
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
    logger.info(`Request path is ${path}`)
    logger.info(`Request headers are ${headers}`)
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
        logger.info(`Request method is POST, writing data to request body.`)
        logger.info(JSON.stringify(data))   
        request.write(JSON.stringify(data))
    }
    request.end()

})

module.exports = request
