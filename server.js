'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Book = require('./Schema/Book');
const Seed = require('./Schema/Seed')

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const PORT = process.env.PORT || 3001;

// Async function to connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.databaseurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Async function to disconnect from MongoDB
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

// Route to create a new book
app.post('/books', async (req, res) => {
  // Connect to MongoDB
  await connect();

  // Extract the book properties from the request body
  const { title, description, status } = req.body;

  // Create a new book object using the extracted properties
  const newBook = new Book({
    title,
    description,
    status,
  });

  try {
    // Save the new book to the database
    const savedBook = await newBook.save();

    // Disconnect from MongoDB
    await disconnect();

    // Return the saved book as a response
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating a new book:', error);
    res.status(500).json({ error: 'Failed to create a new book' });
  }
});

// Route to fetch all books
app.get('/books', async (req, res) => {
  // Connect to MongoDB
  await connect();

  // Fetch all books from the database
  const books = await Book.find();

  // Disconnect from MongoDB
  await disconnect();

  // Return the books as a response
  res.json(books);
});

// Route to delete a book
app.delete('/books/:id', async (req, res) => {
  // Connect to MongoDB
  await connect();

  try {
    // Access the book ID from the request parameters
    const bookId = req.params.id;

    // Find the book by its id and remove it from the database
    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      // If the book is not found, return a 404 status code
      return res.status(404).json({ error: 'Book not found' });
    }

    // Disconnect from MongoDB
    await disconnect();

    // Return a success message as a response
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting a book:', error);
    res.status(500).json({ error: 'Failed to delete the book' });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));