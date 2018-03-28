const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

const {ObjectType} = require('../types/object')
const {SHA256Hash} = require('../types/hashes')

const request = require('../../request')

const objectByHash = {
    type: new GraphQLNonNull(ObjectType),
    args: {
        objectHash: {
            type: new GraphQLNonNull(SHA256Hash)
        }
    },
    resolve: (root, args, options, ast) => {
        return new Promise((resolve, reject) => {
            request(
                'objects',
                {
                    object_hash: args.objectHash
                },
            ).then(resolve, reject)
        })
    }
}

module.exports = objectByHash
