<template>
  <div id="Home">
    <div class="locationsList">asf</div>
    <google-map class="map" />
  </div>
</template>
<script>
import GoogleMap from '../components/GoogleMap'

export default {
  name: 'Home',
  components: {
    GoogleMap
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
    width: 20%;
    height: 100vh;
  }
</style>
