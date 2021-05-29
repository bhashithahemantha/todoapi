var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', indexRouter);
app.use('/todo', todoRouter);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbUser:Castiel001@cluster0.brkbv.mongodb.net/myFirstDatabase?authSource=admin&retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((err, db) => {
//   if(!err){
//     console.log('Connected to db successfully');
//   }

//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const uri = "mongodb+srv://dbUser:Castiel001@cluster0.brkbv.mongodb.net/myFirstDatabase?authSource=admin&retryWrites=true&w=majority";
const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}
mongoose.connect(uri, options, (error) => {
  if(!error){
    console.log('Connected to db successfully');
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
