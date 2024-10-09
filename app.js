const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/book'); 

dotenv.config();

const app = express();
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to the database'))
  .catch((err) => console.error('Failed to connect to the database:', err));


app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body); 
    await newBook.save();
    res.status(201).json(newBook); 
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


app.get('/books', async (req, res) => {
  try {
    const books = await Book.find(); // جلب جميع الكتب من قاعدة البيانات
    res.status(200).json(books); // إرسال قائمة الكتب
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // البحث عن الكتاب باستخدام الـ ID
    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); // في حال عدم وجود الكتاب
    }
    res.status(200).json(book); // إرسال الكتاب في الرد
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


app.patch('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }); // تحديث جزئي للكتاب
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook); 
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id); 
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' }); 
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
