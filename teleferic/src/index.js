const express = require('express')
const graphqlHTTPMiddleware = require('express-graphql')

const schema = require('./schema')

const GRAPHIQL = process.env.GRAPHIQL === 'TRUE'
const PORT = process.env.PORT || 5000

var server = express()
server.use(
    '/teleferic',
    graphqlHTTPMiddleware((req, res, gql) => ({
        schema,
        graphiql: GRAPHIQL,
        pretty: GRAPHIQL,
    }))
)

server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Listening on port ${PORT}`)
})
