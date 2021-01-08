<template>
  <div class="p-2">
    <div class="flex">
      <nuxt-link class="p-3 bg-gray-300" to="/">Back</nuxt-link>
    </div>
    <h1 class="mb-2 text-2xl">Create Character</h1>
    <form action="" @submit.prevent="createCharacter()">
      <div class="flex flex-col space-y-2">
        <input 
        v-model="name"
        type="text"
        placeholder="name"
        class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
        <input 
        v-model="gender"
        type="text"
        placeholder="gender"
        class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
        <input 
        v-model="status"
        type="text"
        placeholder="status"
        class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
        <input 
        v-model="image"
        type="text"
        placeholder="image"
        class="w-1/2 px-2 py-1 text-gray-700 border rounded shadow">
      </div>
      <button class="px-3 py-2 my-2 font-semibold text-white bg-green-600" type="submit">Create Character</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { GET_CHARACTERS } from "./index.vue";

export default {
  data() {
    return {
      name: '',
      status: '',
      gender: '',
      image: ''
    }
  },
  async mounted() {
  },
  methods: {
    async createCharacter(event) {
      let igsStaffImg
      if (this.image === '') igsStaffImg = ''
      else igsStaffImg = `http://igsweb/Object/img/tech/${this.image}.gif`
      await this.$apollo.mutate({
        mutation: gql `mutation (
            $name: String!
            $status: String!
            $gender: String
            $image: String
          ) {
            addCharacter(
              name: $name,
              status: $status,
              gender: $gender,
              image: $image
            ) {
              name
              gender
              status
              image
            }
          }
        `,
        variables: {
          name: this.name,
          status: this.status,
          gender: this.gender,
          image: igsStaffImg
        },
        // update: (cache, { data: { addCharacter } }) => {
        //   try {
        //     const data = cache.readQuery({
        //       query: GET_CHARACTERS
        //     })
        //     data.characters.push(addCharacter)
        //     cache.writeQuery({
        //       query: GET_CHARACTERS,
        //       data
        //     })
        //   } catch (error) {
        //     console.log(error)
        //   }
        // }
        refetchQueries: [{ query: GET_CHARACTERS }]
      }).then((data) => {
        this.$router.push('/')
      }).catch((e) => {
        console.log(e.graphQLErrors)
      })
    }
  }
}
</script>

<style>

</style>