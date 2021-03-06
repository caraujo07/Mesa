import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLEAPIKEY,
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
