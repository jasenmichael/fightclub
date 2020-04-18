<template>
  <v-container>
    <v-row dense>
      <!-- chat section -->
      <v-col cols="12" lg="9" sm="8" order="1" order-sm="0">
        <v-card style="height:100%;">
          <!-- login -->
          <v-card-text v-if="!loggedIn" :style="`font-size:22px;height:calc(100vh - ${300}px);`">
            <v-layout column justify-center align-center>
              <h2 class="fighter pb-3">FIGHTCLUB Chat</h2>
              <!-- <h3 class="fighter">Login</h3> -->
              <v-container fluid>
                <v-form rounded @submit.prevent="login(name, password)">
                  <v-text-field v-model="name" label="Name" required></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                  <v-row align="center">
                    <v-col class="text-center">
                      <v-btn
                        :disabled="user.length <= 5 || password.length <= 5"
                        color="primary"
                        text
                        class="wc2"
                        style="font-size:38px;"
                        type="submit"
                      >Login</v-btn>
                    </v-col>
                  </v-row>
                  <v-checkbox v-model="stayLoggedIn" label="Remember me"></v-checkbox>
                  <p v-if="loginError" class="red--text">{{loginError}}</p>
                  <p v-else>&nbsp;</p>
                </v-form>
              </v-container>
              <p class="pt-4 mt-4">
                Join us on
                <a href="https://discord.gg/fQjMucV" target="_blank">Discord</a>
                to get an account.
              </p>
            </v-layout>
          </v-card-text>

          <!-- chat area -->
          <v-card-text v-else class="pa-0 ma-0">
            <v-col>
              <!-- messages box -->
              <v-row dense>
                <div
                  class="chat-wrapper"
                  id="chat"
                  :style="`height:calc(100vh - ${300}px);width:100%;`"
                >
                  <!-- <pre>{{user}}</pre> -->
                  <div class="chat">
                    <div v-for="(msg, index) in messages" :key="`message-${index}`">
                      <!-- <pre>
                        {{msg}}
                      </pre>-->
                      <div v-if="msg.name === 'admin'" class="system">
                        <p class="text-center font-italic">{{ msg.text }}</p>
                      </div>
                      <div v-else class="msg-wrapper">
                        <div
                          class="msg"
                          :class="(user.id && msg.id.toString() === user.id.toString()) ? 'owner' : ''"
                        >
                          <div class="msg__information">
                            <span class="msg__name">{{ msg.name }}</span>
                            <span class="msg__date">{{ msg.time }}</span>
                          </div>
                          <p class="msg__text">{{ msg.text }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-row>

              <!-- chat input -->
              <v-row dense>
                <v-col class="mb-0 pb-0">
                  <v-text-field
                    class="ma-0 pa-0"
                    filled
                    outlined
                    rounded
                    dense
                    v-model="message"
                    @click:append="sendMessage"
                    @keydown.enter="sendMessage"
                    append-icon="mdi-send"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- server status -->
      <v-col tile cols="12" lg="3" sm="4" xs="12" stretch>
        <!-- <div> -->
        <v-card :loading="!connected" light class="wc2" style="height:100%;">
          <v-card-text style="font-size:20px;">
            <h1 class="text-center status-title mb-1">Warcraft II</h1>
            <h2 class="text-center status-title">Server</h2>
            <div v-if="!connected">Connecting...</div>
            <div v-else class="server-info">
              <h4 class="server-info">
                Status:
                <span
                  :class="serverData.status === 'online'? serverData.status : 'offline'"
                >{{serverData.status === 'online'? serverData.status : 'offline'}}</span>
              </h4>
              <hr class="blue-grey lighten-3" />
              <h4 class="server-info">
                PvPGN Version:
                <span class="font-weight-light">{{serverData.version}}</span>
              </h4>
              <h4 class="server-info">
                Server Uptime:
                <span class="font-weight-light">{{serverData.uptime}}</span>
              </h4>
              <h4 class="server-info">
                Wc2 Channels:
                <span
                  class="font-weight-light"
                >{{serverData.channels.join().replace(',', ', ')}}</span>
              </h4>
              <h4 class="server-info">
                User Accounts:
                <span class="font-weight-light">{{serverData.user_accounts}}</span>
              </h4>
              <h4 class="server-info">
                Users Online:
                <span class="font-weight-light">{{serverData.users_online.length}}</span>
              </h4>
              <h4 class="server-info">
                Who's Online:
                <span
                  class="font-weight-light"
                >{{serverData.users_online.join().replace(',', ', ')}}</span>
              </h4>
            </div>
            <hr class="blue-grey lighten-3" />
            <div v-if="loggedIn" class="server-info pr-4">
              <h4 class="pb-0">Gateway Settings:</h4>
              <v-col class="mt-0 pt-0">
                <v-row
                  v-for="(value, name) in gatewayInfo"
                  :key="name"
                  class="p-0 m-0"
                  no-gutters
                  align="center"
                >
                  <v-col class="server-info pl-0 mb-0" cols="3">
                    <h4>{{name}}:</h4>
                  </v-col>
                  <v-col class="gateway text-right" cols="7">{{value}}</v-col>
                  <v-col class="pl-2" cols="2">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <!-- <v-btn color="primary" dark v-on="on">Left</v-btn> -->
                        <v-btn
                          class="mb-0"
                          v-on="on"
                          rounded
                          icon
                          small
                          block
                          @click="copyToClip(value.toString())"
                          tile
                        >
                          <v-icon small center>mdi-content-copy</v-icon>
                        </v-btn>
                      </template>
                      <span>Copy to Clipboard</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </div>
          </v-card-text>
        </v-card>
        <!-- </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => {
    return {
      connected: false,
      loggedIn: false,
      stayLoggedIn: false,
      serverData: {},
      // gatewayInfoDialog: false,
      id: 0,
      gatewayInfo: {
        Name: 'FIGHTCLUB',
        Zone: 0,
        Ip: '35.184.41.128'
      },
      user_data: {},
      name: '',
      password: '',
      token: '',
      loginError: '',
      message: ''
    }
  },
  async mounted() {
    if (process.browser) {
      this.token = localStorage.getItem('token') || ''
      this.name = localStorage.getItem('name') || ''
      this.password = localStorage.getItem('password') || ''
      if (this.name !== '' && this.password !== '') {
        this.stayLoggedIn = true
      }
      if (this.token !== '') {
        let tokenValid = !(await this.pvpgn('')).error
        console.log('tokenValid', tokenValid)
      }
    }
    // get server status at mount, and every 30 seconds after
    await this.getServerData()
    setInterval(async () => {
      await this.getServerData()
    }, 30000)
  },
  sockets: {
    updateUsers(users) {
      this.updateUsers(users)
    },
    newMessage(msg) {
      this.newMessage(msg)
    }
  },
  computed: {
    ...mapState(['user', 'users', 'messages'])
  },
  methods: {
    ...mapMutations(['setUser', 'newMessage', 'updateUsers', 'clearData']),
    now() {
      return this.$moment().format('MMMM Do YYYY, h:mm:ss a')
      // return this.$moment().format('M-D-YYYY, h:mma')
    },
    async getServerData() {
      console.log('updating server data..')
      let serverData = await this.$axios
        .get('/api/warcraft2bne')
        .catch(error => {
          return { error }
        })
      if (!serverData.error && serverData.status === 200) {
        this.connected = true
        this.serverData = serverData.data
      }
    },
    async login(name, password) {
      // get token
      let body = {
        user: name,
        password
      }
      let data = (await this.$axios.post('/api/warcraft2bne/login', body)).data
      console.log(this.stayLoggedIn)
      // set token, loggedIn, user_data
      if (data.token) {
        this.token = data.token
        this.loggedIn = true
        this.user_data = data
        this.user_data.token = undefined
        this.name = this.user_data.name
        setTimeout(() => {
          this.scrollChat()
        }, 8)

        // set local storage
        if (this.stayLoggedIn) {
          localStorage.setItem('token', this.token)
          localStorage.setItem('name', this.name)
          localStorage.setItem('password', this.password)
        }

        // conect to socket chat
        const user = {
          name: this.name,
          room: 'FIGHTCLUB',
          id: 0
        }
        // create socket user ith login name
        this.$socket.emit('createUser', user, data => {
          user.id = data.id
          this.setUser(user)
          // this.$router.push('/chat')
          this.$socket.emit('joinRoom', user)
        })
        // join room
      }
      if (data.error) {
        this.loginError = data.error
        setTimeout(() => {
          this.loginError = ''
        }, 1000)
      }
    },
    async pvpgn(command) {
      const options = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
      return (
        await this.$axios.post(`/api/warcraft2bne/?${command}`, {}, options)
      ).data
    },
    async sendMessage() {
      if (this.message !== '') {
        let message = {
          name: this.name,
          id: this.user.id,
          text: this.message,
          time: this.now()
        }
        console.log(message)
        // this.messages.push(message)
        // send msg via socket
        this.$socket.emit('createMessage', message, () => {
          // this.text = ''
          this.message = ''
          this.scrollChat()
        })
      }
    },
    scrollChat() {
      if (process.browser) {
        setTimeout(() => {
          let div = document.getElementById('chat')
          div.scrollTop = div.scrollHeight
        }, 8)
      }
    },
    async copyToClip(text) {
      console.log(`copying ${text} to clipboard`)
      try {
        await this.$copyText(text)
      } catch (e) {
        console.error(e)
      }
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    }
  },
  watch: {
    messages() {
      if (
        this.messages.length &&
        this.messages[this.messages.length - 1].text.includes(
          'connected to chat, make sure to talk shit..'
        )
      ) {
        console.log('play user connected sound...')
        // play user connnected sound
        let sound =
          'http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3'
        this.playSound(sound)
      }
      this.scrollChat()
    }
  }
}
</script>

