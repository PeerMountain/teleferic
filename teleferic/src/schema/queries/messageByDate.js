const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

const {MessageEnvelope} = require('../types/message')
const {
    Date
} = require('../types/date')

const request = require('../../request')

const messageByHash = {
    type: new GraphQLList(MessageEnvelope),
    args: {
        date: {
            type: new GraphQLNonNull(Date)
        }
    },
    resolve: (root, args, options, ast) => {
        return new Promise((resolve, reject) => {
            request(
                'messages',
                {
                    date: args.date
                },
            ).then(data => resolve(data),
                err => reject(err)
            )
        })
    }
}

module.exports = messageByHash
