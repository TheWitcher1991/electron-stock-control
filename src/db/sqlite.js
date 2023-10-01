const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./main.db', (err) => {
    if (err) console.log('Could not connect to database', err)
})

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS store_type (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS product_type (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL,
            sector VARCHAR NOT NULL,
            email VARCHAR NOT NULL UNIQUE,
            code VARCHAR NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL 
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS store (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title VARCHAR NOT NULL UNIQUE,
            type VARCHAR NOT NULL,
            notice TEXT NULL 
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR NOT NULL UNIQUE,
            type VARCHAR NOT NULL,
            store INT NOT NULL,
            notice TEXT NULL
        )
    `)
})

module.exports = db
