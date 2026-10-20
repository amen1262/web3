const pool = require('./db');

/******************Books**********************/

async function getAllBooks(title, author_id, category_id, available, sort, order) {
  let sql = `
    SELECT id, title, available, isbn, publication_year, category_id, author_id
    FROM books
    WHERE (? IS NULL OR title LIKE ?)
      AND (? IS NULL OR author_id = ?)
      AND (? IS NULL OR category_id = ?)
      AND (? IS NULL OR available = ?)
  `;

  const params = [
    title || null, title ? `%${title}%` : null,
    author_id || null, author_id || null,
    category_id || null, category_id || null,
    available ?? null, available === 'true' ? 1 : available === 'false' ? 0 : null
  ];

  const [rows] = await pool.query(sql, params);
  return rows;
}


async function getBookById(id) {
  const [rows] = await pool.query(
    'SELECT id, title, available, isbn, publication_year, category_id, author_id FROM books WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function createBook(book) {
  const [result] = await pool.query(
    'INSERT INTO books (title, available, isbn, publication_year, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?)',
    [
      book.title,
      book.available,
      book.isbn,
      book.publication_year,
      book.category_id,
      book.author_id
    ]
  );
  return result;
}

async function updateBook(id, book) {
  const [result] = await pool.query(
    'UPDATE books SET title = ?, available = ?, isbn = ?, publication_year = ?, category_id = ?, author_id = ? WHERE id = ?',
    [
      book.title,
      book.available,
      book.isbn,
      book.publication_year,
      book.category_id,
      book.author_id,
      id
    ]
  );
  return result;
}

async function deleteBook(id) {
  const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
  return result;
}

/******************Members**********************/

async function getAllMembers() {
  const [rows] = await pool.query(
    'SELECT id, first_name, last_name, email, registration_date FROM members'
  );
  return rows;
}

async function getMemberById(id) {
  const [rows] = await pool.query(
    'SELECT id, first_name, last_name, email, registration_date FROM members WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function createMember(member) {
  const [result] = await pool.query(
    'INSERT INTO members (first_name, last_name, email, registration_date) VALUES (?, ?, ?, ?)',
    [
      member.first_name,
      member.last_name,
      member.email,
      member.registration_date
    ]
  );
  return result;
}

async function updateMember(id, member) {
  const [result] = await pool.query(
    'UPDATE members SET first_name = ?, last_name = ?, email = ?, registration_date = ? WHERE id = ?',
    [
      member.first_name,
      member.last_name,
      member.email,
      member.registration_date,
      id
    ]
  );
  return result;
}

async function deleteMember(id) {
  const [result] = await pool.query('DELETE FROM members WHERE id = ?', [id]);
  return result;
}

/******************Loans**********************/

async function getAllLoans() {
  const [rows] = await pool.query(
    'SELECT id, member_id, book_id, loan_date, return_date FROM loans'
  );
  return rows;
}

async function getLoanById(id) {
  const [rows] = await pool.query(
    'SELECT id, member_id, book_id, loan_date, return_date FROM loans WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function createLoan(loan) {
  const [result] = await pool.query(
    'INSERT INTO loans (member_id, book_id, loan_date, return_date) VALUES (?, ?, ?, ?)',
    [
      loan.member_id,
      loan.book_id,
      loan.loan_date,
      loan.return_date
    ]
  );
  return result;
}

async function updateLoan(id, loan) {
  const [result] = await pool.query(
    'UPDATE loans SET member_id = ?, book_id = ?, loan_date = ?, return_date = ? WHERE id = ?',
    [
      loan.member_id,
      loan.book_id,
      loan.loan_date,
      loan.return_date,
      id
    ]
  );
  return result;
}

async function deleteLoan(id) {
  const [result] = await pool.query('DELETE FROM loans WHERE id = ?', [id]);
  return result;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan
};