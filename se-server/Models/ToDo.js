const mongoDB = require("mongoose");
const schema = new mongoDB.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    done: {
        type: Boolean
    },
    trashed: {
        type: Boolean
    },
    username: {
        type: String
    }
})
const ToDo = mongoDB.model("ToDo", schema, "ToDo");
module.exports = ToDo;