<template>
  <div>
   <GmapMap id="map"
      ref="mapRef"
      :center="{lat: location.lat, lng: location.lng}"
      :zoom="15"
      map-type-id="roadmap"
    >
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'GoogleMap',
  computed: {
    google: gmapApi
  },
  data () {
    return {
      places: [],
      currentPlace: null,
      location: {
        lat: 0.0,
        lng: 0.0
      },
      gettingLocation: false,
      errorStr: null,
      res: {}
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
      this.location.lat = parseFloat(pos.coords.latitude)
      this.location.lng = parseFloat(pos.coords.longitude)
    }, err => {
      this.gettingLocation = false
      this.errorStr = err.message
    })
  },
  async mounted () {
    try {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: this.location.lat, lng: this.location.lng })
        this.$gmapApiPromiseLazy().then(res => {
          const recife = new res.maps.LatLng(-8.0485, -34.873343999999996)

          var service = new res.maps.places.PlacesService(map)

          function createMarker (place) {
            var placeLoc = place.geometry.location
            var infowindow = new res.maps.InfoWindow()
            var marker = new res.maps.Marker({
              map: map,
              position: placeLoc
            })

            res.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(place.name)
              infowindow.open(map, this)
            })
          }
          const callback = (results, status) => {
            if (status === res.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i])
                const { id, name, vicinity } = results[i]
                this.places.push({ id, name, vicinity })
                this.emitToParent()
              }
            }
          }
          service.nearbySearch({
            location: recife,
            radius: '500'
          }, callback)
        })
      })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    emitToParent (event) {
      this.$emit('mapToParent', this.places)
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
