const express = require('express')
const path = require("path");
const app = express();
var bodyParser = require('body-parser');
urlencodedParser = bodyParser.urlencoded({
	extended: false
})
app.use(urlencodedParser)

app.use((req, res, next) => {
  console.log("url", req.url, req.method, req.get('accept'))
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", require("./appRoute"))

// app.use(express.static(path.join(__dirname,"../se-project/build")))
app.use(express.static(path.join(__dirname,"./public")))
app.get("/*", (req, res) => {
  console.log("app.get(/*)") 
//  res.sendFile(path.join(__dirname, "../se-project", "build", "index.html")); 
  res.sendFile(path.join(__dirname, "public", "index.html")); 
});

const port = 8080
const connectDB = require("./connect");

const server = app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})
