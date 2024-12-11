const db = require('../db/queries')

async function getMsgs(req, res) {
    const msg = await db.getAllMsgs()
    return msg
}

module.exports = {
    getMsgs
}