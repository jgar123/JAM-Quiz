const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
const Quiz = require('../models/Quiz')
const User = require('../models/User')



const QuizType = new GraphQLObjectType({
  name: 'Quiz',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorID)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(QuizType),
      resolve(parent, args) {
        return Quiz.find({ authorID: parent.id });
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    quiz: {
      type: QuizType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Quiz.findById(args.id)
      }
    },
    quizzes: {
      type: new GraphQLList(QuizType),
      resolve(parent, args) {
        return Quiz.find({})
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})