const mongoose = require("mongoose");

const EditionSchema = mongoose.Schema({
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