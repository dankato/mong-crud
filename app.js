const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pad = require('./pad-model');
const db = 'mongodb://localhost/example';
const port = 8080;

mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// routes
// app.get('/', function(req, res) {
//     res.send('hi get');
// })

// get all
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

// get one
app.get('/pads/:id', function(req, res) {
    console.log('get one item')
    Pad.findOne({
        _id: req.params.id
    })
    .exec(function(error, result) {
        if(error){
            res.send('error occured')
        } else {
            console.log(result)
            res.json(result)
        }
    })
})

// add one
app.post('/pad', function(req, res) {
    const newPad = new Pad()
    newPad.title = req.body.title
    newPad.author = req.body.author
    newPad.category = req.body.category
    newPad.save(function(error, result) {
        if(error) {
            res.send('error on send')
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

// simplified, less error prone version of above
app.post('/pad2', function(req, res) {
    Pad.create(req.body, function(error, result) {
        if(error) {
            res.send('error on send')
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

// update item's 'title
app.put('/pad/:id', function(req, res) {
    Pad.findOneAndUpdate({
        _id: req.params.id
    }, 
    {$set: {title: req.body.title}}, 
    {upsert: true}, 
        function(error, result) {
            if(error) {
                console.log('error occured')
            } else {
                console.log(result)
                // res.send(result)
                res.sendStatus(204)
            }
    })
})

// delete item
app.delete('/pad/:id', function(req, res) {
    Pad.findOneAndRemove({
        _id: req.params.id
    }, function(error, result) {
        if(error) {
            res.send('error occured')
        } else {
            console.log(result)
            res.status(204)
        }
    })
})

app.listen(port, function() {
    console.log('Server listing on port', port);
})