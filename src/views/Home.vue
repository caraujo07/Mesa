<template>
  <div id="Home">
    <div class="locationsList">
      <div class="profile-info">
        <div class="avatar">
          <img :src="user.avatar" :alt="user.first_name + ' ' + user.last_name" :title="user.first_name + ' ' + user.last_name">
          <div class="edit" title="Edit profile"><img :src="edit" /></div>
        </div>
        <div class="nickname">
          <p>{{ user.first_name + ' ' + user.last_name }}</p>
        </div>
        <div class="mail">
          <p>{{ user.email }}</p>
        </div>
      </div>
      <div class="places">
        <h1>Nearby places</h1>
        <div class="place">
          <div>
            <h3>Mesa Mobile Thinking</h3>
            <p>Rua Manoel Borba, 38, Recife-PE</p>
          </div>
          <div class="fav">
            <a :class="saved" href="#" @click.prevent="save">
              <svg height="28px" viewBox="0 -10 511.98685 511" width="28px" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#666"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <google-map class="map" />
  </div>
</template>
<script>

import GoogleMap from '../components/GoogleMap'
import { api } from '../utils/api'
import edit from '@/assets/img/pencil.svg'
import star from '@/assets/img/star.svg'

export default {
  name: 'Home',
  components: {
    GoogleMap
  },
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
      },
      edit: edit,
      star: star,
      saved: ''
    }
  },
  async mounted () {
    try {
      const response = await api.get('/users/2')
      this.user.first_name = response.data.data.first_name
      this.user.last_name = response.data.data.last_name
      this.user.email = response.data.data.email
      this.user.avatar = response.data.data.avatar
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    save () {
      const item = document.querySelector('.fav a')
      if (item.classList.contains('saved')) {
        this.saved = ''
      } else {
        this.saved = 'saved'
      }
    }
  }
}
</script>
<style lang='scss'>
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
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px auto 20px auto;
      border: 5px solid #FFF;
      position: relative;
      color: #FFF;
      background: rgba(0, 0, 0, 0) linear-gradient(40deg, rgb(254, 27, 96) 0%, rgb(232, 29, 29) 100%) repeat scroll 0% 0%;
      background-clip: padding-box;
      border-radius: 50%;
      max-width: 145px;
      min-height: 145px;
      max-height: 145px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
      cursor: pointer;

      &:hover .edit {
        opacity: 1;
      }
      .edit {
        opacity: 0;
        position: absolute;
        background: #FFF;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        right: 0;
        bottom: 0;
        p {
          margin-top: 45%;
        }
        img {
          width: 22px;
          height: 22px;
          border-radius: 0;
          margin-top: 20%;
        }
      }
      img {
        border-radius: 50%;
      }
    }
    .nickname {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: #555;
      margin-bottom: 3px;
    }
    .mail {
      text-align: center;
      color: #555;
    }
  }
  .places {
    height: 60vh;
    width: 80%;
    background: #eee;
    margin: 50px auto;
    border-radius: 20px;
    overflow: hidden;
    // padding: 20px;
    h1 {
      text-align: center;
      padding: 10px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      width: 100%;
      background: rgba(0, 0, 0, 0) linear-gradient(40deg, rgb(254, 27, 96) 0%, rgb(232, 29, 29) 100%) repeat scroll 0% 0%;
      color: #FFF;
      text-transform: uppercase;
      font-size: 26px;
    }
    .place {
      padding: 20px 0;
      &:not(:last-child) {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }
      text-indent: 15px;
      display: flex;
      align-items: center;
      .saved {
        path {
          fill: #ffc107;
        }
      }
      h3 {
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
    }
  }
</style>
