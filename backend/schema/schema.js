const { GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLInt, GraphQLSchema }  = require('graphql')

var fakeBookDatabase = [
  { name: 'Book 1', pages: 432, id: 1 },
  { name: 'Book 2', pages: 32, id: 2 },
  { name: 'Book 3', pages: 532, id: 3 },
  { name: 'Book 4', pages: 532, id: 4 },
  { name: 'Book 5', pages: 532, id: 5 }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(parent)
        console.log(args)
        // requires == as the types are actually different
        return fakeBookDatabase.find((item) => item.id == args.id )
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})