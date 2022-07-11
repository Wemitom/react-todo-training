const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./models/Todo');
const CategoryModel = require('./models/Category');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/todos/:category', async (req, res) => {
  try {
    const todos = (
      await CategoryModel.findOne({
        _id: `${req.params.category}`,
      }).populate('todos')
    ).todos;
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const todo = new TodoModel({
      title: req.body.title,
      completed: false,
    });

    const savedTodo = await todo.save();
    const savedCategory = await CategoryModel.updateOne(
      { _id: req.body.id },
      {
        $set: {
          todos: [
            ...(await CategoryModel.findOne({ _id: `${req.body.id}` })).todos,
            savedTodo,
          ],
        },
      }
    );
    res.status(200).json(savedTodo);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

app.put('/todos', async (req, res) => {
  try {
    const savedTodo = await TodoModel.updateOne(
      { _id: req.body.id },
      {
        $set: {
          completed: req.body.completed,
        },
      }
    );
    res.status(200).json(savedTodo);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await TodoModel.deleteOne({ _id: `${req.params.id}` });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ date: -1 });
    console.log(categories);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.post('/categories', async (req, res) => {
  try {
    const category = new CategoryModel({
      title: req.body.title,
      todos: [],
      color: Math.floor(Math.random() * 16777215).toString(16),
    });

    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

app.delete('/categories/:id', async (req, res) => {
  try {
    (await CategoryModel.findOne({ _id: `${req.params.id}` })).todos.forEach(
      async (todo) => {
        await TodoModel.deleteOne({ _id: `${todo}` });
      }
    );
    await CategoryModel.deleteOne({ _id: `${req.params.id}` });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
