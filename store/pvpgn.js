// export const state = () => ({
//   serverData: {},
// })

// export const mutations = {
//   setServerData(state, data) {
//     state.serverData = data;
//   }
// }

// export const actions = {
//   async startPvpgn({commit}) {
//     const data = await pvpgn('start')
//     commit('setServerData', data)
//   },
//   async restartPvpgn({commit}) {
//     const data = await pvpgn('restart')
//     commit('setServerData', data)
//   },
//   async stopPvpgn({commit}) {
//     const data = await pvpgn('stop')
//     commit('setServerData', data)
//   }
// }

// const pvpgn = async (cmd) => {
//   const options = {
//     headers: {
//       Authorization: `Bearer ${store.state.token}`
//     }
//   }
//   return (
//     await this.$axios.post(`/api/warcraft2bne/?${cmd}`, {}, options)
//   ).data
// }
