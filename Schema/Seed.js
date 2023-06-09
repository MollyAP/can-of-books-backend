const mongoose = require('mongoose');
const Book = require('./Book');

// Function to seed the database with books
const Seed = async () => {
    try {
console.log(process.env.databaseurl)
        // Connect to MongoDB
        mongoose.connect(process.env.databaseurl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log('Connected to MongoDB'))
            .catch(error => console.error('Error colnnecting to MongoDB:', error));

        // Create book objects
        const book1 = new Book({
            title: 'Homestuck',
            description: 'A webcomic written and illustrated by Andrew Hussie.',
            status: 'Available',
            author: 'Andrew Hussie',
        });

        const book2 = new Book({
            title: 'Dead Dead Demon\'s Dededede Destruction',
            description: 'A manga series written and illustrated by Inio Asano.',
            status: 'Available',
            author: 'Inio Asano',
        });

        const book3 = new Book({
            title: 'Maximum Ride',
            description: 'A series of young adult science fiction novels by James Patterson.',
            status: 'Available',
            author: 'James Patterson',
        });

        // Save the books to the database
        await Book.insertMany([book1, book2, book3]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        // Disconnect from MongoDB
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Call the Seed function to seed the database
Seed();