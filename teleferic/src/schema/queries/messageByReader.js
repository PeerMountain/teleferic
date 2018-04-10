const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const {MessageEnvelope} = require('../types/message')
const Address = require('../types/address')

const {getMessages} = require('../../authorizerRequest')

const messageByReader = {
    type: MessageEnvelope,
    args: {
        reader: {
            type: new GraphQLNonNull(Address)
        }
    },
    resolve: (root, args, options, ast) => {
        return getMessages(
            {
                reader: args.reader
            }
        )
    }
}

module.exports = messageByReader
