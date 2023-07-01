const express = require('express')
const app = express()
const { connect } = require('mongoose')
const cors = require('cors')
const {
  userRouter,
  actionRouter,
  equipeRouter,
  matchRouter,
  tournoiRouter,
} = require('./routes')
connect('mongodb://127.0.0.1:27017/WaelPFE').then(() => {
  console.log('connecté à la BD')
})
app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/actions', actionRouter)
app.use('/equipes', equipeRouter)
app.use('/matchs', matchRouter)

app.use('/tournois', tournoiRouter)
app.listen(3698, () => {
  console.log('App started')
})
