const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/library';
const books = require('./data/book.json').data;

let db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('connected', () => {
    console.log(`connect ${DB_URL} success`);
}).on('saved',() => {
    console.log('save');
}).on('disconnected', () => {
    console.log('disconnected DB');
}).on('error', (err) => {
    console.log(`connect to db error:${err}`);
});

let BookSchema = new Schema({
    title: String,
    thum: String,
    public: Object
});

let book = mongoose.model('Book', BookSchema);

BookSchema.pre('save',function(next){
    console.log(this.title);
    next();
})

mongoose.connect(DB_URL, {
    useNewUrlParser: true
});

books.forEach(function(element){
    let that = new book(element);
    that.save();
})






// book.create(books);

// let a = async function(){
//     await book.create(books);
//     mongoose.disconnect();
// }

// a();