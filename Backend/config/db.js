const mongoose = require("mongoose");
require('dotenv').config();
const ConnectToDB = async() =>{
    try {
        const connection = await mongoose.connect(process.env.MongoURL, {
        });
        console.log(`Connected to MongoDb: ${connection.connection.host}`.blue.bold)
    } catch (error) {
        console.log(`Error:${error.message}`.red.bold);
        process.exit();
    }

}
module.exports={ConnectToDB}