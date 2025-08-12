const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
