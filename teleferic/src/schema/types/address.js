const {
    GraphQLScalarType,
} = require('graphql')

module.exports = new GraphQLScalarType({
    name: 'Address',
    serialize: value => value,
    parseLiteral: node => node.value,
    parseValue: value => value
})
