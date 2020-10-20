const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require("body-parser");
const db = require("./web-task-1/config/db");
const routes = require('./web-task-1/app/routes/routes')

const app = express();
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(routes);

const port = 8000;

async function start() {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useFindAndModify: false
    });

    app.listen(port, () => {
      console.log(`We are live on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

// require("./web-task-1/app/routes")(app, {});
// app.use(bodyParser.urlencoded({ extended: true }));

// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err);

//   console.log(database.db.collection('news'));
//   require("./web-task-1/app/routes")(app, database);

// }, { useUnifiedTopology: true } );
