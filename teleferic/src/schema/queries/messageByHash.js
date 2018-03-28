const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const {MessageEnvelope} = require('../types/message')
const {
    SHA256Hash
} = require('../types/hashes')

const request = require('../../request')

const messageByHash = {
    type: MessageEnvelope,
    args: {
        messageHash: {
            name: 'messageHash',
            type: new GraphQLNonNull(SHA256Hash)
        }
    },
    resolve: (root, args, options, ast) => {
        return new Promise((resolve, reject) => {
            request(
                'messages',
                {
                    message_hash: args.messageHash
                },
            ).then(resolve, reject)
        })
    }
}

module.exports = messageByHash