<style>
.container {
  background-color: #1e1e1e;
}
.online {
  font: bold;
  color: green;
}
.offline {
  font: bold;
  color: red;
}
.status-title {
  /* color: #FFFFFF; */
  /* background: #996D6D; */
  text-shadow: #5c4129 1.5px 2px 1px;

  color: #f9a825;
}
.server-info > h4:not(span) {
  /* font: bold; */
  margin: 0;
  margin-bottom: 2px;
  color: rgb(48, 35, 15);
  text-shadow: #493324 0.5px 1px 0.5px;
}

.server-info > span,
.gateway {
  /* font: bold; */
  /* margin: 0; */
  font-size: 14px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  /* margin-bottom: 2px; */
}
</style>

<style scoped>
.chat-wrapper {
  height: 100%;
  position: relative;
  overflow-y: auto;
}

/* .chat__form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
} */

.chat {
  /* position: absolute; */
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
  color: #000;
}
/* 
*/
</style>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;
  color: #fff;

  p {
    margin-bottom: 1rem;
  }
}

.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 70%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;

  &__information {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    font-weight: 700;
  }

  &__date {
    text-decoration: underline;
    margin-left: 15px;
  }

  &__text {
    margin-bottom: 0;
  }
}

.owner {
  background: #fff;
  color: #000;
  align-self: flex-end;
}
</style>

<style scoped>
/* * {
  margin: 0;
  box-sizing: border-box;
}

body {
  padding-top: 1rem;
  font: 13px Helvetica, Arial;
}

form {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}

form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}

#log {
  list-style-type: none;
}

#log p {
  padding: 2px 4px;
  font-size: 1rem;
  font-family: Lucida Console, Lucida Sans Typewriter, monaco,
    Bitstream Vera Sans Mono, monospace;
}

#logger {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 25px;
  margin: 1rem;
  padding: 2rem;
  padding-bottom: 0px;
  margin-bottom: 0px;
  height: 50vh;
  padding: 1rem;
  overflow-x: scroll;
  overflow-y: auto;
  background: rgb(0, 0, 0);
  color: aliceblue;
}

.green {
  color: green;
}

.red {
  color: red;
}

.blue {
  color: blue;
}

button {
  padding: 0rem;
} */
</style>
