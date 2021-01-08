const { ApolloServer, gql } = require('apollo-server')
const nanoid = require('nanoid')

const typeDefs = gql`
  type Character {
    id: ID
    name: String
    status: String
    image: String
    gender: String
  }

  type Query {
    characters: [Character]
    character(id: ID): Character
  }

  type Mutation {
    addCharacter(name: String, status: String, gender: String, image: String): Character
  }
`
const data = require('./data')

const resolvers = {
  Query: {
    characters: () => data,
    character: (_, { id }) => {
      return data.find( character => character.id == id )
    }
  },
  Mutation: {
    addCharacter(_, params) {
      const storeCharacter = {
        id: nanoid.nanoid(),
        ...params
      }

      data.push(storeCharacter)
      return storeCharacter
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log('Server is running on' + ' ' + url)
})
