<template>
  <div class="h-full" :class="{'dark':darkMode}">
    <div class="h-full dark:bg-gray-800 dark:text-white">
      <div class="flex flex-col max-w-xs space-y-1 text-center">
        <!-- <nuxt-link class="p-3 bg-gray-300" to="/about">About</nuxt-link> -->
        <nuxt-link class="p-3 bg-gray-200 dark:text-customize dark:hover:bg-gray-700" to="/signup">Signup</nuxt-link>
        <nuxt-link class="p-3 bg-gray-200 dark:text-customize dark:hover:bg-gray-700" to="/create">Create Character</nuxt-link>
        <nuxt-link class="p-3 bg-gray-200 dark:text-customize dark:hover:bg-gray-700" to="/wrapper">Wrap</nuxt-link>
      </div>
      <button
        class="p-2 my-2 text-white bg-gray-600 dark:text-customize hover:bg-gray-700 focus:outline-none"  
      @click="darkMode = !darkMode">Toggle Dark Mode</button>

      
      <h1 class="w-full text-center" v-if="charactersLoad">Loading....</h1>
      <div v-if="!charactersLoad" class="flex">
        <ul class="w-40 px-2 text-gray-600 dark:text-white">
          <li v-for="(characters, index) in characters" :key="index" class="cursor-pointer" @click="onClickName(characters.id)">
            <span class="leading-loose hover:font-bold hover:text-gray-900 dark:hover:text-customize">
              {{ characters.name }}
            </span>
          </li>
        </ul>
        <div v-if="character !== null" class="flex-grow min-h-full px-5 py-2 bg-gray-100 dark:text-customize dark:bg-gray-600">
          <button
            class="p-2 my-2 text-white bg-gray-300 dark:text-customize hover:bg-gray-500 focus:outline-none" @click="onClickRemove()">Delete</button>          
          <div> Name: {{character.name}} </div>
          <div> Gender: {{character.gender}} </div>
          <div> Status: {{character.status}} </div>
          <div v-if="character.image" class="relative image-wrap">
            <img @load="isLoad = true" :src="character.image" class="object-contain w-full" style="height: 15rem">
            <div v-show="!isLoad" class="icon-loading"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      id
      name
    }
  }
`
export const GET_RESULT = gql`
  query getResult {
    characters {
      results {
        id
        name
        status
        image
        gender
      }
    }
  }
`

export default {
  name: 'Index',
  data() {
    return {
      character: null,
      characterId: '',
      darkMode: false,
      isLoad: false
    }
  },
  apollo: {
    characters: {
      query: GET_CHARACTERS
    }
  },
  async mounted() {
    // await this.getCharacters()
  },
  computed: {
    charactersLoad() {
      return this.$apollo.queries.characters.loading
    }
  },
  methods: {
    async onClickName(id) {
      this.isLoad = false
      this.characterId = id
      await this.getCharacter(id)
    },
    onClickRemove() {
      this.removeCharacter()
    },
    async getCharacter(characterId) {
      this.character = await {}
      const { data } = await this.$apollo.query({
        query: gql`
          query getCharacter($id: ID!) {
            character(id: $id) {
              id
              name
              image
              status
              gender
            }
          }
        `,
        variables: {
          id: characterId
        }
      })
      this.character = data.character
    },
    async removeCharacter() {
      await this.$apollo.mutate({
        mutation: gql `
          mutation removeCharacter($id: ID!) {
            removeCharacter(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: this.characterId
        },
        update: (store, { data: { removeCharacter } }) => {
          const data = store.readQuery({
            query: GET_CHARACTERS
          })
          data.characters = data.characters.filter(item => {
            return item.id !== this.characterId
          })
          this.character = null
          store.writeQuery({
            query: GET_CHARACTERS,
            data
          })
        }
      }).then((data) => {
        console.log('Delete successful')
      }).catch((e) => {
        console.log(e.graphQLErrors)
      })
    }    
  }  
}
</script>

<style>
.icon-loading{
  background: url('~static/images/icon-loading.svg');
  background-size: 100% 100%;
  height: 50px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform:translate(-50%, -50%);
  width: 50px;
}
</style>
