const mongoose = require("mongoose");
const Cars = require("../Data_Model/Model/CarsSchema.js");
const Editions = require("../Data_Model/Model/EditionsSchema.js");
const { log } = require("console");
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;


// Get Operations

const getAllitemCallbackified = callbackify(function (dataCollection, CarID) {
    return dataCollection.findById(CarID).select("Editions");
});
module.exports.getAllitems = function (req, res) {
    getAllitemCallbackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, Data) {
        if (err) { res.status(process.env.status_Code_server_error).json({ error: err }); }
        else { res.status(200).json(Data); }
    });
}


const getOneitemCallbackified = callbackify(function (dataCollection, CarID, query) {
    return dataCollection.findById(CarID).select("Editions").findOne(query);
});
module.exports.getgetOneitembyid = function (req, res) {
    getOneitemCallbackified(Cars, { _id: new ObjectId(req.params.id) }, { _id: new ObjectId(req.params.Editionsid) }, function (err, Data) {
        if (err) { res.status(process.env.status_Code_server_error).json({ error: err }); }
        else { res.status(200).json(Data); }
    });

}


// Post Operations

const finditembackified = callbackify((dataCollection, CarID) => {
    return dataCollection.findById(CarID).exec();//
});

const createitembackified = callbackify((item) => {
    return item.save();
});
exports.createitem = function (req, res) {

    const Newitem = {
        Name: req.body.Name,
        Features: req.body.Features,
        Description: req.body.Description

    };


    try {
        finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {
            if (err) { res.status(process.env.status_Code_server_error).json({ error: err }); }
            else if (!item) {
                return res.status(404).json({ message: 'Car not found' });
            }
            else {
                //console.log(item);

                item.Editions.push(Newitem);
                console.log(item.Editions);
                createitembackified(item, function (saveErr, updatedItem) {
                    if (saveErr) {
                        return res.status(process.env.status_Code_server_error).json({ error: saveErr });
                    }
                    res.status(201).json(updatedItem);
                });

            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}




//Delete Operations


module.exports.deletegetOneitembyid = function (req, res) {

    finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {
        if (err) { res.status(process.env.status_Code_server_error).json({ error: err }); }
        else if (!item) {
            return res.status(404).json({ message: 'Car not found' });
        }
        else {

            const editionIndex = item.Editions.findIndex(edition => edition._id.toString() === new ObjectId(req.params.Editionsid));
            item.Editions.splice(editionIndex, 1);
            createitembackified(item, function (saveErr, updatedItem) {
                if (saveErr) {
                    return res.status(process.env.status_Code_server_error).json({ error: saveErr });
                }
                res.status(201).json(updatedItem);
            });



        }
    });


}


// Update Operations

exports.fullupdateeitem = function (req, res) {

    finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {
        if (err) { res.status(process.env.status_Code_server_error).json({ error: err }); }
        else if (!item) {
            return res.status(404).json({ message: 'Car not found' });
        }
        else {
            const index = item.Editions.findIndex(edition => edition._id.toString() == req.params.Editionsid);
            if (index === -1) {
                return res.status(404).json({ message: 'Edition not found' });
            }
           
            item.Editions[index] = {
                ...item.Editions[index].toObject(), 
                ...req.body 
            };



            createitembackified(item, function (saveErr, updatedItem) {
                if (saveErr) {
                    return res.status(process.env.status_Code_server_error).json({ error: saveErr });
                }
                res.status(201).json(updatedItem);
            });



        }
    });





}

// exports.partialupdateeitem = function (req, res) {


//     finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {
//         if (err) { res.status(process.env.status_Code_server_error).json({ error: err }); }
//         else if (!item) {
//             return res.status(404).json({ message: 'Car not found' });
//         }
//         else {
//             const index = item.Editions.findIndex(edition => edition._id.toString() == req.params.Editionsid);
//             const oldObj = item.Editions[index];

//             item.Editions[index] = { ...oldObj, ...req.body };
//             createitembackified(item, function (saveErr, updatedItem) {
//                 if (saveErr) {
//                     return res.status(process.env.status_Code_server_error).json({ error: saveErr });
//                 }
//                 res.status(201).json(updatedItem);
//             });



//         }
//     });



   
// }


