require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverImage: "https://placehold.co/300x300/FF5733/FFFFFF?text=The+Pragmatic+Programmer",
    availability: true,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "https://placehold.co/300x300/3498DB/FFFFFF?text=Clean+Code",
    availability: true,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('Books seeded.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
