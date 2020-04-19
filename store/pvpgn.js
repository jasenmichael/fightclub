import axios from 'axios'

export const state = () => ({
  serverData: {},
})

export const mutations = {
  setServerData(state, data) {
    state.serverData = data;
  }
}

export const actions = {
  async pvpgn({rootState, commit}, cmd) {
    // const data = await pvpgn('start', rootState.auth.token)
    const options = {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      }
    }
    const data = (await axios.post(`/api/warcraft2bne/?${cmd}`, {}, options)).data
    console.log('pvpgn', cmd)
    commit('setServerData', data)
  }
}
