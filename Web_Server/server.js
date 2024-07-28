require("dotenv").config();
const express = require("express");
const path = require('path');
const car_route = require("../Web_Server/Router/car_router.js");
const Edition_route = require("../Web_Server/Router/Editions_router.js");
require("../Data_Model/Database_Con/Car_DB.js")



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", car_route);
// app.use("/api/cars/:id/Editions", (req, res, next) => {
//     req.carId = req.params.id; // Store the id in a custom property
//     next();
// }, Edition_route);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});