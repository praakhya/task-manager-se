const mongoAPI = require("mongoose");
const localDB = "mongodb://127.0.0.1:27017/ZemeApp";
//const localDB = "mongodb://localhost:27017/bookAppDB";
//const localDB = "mongodb+srv://pmongodb:pmongodb123@cluster0.9xjds62.mongodb.net/bookAppDB?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoAPI.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
}
module.exports = connectDB;