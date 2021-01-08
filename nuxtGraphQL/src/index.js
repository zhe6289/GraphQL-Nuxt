const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const lodash = require('lodash')
const { Character, validateCharacter } = require('./models/Character')
const { User } = require('./models/User')


mongoose.connect('mongodb://localhost/graphQL', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const resolvers = {
  Query: {
    characters: () => Character.find({}, (error, characters) => {
      if (error) console.log('error', error)
      return characters
    }),
    character: (_, { id }) => Character.findById(id, (error, character) => {
      if (error) console.log('error', error)
      return character
    }),
    users: () => User.find({}, (error, users) => {
      if (error) console.log('error', error)
      return users
    })
  },
  Mutation: {
    addCharacter(_, payload) {
      const { value, error } = validateCharacter(payload, { abortEarly: false })
      if (error) {
        throw new UserInputError('Failed to create a character due to validation errors', {
          validationErrors: error.details
        })
      }
      return Character.create(value)
    },
    async removeCharacter(_, payload) {
      try {
        let result = Character.findByIdAndDelete(payload.id)
        console.log('Delete OK')
        return result
      } catch (error) {
        throw new Error('Failed to delete.', error)
      }
    },
    async signup(_, {user}) {
      const password = await bcrypt.hash(user.password, 10)
      const registerUser = await User.create({
        ...user,
        password
      })

      const token = await jwt.sign({
        _id: registerUser._id
      }, 'mySecret')

      return {
        token,
        user: lodash.pick(user, ['name', 'email'])
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers
})

server.listen(4500).then(({url}) => {
  console.log('Server is running on' + ' ' + url)
})
