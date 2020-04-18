import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
// require('dotenv').config()
const apiUrl = process.env.API_URL


export default function () {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: apiUrl,
    options: {
      autoConnect: false
    }
  }))
}
