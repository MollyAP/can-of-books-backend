'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Book = require('./Schema/Book');
const Seed = require('./Schema/Seed')

const app = express();
app.use(cors());

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

app.get('/test', async (request, response) => {
  // Connect to MongoDB
  await connect();

  // Perform your operations with the database here

  // Disconnect from MongoDB
  await disconnect();

  response.send('test request received');
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

app.listen(PORT, () => console.log(`Listening on ${PORT}`));