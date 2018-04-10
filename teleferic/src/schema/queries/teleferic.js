const Teleferic = require('../types/teleferic')

const {getTelefericData} = require('../../authorizerRequest')

const teleferic = {
    type: Teleferic,
    resolve: getTelefericData
}

module.exports = teleferic
