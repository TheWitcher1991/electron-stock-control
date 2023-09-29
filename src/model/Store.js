const db = require('../db/sqlite')
const { promisify, placeholders, isArray, isNumber, isset, isObject } = require('../import/config')

class Store {
    static table = 'store'

    static findAll ({ sort, order }) {
        return promisify(db.all(`SELECT * FROM ${this.table} ORDER BY ${sort} ${order}`))
    }

    static findUnique (data) {
        if (isNumber(data)) {
            return promisify(db.get(`SELECT * FROM ${this.table} WHERE id = ?`, data))
        }
        if (isObject(data)) {
            let sql = `SELECT * FROM ${this.table} WHERE `
            return promisify(db.get(sql))
        }
        return false
    }

    static create (data) {
        if (!isset(data)) return false
        const sql = `INSERT INTO ${this.table} (${String(Object.keys(data)).split(',').join(', ')}) VALUES (${placeholders(Object.keys(data).length)})`
        return promisify(db.run(sql, Object.values(data)))
    }

    static delete (id) {
        if (!isset(id)) return false
        return promisify(db.run(`DELETE FROM ${this.table} WHERE id = ?`, id))
    }

    static update ({ set, where }) {
        let sql = ''
        if (isArray(set) && isArray(where)) {
            sql = `UPDATE ${this.table} SET ${set.join(' ')} WHERE ${where.join(' ')}`
        } else {

        }
        return promisify(db.run(sql))
    }
}

module.exports = Store
