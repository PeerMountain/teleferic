const {
    GraphQLObjectType
} = require('graphql')

const Persona = require('./persona')
const Signature = require('./signature')

const Teleferic = new GraphQLObjectType({
    name: 'Teleferic',
    fields: {
        persona: {
            type: Persona,
        },
        signedTimestamp: {
            type: Signature,
        }
    }
})

module.exports = Teleferic
