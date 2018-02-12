'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PadSchema = new Schema({
    title: String,
    author: String,
    category: String,
    // published: {
    //     type: Date,
    //     default: Date.now,
    //     unique: true
    // },
    // keywords: Array,
    // published: Boolean,
    // author: {
    //     type: Schema.ObjectId,
    //     ref: 'User'
    // },
    // // Embedded sub-doc
    // detail: {
    //     modelNumber: Number,
    //     hardcover: Boolean,
    //     reviews: Number,
    //     rank: Number
    // }
})

module.exports = mongoose.model('Pad', PadSchema)

