import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCJ7BSexJ_ad6_BVxv_M9YstByFZrdV9To',
    libraries: 'places',
    installComponents: true
  }
})
Vue.use(VModal)

new Vue({
  router,
  store,
  VModal,
  render: h => h(App)
}).$mount('#app')
