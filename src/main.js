import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCJ7BSexJ_ad6_BVxv_M9YstByFZrdV9To',
    libraries: 'places',
    installComponents: true
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
