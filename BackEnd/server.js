require("dotenv").config();
require("./Data_Model/Database_Con/Car_DB.js");
const cors = require('cors');
const express = require("express");
const Car_Route = require("./App_Cars/Car_Router.js");
const Edition_Route = require("./App_Editions/Edition_Router.js");
const User_Route = require("./App_Users/User_Router.js");



const app = express();

const corsOptions = {
    origin: process.env.FrontEndURL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
//corsOptions
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(process.env.MainSubSetUrl + process.env.CarsSubSetUrl, Car_Route);
app.use(process.env.MainSubSetUrl + process.env.CarSubSetUrl, Edition_Route);
app.use(process.env.MainSubSetUrl + process.env.UserSubSetUrl, User_Route);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});