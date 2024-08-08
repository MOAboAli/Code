require("dotenv").config();
require("./Data_Model/Database_Con/Car_DB.js")
const express = require("express");
const Car_Route = require("./App_Cars/Car_Router.js");
const Edition_Route = require("./App_Editions/Edition_Router.js");




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", Car_Route);
app.use("/api/car", Edition_Route);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});