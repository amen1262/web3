const pool = require('./db');
const { getBooks } = require('./query')

async function main() {
    try {
        const books = await getBooks();
        console.log(books);
    } catch (error) {
        console.error('Connection failed:', error.message);
    } finally {
        await pool.end();
    }
    
}

main();
