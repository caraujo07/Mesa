<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { AUTH_LOGOUT } from '../store/actions/auth'

export default {
  name: 'Home',
  components: {
    HelloWorld
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
