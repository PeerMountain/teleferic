const {
    GraphQLScalarType
} = require('graphql')

const HMACSHA256Hash = new GraphQLScalarType({
    name: 'HMACSHA256',
    description: 'HMAC SHA-256 salted hash',
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (node) => node.value
})

const SHA256Hash = new GraphQLScalarType({
    name: 'SHA256',
    description: 'SHA-256 hash',
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (node) => node.value
})

module.exports = {
    SHA256Hash,
    HMACSHA256Hash
}
