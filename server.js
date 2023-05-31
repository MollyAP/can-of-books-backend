'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));


// cool imports yo

const express = require("express"); // Installed Express
const mongoose = require("mongoose"); // Installed MongoDB
const app = express();

mongoose.connect("mongodb://localhost:27017", { // Connecting mongoDB to lost host 27017
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err); // Log any connection error
  } else {
    console.log("successfully connected"); // Connection successful message
  }
});

app.listen(3000, () => {
  console.log("on port 3000!"); // Server listening on port 3000
});

// Start of the schema definition
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  status: {
    type: String,
    enum: ['available', 'borrowed', 'unavailable'], // Available status options: 'available', 'borrowed', 'unavailable'
    default: 'available' // Default status set to 'available' if not provided
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
