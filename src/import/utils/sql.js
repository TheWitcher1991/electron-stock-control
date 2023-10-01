const db = require('../../db/sqlite')
const { promisify } = require('./config')

class SQL {
    static sql = ''
    static type = ''

    static select (table) {
        this.sql += `SELECT * FROM ${table} `
        this.type = 'SELECT'
        return this
    }

    static update (table) {
        this.sql += `UPDATE ${table} SET `
        this.type = 'UPDATE'
        return this
    }

    static delete (table) {
        this.sql += `DELETE FROM ${table} WHERE `
        this.type = 'DELETE'
        return this
    }

    static where (...args) {
        this.sql = Array(args).join(' ')
        return this
    }

    static set (...args) {
        this.sql = Array(args).join(' ')
        return this
    }

    static order (...args) {
        this.sql = ` ORDER BY ${Array(args).join(' ')}`
    }

    static fetch (mode = 'FETCH_ASSOC') {
        return promisify(() => {
            if (mode === 'FETCH_ALL') {
                return db.all(this.sql)
            }

            return db.get(this.sql)
        })
    }

    static fetchAll () {
        return promisify(() => db.all(this.sql))
    }

    static execute () {
        return promisify(() => db.run(this.sql))
    }
}

// let res = await app.select('stock').where('id', '=', '1').fetch()
// et upd = await app.update('stock').set('title', '=', 'apple').execute()
// let del = await app.delete('stock').where('id', '=', '1').execute()

module.exports = SQL
