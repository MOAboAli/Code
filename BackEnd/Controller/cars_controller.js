const mongoose = require("mongoose");
const Cars = mongoose.model("car");
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;









// Get Operations

const getAllitemCallbackified = callbackify(function (dataCollection) {
    return dataCollection.find();
});
module.exports.getAllitems = function (req, res) {
    getAllitemCallbackified(Cars, function (err, Data) {
        if (err) { res.status(500).json({ error: err }); }
        else { res.status(200).json(Data); }
    });
}


const getOneitemCallbackified = callbackify(function (dataCollection, query) {
    return dataCollection.findOne(query);
});
module.exports.getgetOneitembyid = function (req, res) {
    getOneitemCallbackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) { res.status(500).json({ error: err }); }
        else { res.status(200).json(Data); }
    });

}


// Post Operations

const createitembackified = callbackify((dataCollection, data) => {
    return dataCollection.create(data);
});
exports.createitem = function (req, res) {

    console.log(req.body);
    const Newitem = {
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year

    };

    try {
        createitembackified(Cars, Newitem, function (err, response) {
            if (err) { res.status(500).json({ error: err }); }
            else { res.status(201).json(response); }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


//Delete Operations

const deleteOneitemCallbackified = callbackify(function (dataCollection, query) {
    return dataCollection.findByIdAndDelete(query);
});
module.exports.deletegetOneitembyid = function (req, res) {
    deleteOneitemCallbackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) { res.status(500).json({ error: err }); }
        else { res.status(200).json({ message: "Item Deleted" }); }
    });

}


// Update Operations


const fullupdateitembackified = callbackify((dataCollection, query, data, overwriteV) => {
    return dataCollection.findByIdAndUpdate(query, data, { new: true, overwrite: overwriteV });
});
exports.fullupdateeitem = function (req, res) {

    let item = new Cars;
    getOneitemCallbackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) {
            res.status(500).json({ error: err });
        }
        else {


            const Newitem = {
                ...req.body,
                Editions: Data.Editions
            };

            try {
                fullupdateitembackified(Cars, { _id: new ObjectId(req.params.id) }, Newitem, true, function (err, response) {
                    if (err) { res.status(500).json({ error: err }); }
                    else { res.status(201).json(response); }
                });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }




        }
    });


}


exports.partialupdateeitem = function (req, res) {
    try {
        fullupdateitembackified(Cars, { _id: new ObjectId(req.params.id) }, { $set: req.body }, false, function (err, response) {
            if (err) { res.status(500).json({ error: err }); }
            else { res.status(201).json(response); }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

