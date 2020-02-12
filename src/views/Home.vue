<template>

  <div id="Map">

  </div>
  <!-- <button @click="logout">logout</button> -->

</template>

<script>

import { AUTH_LOGOUT } from '../store/actions/auth'
import gmapsInit from '../utils/gmaps'
export default {
  name: 'Map',
  data: () => ({
    map: '',
    locations: [
      {
        position: {
          lat: -8.0515568,
          lng: -34.8796604
        }
      },
      {
        position: {
          lat: -8.0446519,
          lng: -34.8747728
        }
      }
    ]
  }),
  async mounted () {
    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const center = new google.maps.LatLng(-8.048639999999999, -34.873343999999996)

      const map = new google.maps.Map(this.$el, {
        center: center
      })

      geocoder.geocode({ location: center }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
        map.setZoom(13)
      })
      // eslint-disable-next-line
      const markers = this.locations
        .map(x => new google.maps.Marker({ ...x, map }))
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
  #Map {
    height: 100vh;
    width: 80%;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
