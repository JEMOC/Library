const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser: true});
const Schema = mongoose.Schema;

module.exports = Schema;