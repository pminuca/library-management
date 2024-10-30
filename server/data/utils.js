const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'books.json');

// Helper function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
