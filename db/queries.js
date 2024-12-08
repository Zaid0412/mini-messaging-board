const pool = require('./pool')

async function getAllMsgs() {
    const { rows } = await pool.query('SELECT * FROM msgs');
    return rows
}

module.exports = {
    getAllMsgs
}