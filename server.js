'use strict';

const bodyParser = require('body-parser');                                                                     
const express = require('express');
var passwordHash = require('password-hash');
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
// db.connect();

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

//routing engine
app.set('view engine', 'ejs')

//page routes
app.get('/', function(req, res) {               //initial page
     res.render('index')
})
app.get('/index', function(req, res) {    //index.ejs
    res.render('index') 
})
app.get('/about', function(req, res) {    //index.ejs
  res.render('about') 
})
app.get('/category', function(req, res) {    //index.ejs
  res.render('category') 
})
app.get('/login', function(req, res) {    //index.ejs
  res.render('login') 
})


// app.get('/index.html', (req, res) => {
//   res.sendFile('index.html');
// });
// app.get('/about.html', (req, res) => {
//   res.sendFile('about.html');
// });
// app.get('/category.html', (req, res) => {
//   res.sendFile('category.html');
// });
// app.get('/login.html', (req,res) => {
//   res.sendFile('login.html');
// });

app.post('/login', (req,res) => {
  var email = String(req.body['email']);
  var password = String(req.body['password']);
  if ((email != '' && email != ' ' && !email.includes(';') && !email.includes('=') && email.includes('@') && email.includes('.') && !email.includes("'" && !email.includes(';'))) && 
      (password != '' && password != ' ' && !password.includes(';') && !password.includes('.') && !password.includes('=') && !password.includes('(') && !password.includes(')')&& !password.includes("'"))){
      db.query('SELECT password FROM user_profile where email=\''+email+'\'', function (err, rows, fields) {
      if (!err) {
          console.log(rows)
          try{
            if (passwordHash.verify(password ,rows.rows[0].password)) {
                res.send('Login Success!!');
                // res.redirect('/');
            } else {
                res.send('Login Failure');
                // res.redirect('/');
            }
          }catch(err){
            res.send('user is not exist')

          }
      } else {
          res.send('error : ' + err);
          // res.redirect('/');
      }
    }); 
  }else{
    res.send('invalid input')
  }
});

app.get('/signup', (req,res) => {
  res.sendFile('signup');
});
app.post('/signup.', (req,res) => {
  var userId = String(req.body['name']);
  var email = String(req.body['email']);
  var password = String(req.body['password']);
  var ubid = String(req.body['ubid']);

  console.log("Typed :",userId, email, password,ubid);
  if ((userId != '' && userId != ' ' && !userId.includes(';') && !userId.includes('.')&& !userId.includes('=')) &&
      (email != '' && email != ' ' && !email.includes(';') && !email.includes('=') && email.includes('@') && email.includes('.')) && 
      (password != '' && password != ' ' && !password.includes(';') && !password.includes('.') && !password.includes('=')) &&
      (ubid != '' && ubid != ' ' && ubid.length == 8 && !ubid.includes(';') && !ubid.includes('='))){
    
    
    // secures password here
    password = passwordHasher(password);
    console.log("Password is Secure......................."+password)
    db.query('insert into user_profile(ubid, email, username, password) values(\''+ubid+'\',\''+email+'\',\''+userId+'\',\''+password+'\')', function (err, rows, fields) {
      if (!err) {
          console.log(rows)
          res.send('success');
          console.log('signin success'+userId);
          } else {
          res.send('err : ' + err);
      }
    });
  }else{
    res.send('wrong approach');
  }
});

// function passwordHasher(unsecure_password) {
//   var secure_password = passwordHash.generate(unsecure_password);
//   console.log(passwordHash.verify(unsecure_password, secure_password));
//   console.log("!!!Password is now secure!!!")
//   return secure_password
// }

app.listen(PORT, () => console.log(`Running on ${PORT}`));