const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Kit: {
        type: String,
        required: true,
        unique:true
    }
});

const Player = mongoose.model('Player', UserSchema);

module.exports = Player;