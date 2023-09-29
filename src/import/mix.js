const Product = require('../model/Product')
const Store = require('../model/Store')
const User = require('../model/User')
const SQL = require('./sql')

const prisma = {
    product: Product,
    store: Store,
    user: User,

    ...SQL
}

module.exports = prisma
