const { Schema, model } = require('mongoose')
const equipeSchema = new Schema({
  nom: String,
  listeJoueurs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    default: [],
  },
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
})
const Equipe = model('equipes', equipeSchema)
module.exports = Equipe
