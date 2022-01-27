const mongoose = require ('mongoose');
const Player = require ('./models/player.js');

const connectionString = 'mongodb+srv://user:secret.password@node.ixftk.mongodb.net/DnD?retryWrites=true&w=majority'
mongoose.connect(connectionString);

Player.deleteMany({}, function (err) {
  console.log(err)
  }
);

//Lösche alle expenses