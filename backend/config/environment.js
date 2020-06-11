const port = 4000
const dbURIPrefix = 'mongodb://localhost/'
const dbName = 'JAM'
const dbURI = `${dbURIPrefix}${dbName}`
const secret = 'Grandmaster J and Magic Mike serving up a bowl of full stack'

module.exports = {
  port,
  dbURI,
  secret
}