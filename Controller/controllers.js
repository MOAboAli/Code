require("dotenv").config();
const callbackify = require("util").callbackify;
const { error } = require("console");
const dbConnection = require("./dbconnection");
const ObjectId = require("mongodb").ObjectId;


dbConnection.open();


const findOneCallbackified = callbackify(function (gameCollection, query) {
  return gameCollection.findOne(query);
});

const findAllCallbackified = callbackify((gameCollection, offset, count) => {
  return gameCollection.find().skip(offset).limit(count).toArray();
});

const createGamebackified = callbackify((gameCollection, newGame) => {
  return gameCollection.insertOne(newGame);
});


const deleteGameCallbackified = callbackify((gameCollection, query) => {
  return gameCollection.deleteOne(query);
});



module.exports.getgamesbyid = function (req, res) {

  const db = dbConnection.get();
  const gameCollection = db.collection(process.env.gamecollection);

  findOneCallbackified(gameCollection, { _id: new ObjectId(req.params.id) }, function (err, games) {
    console.log("gameCollection");
    if (err) {
      res.status(500).json({ error: err });
    } else {
      console.log("Found games", games);
      res.status(200).json(games);
    }
  });

  // console.log("gameCollection");
}

module.exports.getgames = function (req, res) {
  const db = dbConnection.get();
  const gameCollection = db.collection(process.env.gamecollection);
  let count = 3;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (count > 7) {
    count = 7;
  }

  let offset = getRandomInt(gameCollection.count - count);


  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  findAllCallbackified(gameCollection, offset, count, function (err, games) {
    console.log("Found games", games);
    res.status(200).json(games);
  });
}

exports.createGame = function (req, res) {
  const db = dbConnection.get();
  const gameCollection = db.collection(process.env.gamecollection);
  console.log(req.body);
  const newGame = {
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    price: req.body.price,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    minAge: req.body.minAge
  };



  try {

    if (!newGame.title || newGame.title == "") {
      throw new Error("The Game must have a title.")
    }

    if (!newGame.price || newGame.price == "" || newGame.price == 0) {
      throw new Error("The Game must have a price.")
    }

    if (!newGame.minPlayers || newGame.minPlayers < 0 || newGame.minPlayers > 10) {
      throw new Error("The Game minPlayers must be between 1 and 10.")
    }

    if (!newGame.minAge || newGame.minAge < 7 || newGame.minAge > 99) {
      throw new Error("The Game minAge must be between 7 and 99.")
    }

    createGamebackified(newGame, function (err, response) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log(response);
        res.status(201).json(response);
      }
    });


  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGame = function (req, res) {

  const db = dbConnection.get();
  const gameCollection = db.collection(process.env.gamecollection);

  try {

    deleteGameCallbackified({ _id: new ObjectId(req.params.id) }, function (err, response) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else if (response.deletedCount === 0) {
        res.status(404).json({ message: 'Game not found' });
      } else {
        res.status(200).json({ message: 'Game deleted' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



