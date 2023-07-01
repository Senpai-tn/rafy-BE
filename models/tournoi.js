const { Schema, model } = require('mongoose')
const tournoiSchema = new Schema({
  libelle: String,
  type: String,
  listeMatch: {
    type: [{ type: Schema.Types.ObjectId, ref: 'matchs' }],
    default: [],
  },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
})

const Tournoi = model('tournois', tournoiSchema)
module.exports = Tournoi
