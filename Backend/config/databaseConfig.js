const mongoose = require("mongoose");

let dbConnection = () => {
    return mongoose.connect("mongodb+srv://litondata:MongoDB01766@testcluster.yvhccxb.mongodb.net/Todo?appName=TestCluster").then(() => {
        console.log("Database Connected");
    }).catch((err) => {
        console.error("Database connection error:", err);
    });
}

module.exports = dbConnection;

