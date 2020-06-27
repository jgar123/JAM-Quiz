const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
      users(query: String): [User!]! 
      me: User!
    }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }
`
module.exports = { typeDefs }