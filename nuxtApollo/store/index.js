
// export const state = () => ApiState
export const state = () => ({
  result: '',
  posts: []
})

export const mutations = {
  updateState: (state, [column = null, val = null]) => {
    if (column) state[column] = val
  }
}
