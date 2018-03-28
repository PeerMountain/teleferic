const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const Address = require('./address')
const {RSAKey} = require('./key')

const Persona = new GraphQLObjectType({
    name: 'Persona',
    description: 'Peer Mountain user',
    fields: {
        address: {
            type: new GraphQLNonNull(Address)
        },
        pubkey: {
            type: new GraphQLNonNull(RSAKey)
        },
        nickname: {
            type: GraphQLString
        }
    }
})

module.exports = Persona
