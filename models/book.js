const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  author: {
    type: String,
    required: true 
  },
  edition: {
    type: Number,
    required: true 
  },
  publicationDate: {
    type: Date,
    required: true 
  },
  hasEbook: {
    type: Boolean,
    default: false 
  },
  price: {
    type: Number,
    required: true 
  },
  languages: {
    type: [String], 
    required: true
  },
  category: {
    type: String, 
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
