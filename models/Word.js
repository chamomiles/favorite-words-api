const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    word: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Word', WordSchema)