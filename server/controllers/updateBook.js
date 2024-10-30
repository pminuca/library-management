const { readData, writeData } = require("../data/utils");

const updateBook = (req, res) => {
  const books = readData();
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Update book details
  books[bookIndex] = { ...books[bookIndex], ...req.body };
  
  writeData(books);

  res.json(books[bookIndex]);
};

module.exports = { updateBook };
