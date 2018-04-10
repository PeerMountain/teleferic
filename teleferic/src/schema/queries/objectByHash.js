const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

const {ObjectType} = require('../types/object')
const {SHA256Hash} = require('../types/hashes')

const {getObject} = require('../../authorizerRequest')

const objectByHash = {
    type: new GraphQLNonNull(ObjectType),
    args: {
        objectHash: {
            type: new GraphQLNonNull(SHA256Hash)
        }
    },
    resolve: (root, args, options, ast) => getObject(args.objectHash)
}

module.exports = objectByHash
