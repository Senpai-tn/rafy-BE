const { Schema, model } = require('mongoose')
const materielSchema = new Schema({
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
})
const Materiel = model('materiels', materielSchema)
module.exports = Materiel
