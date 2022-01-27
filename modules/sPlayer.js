const Player = require('../models/player.js')

module.exports = async function (name) {
  const player = new Player({
    Name: name
  });
  
  await player.save();
}