const Teleferic = require('../types/teleferic')

const request = require('../../request')

const teleferic = {
    type: Teleferic,
    resolve: () => new Promise((resolve, reject) => {
        request('teleferic').then(data => resolve(data), err => reject(err))
    })
}

module.exports = teleferic
