const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv/config.js');
require('./Todo');

const CategorySchema = new Schema({
  title: String,
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todos' }],
  color: String,
});

const CategoryModel = mongoose.model('Categories', CategorySchema);

module.exports = CategoryModel;
