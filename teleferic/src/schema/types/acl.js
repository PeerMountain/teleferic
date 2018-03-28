const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString
} = require('graphql')

const Address = require('./address')
const Persona = require('./persona')
const {
    AESKey
} = require('./key')

const ACLRule = new GraphQLObjectType({
    name: 'ACLRule',
    fields: {
        reader: {
            type: Persona,
            description: 'PM user'
        },
        key: {
            type: AESKey,
            description: 'Message key encrypted with reader\'s public key'
        }
    }
})

const ACLRuleInput = new GraphQLInputObjectType({
    name: 'ACLRuleInput',
    fields: {
        reader: {
            type: Address,
            description: 'PM address'
        },
        key: {
            type: AESKey,
            description: 'Message key encrypted with reader\'s public key'
        }
    }
})

module.exports = {
    ACLRule,
    ACLRuleInput
}
