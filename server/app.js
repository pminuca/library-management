const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', booksRoutes);

module.exports = app;
