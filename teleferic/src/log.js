const winston = require('winston')
const expressWinston = require('express-winston')

const loggerMiddleware = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})

const errorLoggerMiddleware = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            json: false,
            timestamp: true,
        })
    ],
})


module.exports = {
    loggerMiddleware,
    errorLoggerMiddleware,
    logger
}
