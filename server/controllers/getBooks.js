const { readData } = require("../data/utils");

const getBooks = (req, res) => {
  const { name, author } = req.query;

  const books = readData();

  const filteredBooks = books.filter(
    (book) =>
      !name ||
      book.name.toLowerCase().includes(name.toLowerCase()) ||
      !author ||
      book.author.toLowerCase().includes(author.toLowerCase())
  );

  res.json(filteredBooks);
};

module.exports = { getBooks };
