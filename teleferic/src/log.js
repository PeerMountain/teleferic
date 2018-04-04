const winston = require('winston')
const expressWinston = require('winston-express')

const logger = expressWinston.logger({
    transports: [
        new winston.Transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.Transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})


module.exports = {
    logger,
    errorLogger
}
