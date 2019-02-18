'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.use(express.static(__dirname + '/public'));    // set static directory

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.get('/index.html', (req, res) => {
  res.sendFile('index.html');
});
app.get('/about.html', (req, res) => {
  res.sendFile('about.html');
});
app.get('/category.html', (req, res) => {
  res.sendFile('category.html');
});
app.get('/login.html', (req,res) => {
  res.sendFile('login.html');
})
app.get('/signup.html', (req,res) => {
  res.sendFile('signup.html');
})

app.listen(PORT, () => console.log(`Running on ${PORT}`));