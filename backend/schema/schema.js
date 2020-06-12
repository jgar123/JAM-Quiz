const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
const Quiz = require('../models/Quiz')
const User = require('../models/User')



const QuizType = new GraphQLObjectType({
  name: 'Quiz',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    admin: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.username)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString }
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
        return Quiz.find()
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
        return User.find()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        //GraphQLNonNull make these field required
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          username: args.username
        })
        return user.save()
      }
    },
    addQuiz: {
      type: QuizType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const quiz = new Quiz({
          name: args.name
        })
        return quiz.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
