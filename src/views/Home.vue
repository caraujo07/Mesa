<template>
  <div id="Home">

  </div>
    <!-- <button @click="logout">logout</button> -->
</template>

<script>

import { AUTH_LOGOUT } from '../store/actions/auth'
import gmapsInit from '../utils/gmaps'
export default {
  name: 'Home',
  data: () => ({
    map: ''
  }),
  async mounted () {
    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
      })
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$root._router.push('/')
        })
    }
  }
}
</script>

<style scoped lang="scss">
  #Home {
    height: 100vh;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
