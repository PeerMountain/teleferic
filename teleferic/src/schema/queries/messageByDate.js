const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

const {MessageEnvelope} = require('../types/message')
const {
    Date
} = require('../types/date')

const {getMessages} = require('../../authorizerRequest')

const messageByHash = {
    type: new GraphQLList(MessageEnvelope),
    args: {
        date: {
            type: new GraphQLNonNull(Date)
        }
    },
    resolve: (root, args, options, ast) => getMessages({hash: args.messageHash})
}

module.exports = messageByHash
