const { readData, writeData } = require("../data/utils");

const addBooks = (req, res) => {
  const books = readData();

// Order by ascend order of the id
  const sortedBooks = books.sort((a, b) => b.id - a.id);

  const newBook = {
    id: sortedBooks[0].id + 1, // Next id
    ...req.body,
  };

  books.unshift(newBook); // Insert in the beginning of the array

  writeData(books);

  res.status(201).json(newBook);
};

module.exports = { addBooks };
