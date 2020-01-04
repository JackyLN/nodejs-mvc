const express = require('express');
const path = require('path');
const app = express();

const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);

const port = 3000;

//Setup static path
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(express.static(path.join(__dirname, "dist")));

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jacky:qwerty123@cluster0-db-cgad8.gcp.mongodb.net/nodejsmvc?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.once('open', () => console.log('connected to database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Default path
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//user path
app.use(express.urlencoded({ extended: false })).use(express.json());
const userRouter = require('./src/controllers/UserController');
app.use('/user', userRouter);

//App Start
app.listen(port, () => console.log(`Example app listening on port ${port}!`))