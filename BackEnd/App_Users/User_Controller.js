const mongoose = require("mongoose");
const Users = mongoose.model(process.env.User_MODEL);
const Response = require('../_Utilities/Responce.js');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



exports.registration = function (req, res) {
    const resd = new Response();
    CheckifUserFound(req.body, false)
        .then(() => { return CreatingUser(req.body) })
        .then((user) => resd.solvePromiseAndResponce(Users.create(user), res))
        .catch(error => {
            resd.Data = error;
            resd.statuscode = "500";
            resd.sendResponce(res);
        });
}

const CreatingUser = function (body) {
    return new Promise((resolve, reject) => {
        GenandHashingPassword(body.Password)
            .then((PassConfig) => { resolve({ ...body, ...PassConfig, Active: true }); })
            .catch(error => { reject(error) });
    });
}

const CheckifUserFound = function (body, Checkfound = true) {
    return new Promise((resolve, reject) => {
        Users.findOne({ Username: body.Username })
            .then((User) => {

                if (User && Checkfound)
                    resolve(User);
                else if (User && !Checkfound)
                    reject({ Error: "Error: Username Already Found." });
                else if (!User && Checkfound)
                    reject({ Error: "Error: Username Not Found." });
                else
                    resolve();

            })
            .catch(error => { reject({ Error: "Error: " + error.toString() }) });
    });
}

const GenandHashingPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
            .then((generatedSalt) => { return bcrypt.hash(password, generatedSalt) })
            .then((hashedPWD) => { resolve({ Password: hashedPWD }); })
            .catch(error => { reject({ Error: "Error: " + error.toString() }) });
    });
}

/////////////////////////

exports.authenticate = function (req, res) {
    const resd = new Response();
    CheckifUserFound(req.body)
        .then((User) => ValidateUser(req.body.Password, User.Password))
        .then(() => resd.solvePromiseAndResponce(CreateUserToken(req.body), res))
        .catch(error => {
            resd.Data = error;
            resd.statuscode = "500";
            resd.sendResponce(res);
        });
}

const CreateUserToken = function (Body) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ username: Body.Username }, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d' })
        if (token) {
            resolve(token)
        }
        else reject({ Error: "Error: " + error.toString() })
    })
}

const ValidateUser = function (UserPassword, HashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(UserPassword, HashedPassword)
            .then((result) => {
                if (result)
                    resolve();
                else
                    reject({ Error: "Error: Passwords doesn't not match. " })
            })
            .catch(error => { reject({ Error: "Error: " + error.toString() }) });

    });
}

/////////////////////////

exports.ValidateToken = function (req, res, next) {
    const resd = new Response();
    let Error = '';
    const token = req.headers["authorization"].split(" ")[1]
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if (decodedToken) {
            next();
        }
        else {
            Error = "Error: Your Token can't be verified.";
        }
    }
    else {
        Error = "Error: Token not found, operation abort.";
    }

    if (Error != '') {
        resd.Data = Error;
        resd.statuscode = "400";
        resd.sendResponce(res);
    }

}


