const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//A MongoDB service document schema is a JSON object that allows you to define the shape and content of documents and embedded documents in a collection
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;