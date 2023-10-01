let prisma = require('./utils/mix')

module.exports = async () => {

    let user = await prisma.user.findUnique()

    if (!user) {
        return false
    }

    let inpCode = document.querySelector('#global__key').value

    if (inpCode !== user.code) {

    }




}
