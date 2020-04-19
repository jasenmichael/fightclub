export const state = () => ({
  loggedIn: false,
  token: '',
})

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setLoggedIn(state) {
    state.loggedIn = true;
  },
  setLoggedOut(state) {
    state.loggedIn = false;
  }
}
