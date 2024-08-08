require("dotenv").config();
require("./Data_Model/Database_Con/Car_DB.js")
const express = require("express");
const path = require('path');
const car_route = require("./App_Cars/Car_Router.js");




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", car_route);


const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});