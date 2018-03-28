const {
    GraphQLString
} = require('graphql')
const Address = require('../types/address')
const {
    RSAKey
} = require('../types/key')
const Persona = require('../types/persona')

const request = require('../../request')

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
    resolve: (obj, args) => new Promise((resolve, reject) => {
        request(
            'persona',
            args,
        ).then(data => resolve(data),
            err => reject(err)
        )
    })
}

module.exports = persona
