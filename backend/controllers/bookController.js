const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, coverImage, availability } = req.body;

    if (!title || !author || !coverImage) {
      return res.status(400).json({ message: "Title, author, and coverImage are required" });
    }

    const newBook = new Book({
      title,
      author,
      coverImage,
      availability: availability ?? true,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBooks, addBook };
