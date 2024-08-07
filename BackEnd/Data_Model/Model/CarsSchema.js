require("dotenv").config();
const mongoose = require("mongoose");

//const EditionSchema = require("./EditionsSchema.js");
console.log("Schema");
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


mongoose.model(process.env.Car_MODEL, CarsSchema, process.env.Carscollection);

