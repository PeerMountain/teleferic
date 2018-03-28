const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const {MessageEnvelope} = require('../types/message')
const Address = require('../types/address')

const request = require('../../request')

const messageByReader = {
    type: MessageEnvelope,
    args: {
        reader: {
            type: new GraphQLNonNull(Address)
        }
    },
    resolve: (root, args, options, ast) => {
        return new Promise((resolve, reject) => {
            request(
                'messages',
                {
                    reader: args.reader
                },
            ).then(resolve, reject)
        })
    }
}

module.exports = messageByReader
