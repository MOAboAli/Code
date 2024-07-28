const mongoose = require("mongoose");

module.exports.EditionSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Features: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    }
})