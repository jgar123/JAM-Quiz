const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken =  await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken')
    }

    return prisma.mutation.createUser({ data: args.data }, info)

  },
  deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({
      where: {
        id: args.id
      }
    }, info)
  },
  updateUser(parent, args, { prisma }, info) {
    // Can add user exist validation if you want
    return prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  }
}

module.exports = { Mutation }