const winston = require('winston')
const expressWinston = require('express-winston')

const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})


module.exports = {
    logger,
    errorLogger
}
