const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      }
    }

    // users(null) returns all scalar types on schema
    return prisma.query.users(opArgs, info)
  },
  me() {
    return {
      id: 'abc123',
      name: 'Jonny',
      email: 'jonny@jonny.jonny'
    }
  }
}

module.exports = { Query }