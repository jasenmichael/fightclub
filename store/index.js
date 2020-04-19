export const state = () => ({
  user: {},
  user_data: {},
  serverData: {},
  messages: [{
      name: 'ipeon',
      text: "no way, is that really you chizzy?",
      id: 0,
      time: 'April 16th 2020, 11:48:59 pm'
    },
    {
      name: 'chizzy',
      text: 'hey bro, long time',
      id: 1,
      time: 'April 16th 2020, 11:48:59 pm'
    },
    {
      name: 'ipeon',
      text: 'dude let\'s battle',
      id: 2,
      time: 'April 16th 2020, 11:48:59 pm'
    },
    {
      name: 'chizzy',
      text: 'fuck yeah, I will host',
      id: 1,
      time: 'April 16th 2020, 11:48:59 pm'
    },
    {
      name: 'ipeon',
      text: 'I am on, wow your server is fast, and this site is epic dude!',
      id: 2,
      time: 'April 16th 2020, 11:48:59 pm'
    }
  ],
  users: [],
  token: ''
})

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  setUserData(state, userData) {
    state.user_data = userData;
  },
  setServerData(state, data) {
    state.serverData = data;
  },
  newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  updateUsers(state, users) {
    state.users = users;
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
}
