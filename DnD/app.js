const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const app = express();
const sKit = require('./modules/sKit.js');
const Kits = require('./models/kits');
const bodyParser = require('body-parser');

app.use(express.static("client"));
app.use(bodyParser.json());
app.set('views', './client/ejs');
app.set('view engine', 'ejs');

const connectionString = 'mongodb+srv://user:secret.password@node.ixftk.mongodb.net/DnD?retryWrites=true&w=majority'
mongoose.connect(connectionString);

const server = http.createServer(app);
server.listen(3000);

app.get("/" , function(req, res) {
  res.render("main.ejs");
})

app.get("/cal" , function(req, res) {
  res.render("cal.ejs");
})

app.get("/api/kits", async function (req, res) {
  await Kits.find({}, async function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc.toString())
      res.send(doc);
    }
  }).clone()
})

app.post("/api/kit", async function (req, res) {
  const kit = req.body.kit;
  console.log(kit)
  try {
    res.send(await sKit(kit))
  } catch (error) {
    if (error.code === 11000) {
      console.log('Kit Already exists. App v-')
    }
    
  }
 
})



/* app.get("/sign", function(req, res) {
  res.render("sign.ejs");
})

app.get("/login", function(req, res) {
  res.render("login.ejs");
})

app.post("/api/login", async function(req, res) {

})

app.post("/api/sign", async function(req, res) {
  try {
    res.send(await sPlayer(req.body.name))
  } catch (error) {
    console.log(error.message)
  }
  console.log('signed')
}) */