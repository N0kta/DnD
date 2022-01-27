const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KitSchema = new Schema({
    Kit: { 
        type: [Object],
        blackbox: true,
        unique: true,
        required: true
    },
});

const Kit = mongoose.model('Kit', KitSchema);

module.exports = Kit;