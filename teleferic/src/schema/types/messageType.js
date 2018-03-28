const {
    GraphQLEnumType
} = require('graphql')

module.exports = new GraphQLEnumType({
    name: 'MessageType',
    values: {
        SYSTEM: {
            value: 0
        },
        REGISTRATION: {
            value: 1
        },
        ASSERTION: {
            value: 2
        },
        ATTESTATION: {
            value: 3
        },
        SERVICE: {
            value: 4
        },
        DELEGATION: {
            value: 5
        },
    },
    description: 'Message Type enum'
})
