const user_mongoose = require('mongoose');
user_mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser: true});

const Schema = user_mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    uid: String,
    email: String
});

const user = user_mongoose.model('User', UserSchema);

module.exports = user;