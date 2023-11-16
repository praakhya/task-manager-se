const { ObjectId } = require("mongodb");
const ToDo = require("./Models/ToDo");

exports.getToDo = async (req,res) => {
    try {
        var headers = req.get("Authorization").split(";")
        var accessToken = headers[0].split("=")[1]
        var username = headers[1].split("=")[1]
        if (accessToken) {
            const todo = await ToDo.find({"username":username});
        //console.log("In load: ",books);
            const newtodo=[]
            for (var i in todo) {
                var t={}
                t = {"_id":todo[i]._id.toHexString(), "title":todo[i].title, "description":todo[i].description, "done":todo[i].done, "trashed":todo[i].trashed, "username":todo[i].username}
                newtodo.push(t)
                console.log("converted: ",newtodo)
            }
            return res.status(200).json(newtodo)
        }
    }
    catch(err) {
        console.log("error getToDo: ", err);
        res.status(404).json({
            message: "Page load incomplete: GET Books unsuccessful"
        })
    }
};

exports.addToDo = async (req,res) => {
    var headers = req.get("Authorization").split(";")
    var accessToken = headers[0].split("=")[1]
    var username = headers[1].split("=")[1]
    if (accessToken) {
    console.log("Final url is ", req.originalUrl)
    var todo = new ToDo({
        title:req.body.title,
        description:req.body.description,
        done: false,
        trashed: false,
        username: username
    })
    console.log("created todo: ",todo);
    try {
        console.log(todo)
        todo = await ToDo.create(todo)
        //console.log("returned: ",todo)
        res.status(200).json(todo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo addition unsuccessful",
            error: err.message
        })
    }
}
}
exports.completeToDo = async (req,res) => {
    var headers = req.get("Authorization").split(";")
    var accessToken = headers[0].split("=")[1]
    var username = headers[1].split("=")[1]
    //console.log("Final url is ", req.originalUrl)
    //console.log("_id",req.params.id)
    if (accessToken) {
        var todo = new ToDo({
            _id:req.body._id,
            done: req.body.done
        })
        //console.log("updation todo: ",todo);
        try {
            console.log("complete: ",todo)
            var oldtodo = await ToDo.updateOne({_id: todo._id, username:username}, {done: todo.done})
            console.log("update status: ",oldtodo)
            var newtodo= await ToDo.findOne({_id: todo._id}).exec()
            console.log("new to do: ",newtodo)
            newtodo = {"title":newtodo.title, "description":newtodo.description, "done":newtodo.done, "_id":newtodo._id.toHexString(), "trashed":newtodo.trashed}
            //console.log("returned: ",todo)
            res.status(200).json(newtodo)
        } 
        catch (err) {
            console.log("error:",err)
            res.status(409).json({
                message: "ToDo update unsuccessful",
                error: err.message
            })
        }
    }
}

exports.updateToDo = async (req,res) => {
    //console.log("Final url is ", req.originalUrl)
    //console.log("_id",req.params.id)
    var headers = req.get("Authorization").split(";")
    var accessToken = headers[0].split("=")[1]
    var username = headers[1].split("=")[1]
    if (accessToken) {
    console.log("req body: ",req.body)
    var todo={}
    if (req.body.label=="title") {
        todo = new ToDo({
            _id:req.body._id,
            title: req.body.title,
        })
    }
    else if (req.body.label=="description") {
        todo = new ToDo({
            _id:req.body._id,
            description: req.body.description,
        })
    }

    
    //console.log("updation todo: ",todo);
    try {
        console.log("update: ",todo)
        if (req.body.label=="title") {
            var oldtodo = await ToDo.updateOne({"_id": todo._id, "username":username}, {"title": todo.title})
        }
        else if (req.body.label=="description") {
            var oldtodo = await ToDo.updateOne({"_id": todo._id, "username":username}, {"description": todo.description})
        }
        console.log("update status: ",oldtodo)
        var newtodo= await ToDo.findOne({_id: todo._id}).exec()
        console.log("new to do: ",newtodo)
        newtodo = {"title":newtodo.title, "description":newtodo.description, "done":newtodo.done, "_id":newtodo._id.toHexString(), "trashed":newtodo.trashed, "username":username}
        //console.log("returned: ",todo)
        res.status(200).json(newtodo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo update unsuccessful",
            error: err.message
        })
    }
}
}

exports.deleteToDo = async(req, res) => {
    console.log("req body: ",req.body)
    var todo={}
    
    //console.log("updation todo: ",todo);
    try {
        console.log("update: ",todo)
        var oldtodo = await ToDo.findOne({"_id": req.body._id})
        var status = await ToDo.deleteOne({"_id": oldtodo._id})
        console.log("update status: ",status)
        console.log("delete to do: ",oldtodo)
        oldtodo = {"title":oldtodo.title, "description":oldtodo.description, "done":oldtodo.done, "_id":oldtodo._id.toHexString(), "trashed":true}
        //console.log("returned: ",todo)
        res.status(200).json(oldtodo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo update unsuccessful",
            error: err.message
        })
    }
}
exports.trashToDo = async(req, res) => {
    console.log("req body: ",req.body._id, req.body.trashed)
    
    //console.log("updation todo: ",todo);
    try {        
        var status = await ToDo.updateOne({"_id": req.body._id}, {"trashed":req.body.trashed});
        var newtodo = await ToDo.findOne({"_id": req.body._id})
        console.log("update status: ",status)
        console.log("trash to do: ",newtodo)
        newtodo = {"title":newtodo.title, "description":newtodo.description, "done":newtodo.done, "_id":newtodo._id.toHexString(), "trashed":newtodo.trashed}
        //console.log("returned: ",todo)
        res.status(200).json(newtodo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo update unsuccessful",
            error: err.message
        })
    }
}

exports.deleteAllToDo = async(req, res) => {
    try {
        var status = await ToDo.deleteMany({})
        console.log("update status: ",status)
        res.status(200).json(status)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo update unsuccessful",
            error: err.message
        })
    }
}
