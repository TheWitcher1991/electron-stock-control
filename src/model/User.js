const db = require('../db/sqlite')
const { isNumber, promisify } = require('../import/utils/config')

class User {

    static table = 'user'

    static findUnique () {
        return promisify(db.get(`SELECT * FROM ${this.table} DESC LIMIT 1`))
    }

}

module.exports = User
