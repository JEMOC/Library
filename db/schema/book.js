const book_mongoose = require('mongoose');
book_mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser: true});
const Schema = book_mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    thum: String,
    public: {
        author: String,
        conpany: String,
        date: String,
        price: String
    }
});

const Book = book_mongoose.model('Book', BookSchema);


module.exports = Book;