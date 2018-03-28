const {
    GraphQLScalarType
} = require('graphql')

const AESEncryptedBlob = new GraphQLScalarType({
    name: 'AESEncryptedBlob',
    serialize: value => value,
    parseValue: value => value,
    parseLiteral: node => node.value,
})

const RSAEncryptedBlob = new GraphQLScalarType({
    name: 'RSAEncryptedBlob',
    serialize: value => value,
    parseValue: value => value,
    parseLiteral: node => node.value,
})

module.exports = {
    AESEncryptedBlob,
    RSAEncryptedBlob
}
