const mongoose = require("mongoose");
//const Cars = mongoose.model("car");//process.env.Car_MODEL
const Cars = require("../Data_Model/Model/CarsSchema.js");




module.exports.getAll = function (req, res) {

    const s = async () => {
        const Data = await Cars.find().exec();
        console.log("Found Data", Data.length);
        res.json(Data);

    }
    s();
}


module.exports.addOne = function (req, res) {

    const s = async () => {
        const Newitem = {
            Make: req.body.Make,
            Model: req.body.Model,
            Year: req.body.Year

        };
        await Cars.create(Newitem);
        const response = { status: 201, message: Newitem };
        res.status(response.status).json(response.message)
    }
    s();
}
