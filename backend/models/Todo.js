const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv/config.js');

const TodoSchema = new Schema({
  title: String,
  completed: Boolean,
});

const TodoModel = mongoose.model('Todos', TodoSchema);

module.exports = TodoModel;
