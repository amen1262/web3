const pool = require('./db');

async function getBooks() {
    const [rows] = await pool.query(
        'SELECT * FROM books'
    );

    return rows;
}

module.exports = { testConnection, getBooks };
