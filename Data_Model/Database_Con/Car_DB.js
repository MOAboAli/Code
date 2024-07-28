require("dotenv").config();
const mongoose = require("mongoose");





mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to " + process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error " + err);
});


function gracefulExit(signal) {
    console.log(`Received ${signal}. Closing MongoDB connection...`);
    mongoose.connection.close(function (err) {
        if (err) {
            console.log(`Error during Mongoose disconnection: ${err}`);
        } else {
            console.log(`Mongoose disconnected due to ${signal}`);
        }
        console.log(process.env[`${signal}_MESSAGE`]);
        process.exit(0);
    });
}


function debugSignalHandlers() {
    console.log("Setting up signal handlers...");
    process.on("SIGINT", function () {
        console.log("SIGINT received");
        gracefulExit("SIGINT");
    });

    process.on("SIGTERM", function () {
        console.log("SIGTERM received");
        gracefulExit("SIGTERM");
    });

    process.once("SIGUSR2", function () {
        console.log("SIGUSR2 received");
        mongoose.connection.close(function (err) {
            if (err) {
                console.log(`Error during Mongoose disconnection: ${err}`);
            } else {
                console.log("Mongoose disconnected due to SIGUSR2");
            }
            console.log(process.env.SIGUSR2_MESSAGE);
            process.kill(process.pid, "SIGUSR2");
        });
    });
}


debugSignalHandlers();



// process.on("SIGINT", function () {
//     gracefulExit("SIGINT");
// });

// process.on("SIGTERM", function () {
//     gracefulExit("SIGTERM");
// });

// process.once("SIGUSR2", function () {
//     console.log("Received SIGUSR2. Closing MongoDB connection.");
//     mongoose.connection.close(function () {
//         console.log(process.env.SIGUSR2_MESSAGE);
//         process.kill(process.pid, "SIGUSR2");
//     });
// });