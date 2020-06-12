const mongoose = require('mongoose')

// Do we want each question to be a schema?

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: { type: [] },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }
})

module.exports = mongoose.model('Quiz', quizSchema)