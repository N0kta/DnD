const Kits = require('../models/kits');

module.exports = async function (Ekit) {
  Kits.findOne({Kit: Ekit}).lean().exec();
} 