const mongoose = require('mongoose');

const { Schema } = mongoose;

// Defining the 'User' schema
const todoSchema = new Schema({
    description: String
  },
  { timestamps: true });

// Export the scheme model to be able to use it in other files
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
