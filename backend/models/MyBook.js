const mongoose = require('mongoose');

const myBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true},
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['reading', 'completed', 'want to read'], default: 'want to read' },
  rating: { type: Number, min: 0, max: 5, default: null },
  });
  
  module.exports = mongoose.model('MyBook', myBookSchema);