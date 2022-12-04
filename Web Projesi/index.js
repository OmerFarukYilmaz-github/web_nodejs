const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user.js');
const categoryRoute = require("./routes/category");
const gameRoute = require("./routes/game");
const app = express();


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/game', gameRoute);

module.exports = app;
