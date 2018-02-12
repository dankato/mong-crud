const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pad = require('./pad-model');

const db = 'mongodb://localhost/example';

mongoose.connect(db);


const port = 8080;

app.listen(port, function() {
    console.log('Server listing on port', port);
})