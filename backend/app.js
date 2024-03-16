const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config({ path: './.env' });



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const verifyRouter = require('./routes/verify');
const eventCreate = require('./routes/eventCreate')
const logout = require('./routes/logout')
const googleAuth = require('./api/googleAuth')
const forget = require('./routes/forgetPassword')
const reset = require('./routes/resetPassword')
const myEventAdmin = require('./routes/myEventAdmin')



const app = express();
const bodyParser = require('body-parser');
const session = require('cookie-session');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Avishkar');
  console.log("Connected to data base")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();


app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret: "aryankesharwani"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(user,done){
  done(null,user);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
  // allowedHeaders:'*',
  methods:"GET,POST,PUT,DELETE"
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/verify',verifyRouter);
app.use('/createEvent',eventCreate)
app.use('/logout',logout);
app.use('/api',googleAuth);
app.use('/forgetPassword',forget);
app.use('/resetPassword',reset);
app.use('/myEventAdmin',myEventAdmin)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
