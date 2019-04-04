'use strict';

const bodyParser = require('body-parser');
const express = require('express');
var passwordHash = require('password-hash');
var cookieParser = require('cookie-parser');

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
app.use(cookieParser());

//routing engine
app.set('view engine', 'ejs')

//page routes
app.get('/', function(req, res) {               //initial page
  console.log(req.cookies.logses);
  if (req.cookies.logses != null){
    console.log("cookie");
    db.query('SELECT username FROM user_profile where password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
      if (!err) {
          console.log(rows.rows[0].username)
          res.render('index',{ username : rows.rows[0].username})
      } else {
          res.render('index',{ username : null })
      }
    });
  } else {
    res.render('index',{ username : null })
  }
})
app.get('/index', function(req, res) {    //index.ejs
  console.log(req.cookies.logses);
  if (req.cookies.logses != null){
    console.log("cookie");
    db.query('SELECT username FROM user_profile where password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
      if (!err) {
          console.log(rows.rows[0].username)
          res.render('index',{ username : rows.rows[0].username})
      } else {
          res.render('index',{ username : null })
      }
    });
  } else {
    res.render('index',{ username : null })
  }
})

app.get('/logout', function(req, res) {    //index.ejs
  res.clearCookie('logses');
  res.render('index',{ username : null })
})

app.get('/about', function(req, res) {    //index.ejs
  res.render('about')
})
app.get('/category', function(req, res) {    //category.ejs
  res.render('category')
})
app.get('/login', function(req, res) {    //login.ejs
  res.render('login')
})
app.get('/accountsettings', function(req, res) {    //accountsettings.ejs
  res.render('accountsettings')
})
app.get('/Dashboard', function(req, res) {    //Dashboard.ejs
  res.render('Dashboard')
})
app.get('/signup', function(req, res) {    //signup.ejs
  res.render('signup')
})
app.get('/modifyPassword', function(req, res) {    //modifyPassword.ejs
  res.render('modifyPassword')
})
app.get('/changeUBIT', function(req, res) {    //changeUBIT.ejs
  res.render('changeUBIT')
})

app.post('/login', (req,res) => {
  var email = String(req.body['email']);
  var password = String(req.body['password']);
  if ((email != '' && email != ' ' && !email.includes(';') && !email.includes('=') && email.includes('@') && email.includes('.') && !email.includes("'" && !email.includes(';'))) &&
      (password != '' && password != ' ' && !password.includes(';') && !password.includes('.') && !password.includes('=') && !password.includes('(') && !password.includes(')')&& !password.includes("'"))){
      db.query('SELECT * FROM user_profile where email=\''+email+'\'', function (err, rows, fields) {
      if (!err) {
          console.log(rows.rows[0])
          try{
            if (passwordHash.verify(password ,rows.rows[0].password)) {
              res.cookie("logses",rows.rows[0].password,{ maxAge: 60*60*1000,
                httpOnly: true,
                path:'/'});

                res.render('index',{ username : rows.rows[0].username })
            } else {
                res.send('Login Failure');
            }
          }catch(err){
            res.send('user is not exist'+err)
          }
      } else {
          res.send('error : ' + err);
      }
    });
  }else{
    res.send('invalid input')
  }
});


app.get('/signup', (req,res) => {
  res.render('signup');
});

app.post('/signup', (req,res) => {
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

function passwordHasher(unsecure_password) {
  var secure_password = passwordHash.generate(unsecure_password);
  console.log(passwordHash.verify(unsecure_password, secure_password));
  console.log("!!!Password is now secure!!!")
  return secure_password
}

app.listen(PORT, () => console.log(`Running on ${PORT}`));
