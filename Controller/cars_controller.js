const mongoose = require("mongoose");
//const Cars = mongoose.model("car");//process.env.Car_MODEL
const Cars = require("../Data_Model/Model/CarsSchema.js");




module.exports.getAll = function (req, res) {

    const s = async () => {
        const Data = await Cars.find().exec();
        //function (err, Data) {
        console.log("Found Data", Data.length);
        res.json(Data);

    }
    s();
}
