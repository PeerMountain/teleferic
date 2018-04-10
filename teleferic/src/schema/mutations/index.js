const {
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const {MessageEnvelopeInput} = require('../types/message')
var {sendMessage} = require('../../authorizerRequest')

const sendMessageMutation = {
    type: MessageEnvelope,
    args: {
        envelope: {
            type: new GraphQLNonNull(MessageEnvelopeInput)
        }
    },
    resolve: (obj, {envelope}) => sendMessage(envelope)
}

module.exports = {
    sendMessage: sendMessageMutation
}
