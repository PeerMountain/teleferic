const {
    GraphQLScalarType
} = require('graphql')

const moment = require('moment')

const Date = new GraphQLScalarType({
    name: 'Date',
    description: 'ISO-8601 compliant date string',
    serialize: (value) => value.toISOString(), // prevent utc conversion
    parseValue: (value) => moment(value),
    parseLiteral: (node) => moment(node.value)
})

module.exports = {
    Date
}
