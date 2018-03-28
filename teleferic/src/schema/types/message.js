const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const {
    SHA256Hash,
    HMACSHA256Hash
} = require('./hashes')
const Address = require('./address')
const MessageType = require('./messageType')
const Persona = require('./persona')
const Signature = require('./signature')
const {ACLRule, ACLRuleInput} = require('./acl')
const {ObjectType, ObjectInputType} = require('./object')
const {AESEncryptedBlob} = require('./encryptedBlob')
MessageEnvelope = new GraphQLObjectType({
    name: 'MessageEnvelope',
    fields: () => ({
        sender: {
            type: new GraphQLNonNull(Persona)
        },
        messageType: {
            type: new GraphQLNonNull(MessageType)
        },
        messageHash: {
            type: new GraphQLNonNull(SHA256Hash)
        },
        messageSign: {
            type: new GraphQLNonNull(Signature)
        },
        dossierHash: {
            type: new GraphQLNonNull(HMACSHA256Hash)
        },
        bodyHash: {
            type: new GraphQLNonNull(SHA256Hash)
        },
        ACL: {
            type: new GraphQLList(ACLRule)
        },
        objects: {
            type: new GraphQLList(ObjectType)
        },
        message: {
            type:new GraphQLNonNull(AESEncryptedBlob)
        }

    }),
    description: "Message Envelope"
})

MessageEnvelopeInput = new GraphQLInputObjectType({
    name: 'MessageEnvelopeInput',
    fields: () => ({
        sender: {
            type: new GraphQLNonNull(Address)
        },
        messageType: {
            type: new GraphQLNonNull(MessageType)
        },
        messageHash: {
            type: new GraphQLNonNull(SHA256Hash)
        },
        messageSign: {
            type: new GraphQLNonNull(Signature)
        },
        dossierHash: {
            type: new GraphQLNonNull(HMACSHA256Hash)
        },
        bodyHash: {
            type: new GraphQLNonNull(SHA256Hash)
        },
        ACL: {
            type: new GraphQLList(ACLRuleInput)
        },
        objects: {
            type: new GraphQLList(ObjectInputType)
        },
        message: {
            type:new GraphQLNonNull(AESEncryptedBlob)
        }

    }),
    description: "Message Envelope"
})

module.exports = {
    MessageEnvelope,
    MessageEnvelopeInput
}
