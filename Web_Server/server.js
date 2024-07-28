require("dotenv").config();
const express = require("express");
const path = require('path');
const routes = require("./Router/router.js");
require("../Data_Model/Database_Con/Car_DB.js");



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on http://localhost:" + port);
});