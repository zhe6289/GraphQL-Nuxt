<template>
  <div class="h-full" :class="{'dark':darkMode}">
    <div class="h-full dark:bg-gray-800 dark:text-white">
      <div class="flex">
        <!-- <nuxt-link class="p-3 bg-gray-300" to="/about">About</nuxt-link> -->
        <nuxt-link class="p-3 bg-gray-100 dark:text-customize dark:hover:bg-gray-700" to="/create">Create Character</nuxt-link>
      </div>
      <button
        class="p-2 my-2 text-white bg-gray-600 dark:text-customize hover:bg-gray-700 focus:outline-none"  
      @click="darkMode = !darkMode">Toggle Dark Mode</button>
      <div class="flex">
        <ul class="w-64 px-2 text-gray-600 dark:text-white">
          <li v-for="(characters, index) in characters" :key="index" class="cursor-pointer" @click="onClickName(characters.id)">
            <span class="leading-loose hover:font-bold hover:text-gray-900 dark:hover:text-customize">
              {{ characters.name }}
            </span>
          </li>
        </ul>
        <div class="flex-grow min-h-full px-5 py-2 bg-gray-100 dark:text-customize dark:bg-gray-600">
          <div> Status: {{character.status}} </div>
          <div> Name: {{character.name}} </div>
          <div> Gender: {{character.gender}} </div>
          <!-- <img :src="character.image" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  name: 'Index',
  data() {
    return {
      characterId: '5febe5157ca04f59c0d62ad4',
      characters: {},
      character: {},
      darkMode: false
    }
  },
  apollo: {
    characters: {
      query: gql`
        query getCharacters {
          characters {
            id
            name
          }
        }
      `
    },
    character: {
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
      variables() {
        return {
          id: this.characterId
        }
      }
    }    
  },
  async mounted() {
    await this.getCharacters()
  },
  methods: {
    onClickName(id) {
      this.characterId = id
    }
  }  
}
</script>

<style>
</style>
