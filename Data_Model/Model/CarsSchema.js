const mongoose = require("mongoose");

const EditionSchema = require("./EditionsSchema.js");

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

module.exports = mongoose.model("car", CarsSchema, "cars");
