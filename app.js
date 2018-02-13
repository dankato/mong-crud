const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pad = require('./pad-model');
const db = 'mongodb://localhost/example';
const port = 8080;

mongoose.connect(db);

// routes
app.get('/', function(req, res) {
    res.send('hi get');
})

app.get('/pads', function(req, res) {
    console.log('get everything.')
    Pad.find({})
        .exec(function(error, results) {
            if(error) {
                console.log('error occured')
                res.send('error occured')
            } else {
                console.log('results printed on page')
                res.json(results)
            }
        })
})

app.listen(port, function() {
    console.log('Server listing on port', port);
})