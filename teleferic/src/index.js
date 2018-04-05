const express = require('express')
const graphqlHTTPMiddleware = require('express-graphql')
const {
    loggerMiddleware,
    errorLoggerMiddleware
} = require('./log')

const schema = require('./schema')

const GRAPHIQL = process.env.GRAPHIQL === 'TRUE'
const PORT = process.env.PORT || 5000

var server = express()

server.use(loggerMiddleware)

server.use(
    '/teleferic',
    graphqlHTTPMiddleware((req, res, gql) => ({
        schema,
        graphiql: GRAPHIQL,
        pretty: GRAPHIQL,
    }))
)

server.use(errorLoggerMiddleware)

server.listen(PORT, err => {
    if (err) {
        throw err
    }
    console.log(`> Listening on port ${PORT}`)
})
