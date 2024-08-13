require("dotenv").config();
const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({

    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean,
        required: true
    }
}, { _id: true });


mongoose.model(process.env.User_MODEL, UserSchema, process.env.Userscollection);
