const express = require('express');
const {getAllBooks, getBookById, createBook, updateBook, deleteBook, getAllMembers, getMemberById, createMember, updateMember, deleteMember, getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan} = require('./query');
const app = express();
const PORT = 3000;
app.use(express.json());



/******************Books**********************/
app.get('/api/books', async (req, res) => {
  try {
    const { title, author_id, category_id, available } = req.query;

    const books = await getAllBooks(
      title,
      author_id,
      category_id,
      available
    );

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/api/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await getBookById(id);

    if (book.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/books', async (req, res) => {
  try {
    const book = req.body;
    const result = await createBook(book);

    book.id = result.insertId;

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = req.body;

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await updateBook(id, book);

    book.id = existingBook.id;
    res.json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteBook(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/******************Members**********************/
app.get('/api/members', async (req, res) => {
  try {
    const members = await getAllMembers();
    res.json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = await getMemberById(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const member = req.body;

    if (!member || !member.first_name || !member.last_name || !member.email) {
      return res.status(400).json({ error: 'first_name, last_name, and email are required' });
    }

    if (member.registration_date === undefined) {
      member.registration_date = null;
    }

    const result = await createMember(member);
    member.id = result.insertId;

    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = req.body;

    if (!member || !member.first_name || !member.last_name || !member.email) {
      return res.status(400).json({ error: 'first_name, last_name, and email are required' });
    }

    const existingMember = await getMemberById(id);

    if (!existingMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    if (member.registration_date === undefined) {
      member.registration_date = existingMember.registration_date;
    }

    await updateMember(id, member);

    member.id = existingMember.id;
    res.json(member);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMember(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/******************Loans**********************/
app.get('/api/loans', async (req, res) => {
  try {
    const loans = await getAllLoans();
    res.json(loans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/loans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await getLoanById(id);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json(loan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/loans', async (req, res) => {
  try {
    const loan = req.body;

    if (!loan || !loan.member_id || !loan.book_id || !loan.loan_date) {
      return res.status(400).json({ error: 'member_id, book_id, and loan_date are required' });
    }

    if (loan.return_date === undefined) {
      loan.return_date = null;
    }

    const result = await createLoan(loan);
    loan.id = result.insertId;

    res.status(201).json(loan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/loans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loan = req.body;

    if (!loan || !loan.member_id || !loan.book_id || !loan.loan_date) {
      return res.status(400).json({ error: 'member_id, book_id, and loan_date are required' });
    }

    const existingLoan = await getLoanById(id);

    if (!existingLoan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.return_date === undefined) {
      loan.return_date = existingLoan.return_date;
    }

    await updateLoan(id, loan);

    loan.id = existingLoan.id;
    res.json(loan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/loans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteLoan(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})