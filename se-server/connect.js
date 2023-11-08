const mongoAPI = require("mongoose");
//const localDB = "mongodb://127.0.0.1:27017/ZemeApp";
//const localDB = "mongodb://localhost:27017/bookAppDB";
const localDB = "mongodb+srv://SEPROJECT:SEPROJECT@cluster0.oupzjoh.mongodb.net/";

const connectDB = async () => {
    await mongoAPI.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
}
module.exports = connectDB;