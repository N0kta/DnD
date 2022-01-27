const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {type: [Object],
        blackbox: true,
        unique: true,
        required: true
    },
});

const Player = mongoose.model('Player', UserSchema);

module.exports = Player;