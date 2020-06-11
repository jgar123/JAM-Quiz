const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const { dbURI, port } = require('./config/environment')

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)

// This flags a successful connection, previously it always flagged as successful even before connection established - strange
mongoose.connection.once('open', () => console.log('Mongoose connected'))

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

