const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Checked Out', 'On Hold'],
    default: 'Available',
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;