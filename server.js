'use strict';

const bodyParser = require('body-parser');
const express = require('express');
var passwordHash = require('password-hash');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({dest: 'public/uploads/'});
var items_path = multer({dest: 'public/items/'});
var fs = require('fs');

var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'ubbuynsell@gmail.com',
        pass: 'buynsellgmail'
    }
});


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

db.query('SELECT * FROM items;', (err, {rows}) => {
	console.log(err, rows);
})

db.query('SELECT * FROM categories;', (err, {rows}) => {
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
		db.query('SELECT fname FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
			if (!err && rows.rowCount != 0) {
				console.log(rows.rows[0].fname)
				res.render('index',{ username : rows.rows[0].fname})
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
		db.query('SELECT fname FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
			if (!err) {
				console.log(rows.rows[0].fname)
				res.render('index',{ username : rows.rows[0].fname})
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
	console.log(req.cookies.logses);
	if (req.cookies.logses != null) {
		console.log("cookie");
		db.query('SELECT fname FROM user_profile where available = true AND password=\'' + req.cookies.logses + '\'', function (err, rows, fields) {
			if (!err) {
				console.log(rows.rows[0].fname)
				res.render('about', { username: rows.rows[0].fname })
			} else {
				res.render('about', { username: null })
			}
		});
	} else {
		res.render('about', { username: null })
	}
})

app.get('/category', function(req, res) {    //category.ejs
	res.redirect('/category/all/1');
});

app.get('/category/:category/:page', function(req, res) {    //category.ejs
	// getting the page parameter from the address
	var page = req.params.page;
	var cate = req.params.category;

	page = parseInt(page, 10);
	var size = 6;
	var begin = (page - 1 )*size;

	var cate_num;
	if (cate == 'all') {
		cate_num = 0
	}else if (cate == 'clothing'){
		cate_num = 1
	}else if (cate == 'electronics'){
		cate_num = 2
	}else if (cate == 'furnitures'){
		cate_num = 3
	}else if (cate == 'cars'){
		cate_num = 4
	}else{
		cate_num = 5
	}

	if (cate_num >= 5){
		res.send('error')
	}else{
		
	// getiing posting numbers from database
	if (cate_num == 0){
			db.query('SELECT COUNT (*) FROM items where availability = true;', function (err, row, fields) {
				var cnt = row.rows[0].count	// total number of item
				var totalPage = Math.ceil(cnt/size); // total page numbers
				var pageSize = 6;
				var startPage = Math.floor((page-1)/pageSize)*pageSize +1;
				var endPage = startPage + (pageSize - 1);
				if (endPage > totalPage){
					endPage = totalPage
				}
				
				db.query('SELECT item_id, item_name, price, description, file_path FROM items where availability = true ORDER BY time_post DESC LIMIT 6 OFFSET \''+begin +'\';', function (err, item, fields) {
					var data_item = item.rows;
					console.log(item.command)
					var datas = {
						pageSize : pageSize,
						startPage : startPage,
						endPage : endPage,
						totalPage : totalPage,
						current : page
					};
					console.log(datas);
					if (req.cookies.logses != null){
						console.log("cookie");
						db.query('SELECT fname FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
							if (!err) {
								console.log(rows.rows[0].fname)
								res.render('category', {items : data_item, username : rows.rows[0].fname, page_info : datas, category : cate_num})
							} else {
								res.render('category',{ items : data_item, username : null , page_info : datas , category : cate_num})
							}
						});
					} else {
						res.render('category',{ items : data_item, username : null , page_info : datas, category : cate_num})
					}
				});
			});
		}else{
			db.query('SELECT COUNT (*) FROM items where availability = true AND item_category = \''+cate_num +'\';', function (err, row, fields) {
				var cnt = row.rows[0].count	// total number of item
				var totalPage = Math.ceil(cnt/size); // total page numbers
				var pageSize = 6;
				var startPage = Math.floor((page-1)/pageSize)*pageSize +1;
				var endPage = startPage + (pageSize - 1);
				console.log(row)
				// res.send(row)
				if (endPage > totalPage){
					endPage = totalPage
				}
				
				db.query('SELECT item_id, item_name, price, description, file_path FROM items where availability = true AND item_category = \''+cate_num +'\' ORDER BY time_post DESC LIMIT 6 OFFSET \''+begin +'\';', function (err, item, fields) {
					var data_item = item.rows;
					console.log(item.command)
					var datas = {
						pageSize : pageSize,
						startPage : startPage,
						endPage : endPage,
						totalPage : totalPage,
						current : page
					};
					console.log(datas);
					if (req.cookies.logses != null){
						console.log("cookie");
						db.query('SELECT fname FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
							if (!err) {
								console.log(rows.rows[0].fname)
								res.render('category', {items : data_item, username : rows.rows[0].fname, page_info : datas, category : cate_num})
							} else {
								res.render('category',{ items : data_item, username : null , page_info : datas, category : cate_num})
							}
						});
					} else {
						res.render('category',{ items : data_item, username : null , page_info : datas, category : cate_num})
					}
				});
		
			});
		}
	}
	});


app.get('/product/:id', function(req, res) {    //product.ejs
	var item_id = req.params.id;
	var item_name = null;
	var price = null;
	var description = null;
	var file_path = null;
	var post_by = null;
	var time_post = null;
	db.query('SELECT item_id, item_name, price, description, file_path, post_by, time_post FROM items where availability = true AND item_id = '+item_id+';', function (err, item, fields) {
		var data_item = item.rows;
		console.log("data_item[0] is: "+data_item[0].item_name)
		console.log("item.command is: "+item.command)
		var datas = {
			item_id: data_item[0].item_id,
			item_name: data_item[0].item_name,
			price: data_item[0].price,
			description: data_item[0].description,
			file_path: data_item[0].file_path,
			post_by: data_item[0].post_by,
			time_post: data_item[0].time_post
		};
		console.log(datas);
		if (req.cookies.logses != null) {
			console.log("cookie");
			db.query('SELECT fname FROM user_profile where available = true AND password=\'' + req.cookies.logses + '\'', function (err, rows, fields) {
				if (!err) {
					console.log(rows.rows[0].fname)
					res.render('product', { item: datas, username: rows.rows[0].fname })
				} else {
					res.render('product', { item: datas, username: null })
				}
			});
		} else {
			res.render('product', { item: datas, username: null })
		}
	});
})

app.get('/login', function(req, res) {    //login.ejs
	res.clearCookie('logses');
	res.render('login')
})
app.get('/accountsettings', function(req, res) {    //accountsettings.ejs
	if (req.cookies.logses != null){
		console.log("cookie");
		db.query('SELECT * FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
			if (!err) {
				console.log(rows.rows[0])
				res.render('accountsettings',{ user : rows.rows[0]})
			} else {
				res.render('index',{ username : null })
			}
		});
	} else {
		res.render('index',{ username : null })
	}

})
app.get('/Dashboard', function(req, res) {    //Dashboard.ejs
	if (req.cookies.logses != null){
		console.log("cookie");
		db.query('SELECT * FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
			if (!err) {
				console.log(rows.rows[0])
				res.render('Dashboard',{ user : rows.rows[0]})
			} else {
				res.render('index',{ username : null })
			}
		});
	} else {
		res.render('index',{ username : null })
	}
})
app.get('/selling', function(req, res) {    //selling.ejs h
  res.render('selling')
})
app.get('/signup', function(req, res) {    //signup.ejs
	res.clearCookie('logses');
	res.render('signup')
})
app.get('/forgot_password', function(req, res) {    //forgotPassword.ejs
  res.clearCookie('logses');
  res.render('forgot_password')
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
		db.query('SELECT * FROM user_profile where available = true AND email=\''+email+'\'', function (err, rows, fields) {
			if (!err && rows.rowCount == 1) {
				console.log(rows)
				try{
					if (passwordHash.verify(password ,rows.rows[0].password)) {
						res.cookie("logses",rows.rows[0].password,{ maxAge: 60*60*1000,
							httpOnly: true,
							path:'/'});

						res.render('index',{ username : rows.rows[0].fname })
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

app.post('/forgot_password',(req, res) => {                                                                   //forgot password
                                                                                                              //need to access user's database with email
  var email = String(req.body['email']);
  console.log(email)

  var generator = require('generate-password');
  var password = generator.generate({
      length: 10,
      numbers: true
  });

  const mailOptions = {
    // from: 'sender@email.com', // sender address
    from: 'ubbuynsell@gmail.com', // sender address

    to: email.toString(), // list of receivers   //email recipient
    subject: 'Forgot Your Password :D', // Subject listen
    html: '<p>Stop Forgetting your password!\n</p></p> \npassword <img src="https://pbs.twimg.com/media/ClbAuJFUsAAV_s2.jpg" alt="Cheetah!" />'
    };
    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
         console.log(err)
       else
         console.log(info);
  });
  console.log(password)
  var hash_password = passwordHasher(password);
  console.log("Password is Secure......................."+hash_password)
  console.log(hash_password)
  db.query('SELECT * FROM user_profile where available = true AND email=\''+email+'\'', function (err, rows, fields) {
    // console.log(rows)
    if (!err && rows.rowCount == 1) {
        db.query('UPDATE user_profile SET password = \''+ hash_password +'\' WHERE user_id = \''+ rows.rows[0].user_id +'\'AND available = true;', function (err1, rows1, fields1) {
          // console.log(rows1)
          const mailOptions = {
            // from: 'sender@email.com', // sender address
            from: 'ubbuynsell@gmail.com', // sender address

            to: email, // list of receivers   //email recipient
            subject: 'Subject of your email', // Subject listen
            html: '<p>Stop Forgetting your password!</p> <p>Password:</p>'+password+'<img src="https://pbs.twimg.com/media/ClbAuJFUsAAV_s2.jpg" alt="Cheetah!" />'
            };
            transporter.sendMail(mailOptions, function (err, info) {
               if(err)
                 console.log(err)
               else
                 console.log(info);
          });
          res.render('login');
        });
    }else{
      res.redirect('/wrongapproach');
    }
  });

});

app.post('/signup', upload.any(),(req,res) => {
  console.log(req.files.length != 0);  // checking image is inputted or not
  var fname = String(req.body['name']);
  var lname = String(req.body['inputLastName']);
  var ubid = String(req.body['ubid']);
  var email = String(req.body['email']);
  var password = String(req.body['password']);
  var address1 = String(req.body['Address']);
  var address2 = String(req.body['Address2']);
  var city = String(req.body['City']);
  var zip = String(req.body['Zip']);
  var state = String(req.body['State']);

  var file;
  if (req.files.length != 0){
  	file = "/uploads/"+req.files[0].filename;
  }else{
  	file = null;
  }
  console.log("Typed :",fname, lname, email, password,ubid, address1, city, zip);

  if ((fname != '' && fname != ' ' && !fname.includes(';') && !fname.includes('.')&& !fname.includes('=')) &&
  	  (lname != '' && lname != ' ' && !lname.includes(';') && !lname.includes('.')&& !lname.includes('=')) &&
  	  (email != '' && email != ' ' && !email.includes(';') && !email.includes('=') && email.includes('@') && email.includes('.')) &&
  	  (password != '' && password != ' ' && !password.includes(';') && !password.includes('.') && !password.includes('=')) &&
  	  (ubid != '' && ubid != ' ' && ubid.length == 8 && !ubid.includes(';') && !ubid.includes('='))){


    // secures password here
    password = passwordHasher(password);
    console.log("Password is Secure......................."+password)
    db.query('insert into user_profile(fname, lname, ubid, email, password, address1, address2, city, zip, states, file_path, available) values(\''+fname+'\',\''+lname+'\',\''+ubid+'\',\''+ email +'\',\''+ password +'\',\''+ address1 +'\',\''+ address2 +'\',\''+ city +'\',\''+ zip +'\',\''+ state +'\',\''+ file+ '\',\'' + "1" + '\')', function (err, rows, fields) {
      if (!err) {
          console.log(rows)
          res.cookie("logses", password,{ maxAge: 60*60*1000,
            httpOnly: true,
            path:'/'});
          res.render('index',{ username : fname })
          console.log('signin success'+fname);

              //sign up email here                                                                                            //signup email here
              const mailOptions = {
                // from: 'sender@email.com', // sender address
                from: 'ubbuynsell@gmail.com', // sender address

                to: email, // list of receivers                            //email recipient
                subject: 'Subject of your email', // Subject listen                     //subject
                html: '<p>Thanks for signing up for BuyNSell!</p> <p>Now you can sell your stuff\n</p> <p>Make Some Money!!! \n</p> <img src="https://ci.memecdn.com/4341709.jpg" alt="Cheetah!" />'                      //html
                };
                transporter.sendMail(mailOptions, function (err, info) {
                   if(err)
                     console.log(err)
                   else
                     console.log(info);
                });

                  } else {
                  res.send('err : ' + err);
                }
    });
}else{
	res.send('wrong approach');
}
});

app.post('/change', upload.any(), (req,res) => {
	var fname = String(req.body['inputFirstName']);
	var lname = String(req.body['inputLastName']);
	var email = String(req.body['inputEmail4']);
	var password = String(req.body['inputPassword4']);
	var add1 = String(req.body['inputAddress']);
	var add2 = String(req.body['inputAddress2']);
	var city = String(req.body['inputCity']);
	var state = String(req.body['inputState']);
	var zip = String(req.body['inputZip']);
	var file;
	if (req.files.length != 0){
		file = "/uploads/"+req.files[0].filename;
	}else{
		file = null;
	}
	if (req.cookies.logses != null){
		console.log("cookie");
		db.query('SELECT * FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
			if (!err && rows.rowCount != 0) {
				var ubid = rows.rows[0].ubid;
				console.log("Typed :",fname, lname, email, password, rows.rows[0].ubid, add1, add2, city, state, zip);
				if (passwordHash.verify(password ,req.cookies.logses)) {
					console.log(rows.rows[0].fname)
					db.query('UPDATE user_profile SET fname = \''+ fname+'\', lname = \''+ lname +'\', email = \''+ email +'\', address1 = \''+add1 +'\', address2 = \''+ add2 +'\', city = \''+ city +'\', zip = \''+ zip +'\', file_path = \''+ file +'\' WHERE user_id = \''+ rows.rows[0].user_id +'\'AND available = true;', function (err1, rows1, fields1) {
						console.log(rows1)
					});
				}else{
					res.send('wrong password');
				}
			} else {
				res.render('index',{ username : null })
			}
		});
	}
	res.render('index',{ username : fname });
});

app.post('/help',(req,res) => {
	var contents = String(req.body['contents']);
	if (req.cookies.logses != null){
		console.log("cookie");
		db.query('SELECT * FROM user_profile where password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
			if (!err) {
				console.log(rows.rows[0].fname)
				console.log(contents);
				res.render('index',{ username : rows.rows[0].fname });
			} else {
				res.render('index',{ username : null })
			}
		});
	} else {
		res.render('index',{ username : null })
	}
});

app.get('/wrongapproach',(req, res) => {    //modifyPassword.ejs
	res.send('<script type="text/javascript">alert("오류발생");</script>');
});

app.get('/uploadForm', function(req, res) {    //uploadForm.ejs
	res.render('uploadForm')
})

app.post('/modifyPassword',(req, res) => {    //modifyPassword.ejs
  var oldPassword = String(req.body['oldPassword']);
  var newPassword = String(req.body['newPassword']);
  var newPassword2 = String(req.body['newPassword2']);

  if (newPassword == newPassword2){
    if (passwordHash.verify(oldPassword ,req.cookies.logses)) {
      db.query('SELECT * FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
        if (!err && rows.rowCount == 1) {
            var password = passwordHasher(newPassword);

            db.query('UPDATE user_profile SET password = \''+ password +'\' WHERE user_id = \''+ rows.rows[0].user_id +'\'AND available = true;', function (err1, rows1, fields1) {
              res.clearCookie('logses');
              console.log(rows1)
              res.render('login');
            });
        }else{
			res.redirect('/wrongapproach');
		}
	});
		}else{
			res.redirect('/wrongapproach');
		}
	}else{
		res.redirect('/wrongapproach');
	}
});

app.get('/forgot_password', (req, res) => {    //forgotPassword.ejs
  res.clearCookie('logses');
  res.render('forgot_password')
});

app.post('/forgot_password', (req, res) => {                                                                   //forgot password
  //need to access user's database with email
  var email = String(req.body['email']);
  var generator = require('generate-password');
  var password = generator.generate({
    length: 10,
    numbers: true});
	console.log(email)
  console.log(password)
  var hash_password = passwordHasher(password);
  console.log("Password is Secure......................."+hash_password)
  console.log(hash_password)
  db.query('SELECT * FROM user_profile where available = true AND email=\''+email+'\'', function (err, rows, fields) {
  // console.log(rows)
  if (!err && rows.rowCount == 1) {
  	db.query('UPDATE user_profile SET password = \''+ hash_password +'\' WHERE user_id = \''+ rows.rows[0].user_id +'\'AND available = true;', function (err1, rows1, fields1) {
			const mailOptions = {
				// from: 'sender@email.com', // sender address
				from: 'ubbuynsell@gmail.com', // sender address
				to: email, // list of receivers   //email recipient
				subject: 'Subject of your email', // Subject listen
				html: '<p>Stop Forgetting your password!</p> <p>Password:</p>'+password+'<img src="https://pbs.twimg.com/media/ClbAuJFUsAAV_s2.jpg" alt="Cheetah!" />'
			};
			transporter.sendMail(mailOptions, function (err, info) {
				if(err){
					console.log(err)
				}else{
					console.log(info);
				}
			});
    	res.render('login');
    });
    }else{
      res.redirect('/wrongapproach');
    }
  });
});

app.post('/uploadForm', items_path.any(),(req, res) => {
	console.log('form connected')
	var item_name = String(req.body['productName']);
	var description = String(req.body['productDescription']);
	var price = String(req.body['productPrice']);
	var category = String(req.body['productCategory']);
	var file = null;
	console.log(req.files);
	try{
		if (req.files.length != 0){
				file = "/items/"+req.files[0].filename;
				// file = "./items/"+category+"/"+req.files[0].filename;
		}
    else{
				file = null;
				console.log("Please insert an image!")
		}
	}
  catch(err){
			file = null;
	}
	 console.log("Typed :", item_name, description, price);
	 db.query('SELECT * FROM user_profile where available = true AND password=\''+req.cookies.logses +'\'', function (err, rows, fields) {
		if (!err && rows.rowCount == 1) {
			var user_id =rows.rows[0].user_id;
			var user= rows.rows[0];
			db.query('SELECT * FROM categories where category_name = \''+category +'\'', function (err, rows, fields) {
				if (!err && rows.rowCount == 1) {
					category = rows.rows[0].category_id;
					if (file != null){ 
					db.query('insert into items(item_name,description,price,post_by,item_category,file_path) values(\''+item_name+'\',\''+description+'\', \''+ price + '\',\''+user_id+ '\',\''+ category + '\',\''+file +'\')', function (err, rows, fields){
					if (!err) {
						console.log(rows)
						res.render('Dashboard', {user : user})
						console.log('item upload success '+ item_name);
					} 
					else {
						res.send('err : ' + err);
				}
					});
				}else{
					db.query('insert into items(item_name,description,price,post_by,item_category) values(\''+item_name+'\',\''+description+'\', \''+ price + '\',\''+user_id+ '\',\''+ category + '\')', function (err, rows, fields){
						if (!err) {
							console.log(rows)
							res.render('Dashboard', {user : user})
							console.log('item upload success '+ item_name);
						} 
						else {
							res.send('err : ' + err);
					}
						});
				}
				}
		});

		}else{
			res.redirect('/wrongapproach');
		}
	});
});


app.get('/cart', (req, res) => {    
  res.render('cart');
});

app.get('/message_to_seller', (req, res) => {
  res.render('message_to_seller');
});

 function passwordHasher(unsecure_password) {
 	var secure_password = passwordHash.generate(unsecure_password);
 	console.log(passwordHash.verify(unsecure_password, secure_password));
 	console.log("!!!Password is now secure!!!")
 	return secure_password
 }
 app.listen(PORT, () => console.log(`Running on ${PORT}`));
