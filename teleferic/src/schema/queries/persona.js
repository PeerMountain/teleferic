const {
    GraphQLString
} = require('graphql')
const Address = require('../types/address')
const {
    RSAKey
} = require('../types/key')
const Persona = require('../types/persona')

const {getPersona} = require('../../authorizerRequest')

const persona = {
    type: Persona,
    args: {
        address: {
            type: Address
        },
        pubkey: {
            type: RSAKey
        },
        nickname: {
            type: GraphQLString
        }
    },
    resolve: (obj, args) => getPersona(args)
}

module.exports = persona
