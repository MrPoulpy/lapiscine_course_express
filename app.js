const express = require('express');
const app = express();
app.use(express.json());

const books = [
    {
        id: 1,
        name: "Villa Vortex",
        isbn: "123456789",
        genre: "Anticipation",
        author: "Maurice G. Dantec",
        resume: "Un livre qu'il est bien de le lire",
        annee: 1985
    },
    {
        id: 2,
        name: "Martine chez les gilets jaune",
        isbn: "23654723",
        genre: "Roman",
        author: "Jojo",
        resume: "Martine s'essaye au militantisme",
        annee: 2019
    }
];

// lire
app.get('/api/books', (req, res) => {
    res.json(books);
});

// lire 1 en particulier
app.get('/api/books/:id', (req, res) => {

    res.json(books.find(book => {
        return book.id == req.params.id;
    }));
    
});

// supprimer
app.delete('/api/books/:id', (req, res) => {

    const index = books.findIndex(book => {
        return book.id == req.params.id;
    });
    books.splice(index, 1);
    res.json();

});

// ajouter
app.put('/api/books', (req, res) => {

    const book = {
        id: books.length + 1,
        name: req.body.name,
        isbn: req.body.isbn,
        genre: req.body.genre,
        author: req.body.author,
        resume: req.body.resume,
        annee: req.body.annee
    };

    books.push(book);
    res.json(book);

});

// modifier
app.patch('/api/books/:id', (req, res) => {
    
    const book = books.find(book => {
        return book.id == req.params.id;
    });
    
    book.name = req.body.name || book.name;
    book.isbn = req.body.isbn || book.isbn;
    book.genre = req.body.genre || book.genre;
    book.author = req.body.author || book.author;
    book.resume = req.body.resume || book.resume;
    book.annee = req.body.annee || book.annee;

    res.json(book);

});

const port = 80;
app.listen(port, () => {
   console.log("Server up");
});