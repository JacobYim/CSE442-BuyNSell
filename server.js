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
  var email = req.body['email'];
  var password = req.body['password'];
  if ((email != '' && email != ' ' && !email.includes(';') && !email.includes('=') && email.includes('@') && email.includes('.')) && 
      (password != '' && password != ' ' && !password.includes(';') && !password.includes('.') && !password.includes('=') && !password.includes('(') && !password.includes(')')&& !password.includes("'"))){
    db.query('SELECT * FROM user_profile where email=\''+email+'\' and password=\'' + password + '\'', function (err, rows, fields) {
      console.log(rows);
      if (!err) {
          // console.log(rows)
          if (rows.rowCount ==1 ) {
              res.send('Congrate!! Login Success!!');
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
  }else{
    res.send('invalid input')
  }
});

app.get('/signup.html', (req,res) => {
  res.sendFile('signup.html');
});
app.post('/signup.html', (req,res) => {
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
          } else {
          res.send('err : ' + err);
      }
    });
  }else{
    res.send('wrong approach');
  }
});

function passwordHasher(unsecure_password) {
  var secure_password = passwordHash.generate(unsecure_password);
  console.log("!!!Password is now secure!!!")
  //console.log("Hashed Passowrd = ",secure_password)

  return secure_password
}

//verify funtion for later
// function passwordValidater(userPassowrd) {
//   passwordHash = require('./lib/password-hash');

//   var hashedPassword = passwordHash.generate(userPassowrd)
//   var postgreHashedPassword = 'USER_PASSWORD_FROM_POSTGRE';   //need postgre lookup
  
//   if (passwordHash.isHashed(hashedPassword)) {
//     console.log('password hashed...')
//     console.log('password_VERIFIED = ', passwordHash.verify(hashedPassword, postgreHashedPassword));
//   } else {
//     console.log('PASSWORD NOT HASHED...')
//     console.log('password_VERIFIED = ', passwordHash.verify(hashedPassword, postgreHashedPassword)); 
//   }
// }


app.listen(PORT, () => console.log(`Running on ${PORT}`));