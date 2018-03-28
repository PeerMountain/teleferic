const {
    GraphQLScalarType
} = require('graphql')
const msgpack = require('msgpack')

module.exports = new GraphQLScalarType({
    name: 'Sign',
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (node) => node.value
})
