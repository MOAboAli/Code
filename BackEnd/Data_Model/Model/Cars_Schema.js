require("dotenv").config();
const mongoose = require("mongoose");

//const EditionSchema = require("./EditionsSchema.js");
console.log("Schema");
const EditionSchema = mongoose.Schema({
    imageUrl: String,
    Name: {
        type: String,
        required: false
    },
    Features: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: false
    }
}, { _id: false });

const CarsSchema = mongoose.Schema({

    imageUrl: String,
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
}, { _id: true });


mongoose.model(process.env.Car_MODEL, CarsSchema, process.env.Carscollection);

