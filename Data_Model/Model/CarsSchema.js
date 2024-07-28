const mongoose = require("mongoose");

const CarsSchema = mongoose.Schema({
    Make: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true,
        min: 1885,
        max: new Date().getFullYear() + 1
    },
    Editions: [EditionSchema]
})