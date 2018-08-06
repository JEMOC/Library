const Schema = require('../config');

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


module.exports = BookSchema;