<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          :class="item.class"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-btn v-else icon>
              <v-avatar size="32" class="profile mr-2">
                <v-img :src="item.img"></v-img>
              </v-avatar>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>-->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>-->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>-->

      <!-- <nuxt-link to="/" tag="div"> -->
      <v-toolbar-title
        class="fighter nav-title pr-1"
        style="cursor: pointer;font-size:36px;"
        @click="$router.push('/')"
        v-text="title"
      />
      <!-- </nuxt-link> -->

      <v-spacer />
      <v-btn
        v-if="user.name && user_data.name && user.id"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn href="?login=true" icon v-else>
        <v-icon>mdi-account-off-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app> -->

    <v-navigation-drawer
      style="display:flex;flex-direction:column;"
      v-model="rightDrawer"
      :clipped="false"
      :permanent="false"
      :right="right"
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <!-- <v-icon light>mdi-repeat</v-icon> -->
          <!-- <v-list-item-action>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>-->

          <div class="ma-2">
            <p class="ml-2 mb-0">User: {{user_data.name}}</p>
            <p class="ml-2 mb-0">Wins: {{user_data.wins}}</p>
            <p class="ml-2 mb-0">Losses: {{user_data.losses}}</p>
            <p class="ml-2 mb-0">Draws: {{user_data.draws}}</p>
            <p class="ml-2 mb-0">Chat Room: {{user.room}}</p>
          </div>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-row align="center" justify="center">
          <div class="pa-2">
            <p class="text-center">Admin Server Controls</p>
            <v-btn-toggle mandatory class="ml-auto mb-6">
              <v-btn>
                <v-icon>mdi-reload</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-stop</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-btn block>Logout</v-btn>
          </div>
        </v-row>
      </template>

      <!-- <pre>userData:{{user_data}}</pre>
      <pre>user:{{user}}</pre>-->
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        // {
        //   class: 'fighter',
        //   img: '/icon.png',
        //   // icon: 'mdi-home',
        //   title: 'HOME',
        //   to: '/'
        // },
        {
          // icon: 'mdi-chart-bubble',
          class: 'wc2',
          img: '/wc2icon.png',
          title: 'Warcraft 2 BNE',
          // to: '/wc2bne'
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FIGHTCLUB'
    }
  },
  computed: {
    ...mapState(['user', 'user_data', 'users', 'token'])
  },
  methods: {
    ...mapMutations(['setServerData'])
  }
}
</script>


<style>
@font-face {
  font-family: 'lifecraftregular';
  src: url('/fonts/lifecraft_font-webfont.woff2') format('woff2'),
    url('/fonts/lifecraft_font-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

/* @font-face {
  font-family: 'StrikeFighter3DItalic';
  src: url('/fonts/StrikeFighter3DItalic.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/StrikeFighter3DItalic.woff') format('woff'),
    url('/fonts/StrikeFighter3DItalic.ttf') format('truetype'),
    url('/fonts/StrikeFighter3DItalic.svg#StrikeFighter3DItalic') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'StrikeFighterLaserItalic';
  src: url('/fonts/StrikeFighterLaserItalic.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/StrikeFighterLaserItalic.woff') format('woff'),
    url('/fonts/StrikeFighterLaserItalic.ttf') format('truetype'),
    url('/fonts/StrikeFighterLaserItalic.svg#StrikeFighterLaserItalic')
      format('svg');
  font-weight: normal;
  font-style: normal;
} */

@font-face {
  font-family: 'StrikeFighterBoldItalic';
  src: url('/fonts/StrikeFighterBoldItalic.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/StrikeFighterBoldItalic.woff') format('woff'),
    url('/fonts/StrikeFighterBoldItalic.ttf') format('truetype'),
    url('/fonts/StrikeFighterBoldItalic.svg#StrikeFighterBoldItalic')
      format('svg');
  font-weight: normal;
  font-style: normal;
}

.wc2 {
  font-family: 'lifecraftregular';
}

.fighter {
  /* font-family: 'StrikeFighter3DItalic'; */
  font-family: 'StrikeFighterBoldItalic';
}
.nav-title {
  color: #8a8585;
  /* background: #bababa; */
  text-shadow: #000000 1px 1px 0;
}
</style>
