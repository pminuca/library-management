const { readData, writeData } = require("../data/utils");

const deleteBook = (req, res) => {
  const books = readData();
  const bookId = parseInt(req.params.id, 10);
  const updatedBooks = books.filter(book => book.id !== bookId);

  if (books.length === updatedBooks.length) {
    return res.status(404).json({ error: 'Book not found' });
  }

  writeData(updatedBooks);
  res.status(204).end();
};

module.exports = { deleteBook };
