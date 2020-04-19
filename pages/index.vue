<template>
  <div>
    <v-tabs fixed-tabs v-model="selectedTab">
      <v-tab id="downloads">Info/Downloads</v-tab>
      <v-tab id="chat">Chat/Server Stats</v-tab>

      <v-tab-item class="main">
        <v-img src="/wc2-banner2.jpg" height="250" class="grey darken-4"></v-img>
        <v-flex class="text-center">
          <!-- <NuxtLink to="/">Fightclub Home</NuxtLink> -->
          <blockquote class="blockquote">
            &#8220;First, install your dependencies. Then, play the game.&#8221;
            <footer>
              <small>
                <em>&mdash;Chizzy</em>
              </small>
            </footer>
          </blockquote>
          <hr class="mb-4" />
          <div class="text-left">
            <h3>Installation instructions:</h3>
            <p>
              <strong>1:</strong> download and install
              <a
                href="ftp://ftp.war2.ru/war2/War2Combat46_en_lite.exe"
                target="_blank"
                title="Download War2Combat46_en_lite.exe"
              >War2Combat46_en_lite.exe</a>
            </p>
            <p>
              <strong>2:</strong> download unzip and run BattleNet Gateway Editor
              <a
                href="ftp://ftp.war2.ru/war2/GatewayEditor.zip"
                target="_blank"
                title="Download Battlenet Gateway Editor"
              >GatewayEditor.zip</a>
            </p>
            <p>
              <strong>3:</strong> Connect to our discord server to get our server gateway info
              <a
                href="https://discord.gg/fQjMucV"
                target="_blank"
                title="fightclub discord channel"
              >here</a>
            </p>
            <h4>Misc. Downloads</h4>
            <p>
              <a
                href="http://www.solemnwarning.net/ipxwrapper/ipxwrapper-0.6.1.zip"
                target="_blank"
                title="Ipx Wrapper for ipx lan play"
              >Ipx Wrapper</a>
            </p>
          </div>
        </v-flex>
      </v-tab-item>

      <v-tab-item class="main">
        <Chat />
      </v-tab-item>
    </v-tabs>
    <!-- <v-layout> -->
    <!-- </v-layout> -->
  </div>
</template>

<script>
import Chat from '~/components/Chat.vue'

export default {
  components: {
    Chat
  },
  data() {
    return {
      selectedTab: 0
    }
  },
  // watchQuery(query){ return},
  mounted() {
    console.log(this.$route.query.login)
    if (this.$route.query.login) {
      this.selectedTab = 1
    }
  }
}
</script>

<style scoped>
/* .main {
  min-height: calc(100vh - 172px);
} */
</style>
