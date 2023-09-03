const { Schema, model } = require('mongoose')
const matchSchema = new Schema({
  date: Date,
  listeEquipes: [{ type: Schema.Types.ObjectId, ref: 'equipes' }],
  tournoi: { type: Schema.Types.ObjectId, ref: 'tournois' },
  arbitre: { type: Schema.Types.ObjectId, ref: 'users' },
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
  duree: { type: Number },
})
const Match = model('matchs', matchSchema)
module.exports = Match
