const { Router } = require('express');
const { append } = require('express/lib/response');

const router = Router();

const Book = require('../models/Book');

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    const {title, author, isbn} = req.body;
    const imagePath = "/uploads/"+req.file.filename;
    const newBook = new Book({title, author, isbn,imagePath});
    await newBook.save();
    console.log(newBook);
    res.send({message: "Book saved"});
});

router.delete('/:id', async (req, res) => {
    res.send('deleting');
   const deletedBook = await Book.findByIdAndDelete(req.params.id);
   res.json({message: "Book deleted"});
});

module.exports = router;