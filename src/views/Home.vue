<template>
  <div id="Home">
    <div class="locationsList">
      <img :src="user.avatar" alt="">
    </div>
    <google-map class="map" />
  </div>
</template>
<script>

import GoogleMap from '../components/GoogleMap'
import { api } from '../utils/api'

export default {
  name: 'Home',
  components: {
    GoogleMap
  },
  data () {
    return {
      user: {
        first_name: '',
        email: '',
        avatar: ''
      }
    }
  },
  async mounted () {
    try {
      const response = await api.get('/users/2')
      this.user.first_name = response.data.data.first_name
      this.user.email = response.data.data.email
      this.user.avatar = response.data.data.avatar
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss">
  #Home {
    display: flex;
    .map {
      height: 100vh;
      width: 100%;
    }
  }
  .locationsList {
    background: #FFF;
    width: 30%;
    height: 100vh;
  }
</style>
