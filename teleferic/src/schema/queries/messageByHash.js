const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const {MessageEnvelope} = require('../types/message')
const {
    SHA256Hash
} = require('../types/hashes')

const {getMessages} = require('../../authorizerRequest')

const messageByHash = {
    type: MessageEnvelope,
    args: {
        messageHash: {
            name: 'messageHash',
            type: new GraphQLNonNull(SHA256Hash)
        }
    },
    resolve: (root, args, options, ast) => {
        return getMessages(
            {
                message_hash: args.messageHash
            }
        )
    }
}

module.exports = messageByHash
