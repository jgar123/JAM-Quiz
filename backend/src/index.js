const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { Query } = require('./resolvers/Query')
const { Mutation } = require('./resolvers/Mutation')
const { User } = require('./resolvers/User')
const { prisma } = require('./prisma')

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User
  },
  content: {
    prisma
  }
})

server.listen({ port: 4000 }).then(() => {
  console.log('Server up and running')
})