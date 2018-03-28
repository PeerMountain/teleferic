const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

const {
    SHA256Hash,
    HMACSHA256Hash
} = require('./hashes')
const Signature = require('./signature')
const {AESEncryptedBlob} = require('./encryptedBlob')

const containerFields = {
    containerHash: {
        type: new GraphQLNonNull(SHA256Hash)
    },
    containerSign: {
        type: new GraphQLNonNull(Signature)
    },
    objectContainer: {
        type: new GraphQLNonNull(AESEncryptedBlob)
    }
}

const ContainerType = new GraphQLObjectType({
    name: 'Container',
    fields: containerFields
})

const ContainerInputType = new GraphQLInputObjectType({
    name: 'ContainerInput',
    fields: containerFields
})

const ObjectType = new GraphQLObjectType({
    name: 'Object',
    fields: {
        objectHash: {
            type: new GraphQLNonNull(SHA256Hash)
        },
        metaHashes: {
            type: new GraphQLNonNull(
                new GraphQLList(HMACSHA256Hash)
            )
        },
        container: {
            type: ContainerType
        }
    }
})

ObjectInputType = new GraphQLInputObjectType({
    name: 'ObjectInput',
    fields: {
        objectHash: {
            type: new GraphQLNonNull(SHA256Hash)
        },
        metaHashes: {
            type: new GraphQLNonNull(
                new GraphQLList(HMACSHA256Hash)
            )
        },
        container: {
            type: ContainerInputType
        }
    }
})

module.exports = {
    ObjectType,
    ObjectInputType
}
