const express = require('express');
const path = require('path');
const Todo = require('../model/todo');

const router = express.Router();

// Server todo html page
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'todo.html'));
});

// Return all Todos
router.post('/', (req, res) => {
  Todo.find({}).exec((err, todos) => {
    if (todos) {
      res.json({
        todos
      });
    } else {
      res.json({
        todos: []
      });
    }
  });
});

// Add new Todo
router.post('/add', (req, res) => {
  const todo = new Todo({
    description: req.body.description
  });
  todo.save({}, () => {
    res.json(todo);
  });
});

// Delete Todo
router.post('/delete', (req, res) => {
  Todo.findByIdAndDelete(req.body.id).exec(err => {
    if (err) {
      res.json(false);
    } else {
      res.json(true);
    }
  });
});

module.exports = router;
