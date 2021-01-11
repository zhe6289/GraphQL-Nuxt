<template>
  <div class="p-2">
    <div v-if="$apollo.queries.users.loading">Loading...</div>
    <div v-if="$apolloData.queries.users.loading">Loading...</div>
    <div class="flex">
      <nuxt-link class="p-3 bg-gray-300" to="/">Back</nuxt-link>
    </div>    
    <h1 class="mb-2 text-2xl">Sign Up</h1>
    <div class="space-y-2 signup-wrap">
      <input 
      v-model="name"
      type="text"
      placeholder="name"
      class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
      <input 
      v-model="password"
      type="text"
      placeholder="password"
      class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
      <input 
      v-model="email"
      type="text"
      placeholder="email"
      @keyup.enter="SignUp()"
      class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
    </div>
    <button class="px-3 py-2 my-2 font-semibold text-white bg-green-600" @click="SignUp()">Sign Up</button>
    <div class="list-wrap">
      <ul class="space-y-2">
        <li v-for="(user, index) in users" :key="index" class="flex flex-col px-2 py-1 text-gray-700 border rounded shadow">
          <div>name: {{ user.name }}</div>
          <div>email: {{ user.email }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      email
      password
    }
  }
`

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      password: '',
      email: ''
    }
  },
  apollo: {
    users: {
      query: GET_USERS
    }
  },
  computed: {
    charactersLoad() {
      const load = this.$apolloData.queries.users.loading
      return load
    }
  },
  async mounted() {
    // await this.getUsers()
  },
  methods: {
    async SignUp(event) {
      await this.$apollo.mutate({
        mutation: gql `mutation (
            $name: String!
            $password: String!
            $email: String!
          ) {
            signup(
              user: {
                name: $name,
                password: $password
                email: $email
              }
            ) {
              token
              user {
                name
                email
              }
            }
          }
        `,
        variables: {
          name: this.name,
          password: this.password,
          email: this.email
        },
        refetchQueries: [{ query: GET_USERS }]
      }).then((res) => {
        this.name = ''
        this.password = ''
        this.email = ''       
      }).catch((e) => {
        console.log(e.graphQLErrors[0].extensions.exception.errors)
      })
    }
  }
}
</script>

<style>

</style>