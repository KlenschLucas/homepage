const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

app.use(cors());

// Setup bodypaser
app.use(bodyparser.urlencoded({
    extended: false
  }));
app.use(bodyparser.json());

// MongoDB
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('MongoDB Connected successfully');
});

mongoose.connection.on('error', err => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Setup Path
app.use(express.static(path.join(__dirname, '/public')));

const todoRoute = require('./routes/todo');

// Setup Routes
app.use('/todo', todoRoute);

// Serve HomePage
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Serve Application
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
