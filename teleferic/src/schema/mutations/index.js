const {
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const {MessageEnvelopeInput} = require('../types/message')
const request = require('../../request')

const sendMessage = {
    type: MessageEnvelope,
    args: {
        envelope: {
            type: new GraphQLNonNull(MessageEnvelopeInput)
        }
    },
    resolve: (obj, {envelope}) => new Promise((resolve, reject) => {
        request(
            'send_message',
            {
                envelope: envelope
            },
            'POST'
        ).then(resolve, reject)
    })
}

module.exports = {
    sendMessage
}
