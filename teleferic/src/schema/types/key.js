const {
    GraphQLString,
    GraphQLScalarType
} = require('graphql')

const AESKey = new GraphQLScalarType({
    name: 'AESKey',
    serialize: value => value,
    parseLiteral: node => node.value,
    parseValue: value => value
})

const RSAKey = new GraphQLScalarType({
    name: 'RSAKey',
    serialize: value => Buffer.from(value).toString('base64'),
    parseLiteral: node => node.value,
    parseValue: value => value
})

module.exports = {
    AESKey,
    RSAKey
}
