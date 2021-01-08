<template>
  <div class="h-full">
  </div>
</template>

<script>
import gql from 'graphql-tag'

// export const GET_RESULT = gql`
//   query getResult {
//     characters {
//       results {
//         id
//         name
//         status
//         image
//         gender
//       }
//     }
//   }
// `

export const GET_RESULT = gql`
  query getCharacters {
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
    return {}
  },
  apollo: {
    $client: 'otherClient',
    characters: {
      prefetch: true,
      query: GET_RESULT
    }
  }
}
</script>

<style>
</style>
