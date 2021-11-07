const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

const port = process.env.PORT;

const mongoDb = process.env.MONGO_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const indexRoutes = require('./routes/index');

const app = express();

app.use('/', indexRoutes);

app.listen(port, () => console.log('api work'));