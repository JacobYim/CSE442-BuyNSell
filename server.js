'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// postgreSQL 
const { Client } = require('pg')
const client = new Client({
  host: 'localhost', // server name or IP address;
  user: 'postgres',
  database: 'buynsell',
  password: 'password',
  port: 5432,
})
client.connect()

client.query('SELECT version()', (err, {rows}) => {
  console.log(err, rows[0].version)
})

client.query('SELECT * FROM user_profile;', (err, {rows}) => {
  console.log(err, rows)
})

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