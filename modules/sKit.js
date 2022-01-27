const Kits = require('../models/kits.js')
const kitExists = require('./kitExists.js')

module.exports = async function (AKit) {
/*   if (kitExists(AKit)) { */
    console.log(AKit)
    console.log('Kit Already Exists. N')
/*   } else { */
    const kit = new Kits({
      Kit: AKit
    });
    try {
      kit.save();
      console.log('Saved new Kit')
    } catch (error) {
      console.log(error.message)
/*     } */
  }

  
}