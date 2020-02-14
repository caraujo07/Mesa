<template>
  <div>
   <GmapMap id="map"
      ref="mapRef"
      :center="{lat: location.lat, lng: location.lng}"
      :zoom="15"
      map-type-id="roadmap"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>

export default {
  name: 'GoogleMap',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: -8.34, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      location: {
        lat: null,
        lng: null
      },
      gettingLocation: false,
      errorStr: null
    }
  },
  created () {
    if (!('geolocation' in navigator)) {
      this.errorStr = 'Geolocation is not available.'
      return
    }

    this.gettingLocation = true
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false
      this.location.lat = pos.coords.latitude
      this.location.lng = pos.coords.longitude
      console.log(this.location.lat, this.location.lng)
    }, err => {
      this.gettingLocation = false
      this.errorStr = err.message
    })
  },
  async mounted () {
    try {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: this.location.lat, lng: this.location.lng })
      })
      this.geolocate()
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    setPlace (place) {
      this.currentPlace = place
      console.log(place)
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100vh;
    float: right;
  }
</style>
