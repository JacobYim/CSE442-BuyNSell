'use strict';

const bodyParser = require('body-parser');                                                                     
const express = require('express');
const PORT = 8080;
const app = express();
// postgreSQL 
const { Client } = require('pg')
const db = new Client({
  host: 'localhost', // server name or IP address;
  user: 'postgres',
  database: 'buynsell',
  password: 'password',
  port: 5432,
})
db.connect();

db.query('SELECT version()', (err, {rows}) => {
  console.log(err, rows[0].version);
})

db.query('SELECT * FROM user_profile;', (err, {rows}) => {
  console.log(err, rows);
})

// App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
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
});

app.post('/login.html', (req,res) => {
  var userId = req.body['email'];
  var userPw = req.body['password'];
  db.query('SELECT * FROM user_profile where email=\''+userId+'\' and password=\'' + userPw + '\'', function (err, rows, fields) {
    console.log(rows);
    if (!err) {
        console.log(rows)
        if (rows.rowCount ==1 ) {
            res.send('Congrate!! Login Success!!' +
                  '\n id : ' + rows.rows[0]['email'] +
                  '\n pw : ' + rows.rows[0]['password']);
            // res.redirect('/');
        } else {
            res.send('Login Failure');
            // res.redirect('/');
        }
    } else {
        res.send('error : ' + err);
        // res.redirect('/');
    }
  });
});

app.get('/signup.html', (req,res) => {
  res.sendFile('signup.html');
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));