const pool = require('./pool')

async function getAllMsgs() {
    const { rows } = await pool.query('SELECT * FROM msgs');
    return rows
}

async function insertMsg(text, username, added) {
    await pool.query(`INSERT INTO msgs (text, username, added) VALUES ($1, $2, $3)`, [text, username, added])
}

module.exports = {
    getAllMsgs,
    insertMsg
}