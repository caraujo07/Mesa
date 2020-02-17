<template>
  <div class='signup'>
    <div class='signupWrapper'>
      <div class='brand'>
        <img src='../assets/img/mesa.png' alt='Mesa Mobile Thinking'>
      </div>
      <h1>Sign up</h1>
      <form @submit.prevent='signup'>
        <label for='email'>E-mail</label>
        <input type='email' v-model='form.email' name='email' placeholder='exemple@email.com' required/>

        <label for='password'>Password</label>
        <input type='password' v-model='form.password' name='password' placeholder='••••••••' required/>
        <span :class="validationMessage ? 'cad' : 'error'" v-if='validation'> {{ message }} <span class='cad' v-if='validationMessage'>{{ countDown }}...</span> </span>

        <div class='btn-register'>
          <button type='submit'>Register</button>
        </div>
      </form>
      <div class='createacc'>
        <a href>
          <router-link to='/'>Back to login</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import { api } from '../utils/api'

export default {
  name: 'signup',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    validation: false,
    validationMessage: false,
    countDown: 5,
    message: ''
  }),
  methods: {
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        this.$root._router.push('/')
      }
    },
    signup: function () {
      const { email, password } = this.form
      api.post('/register', {
        email: email,
        password: password
      }).then(res => {
        this.validation = true
        this.validationMessage = true
        this.message = 'Success! redirecting in '
        this.countDownTimer()
      }).catch(() => {
        this.validation = true
        this.message = 'User already exists!'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .signup {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    .signupWrapper {
      background:#fff none repeat scroll 0% 0%;
      box-shadow:rgba(0,0,0, .1) 0px 6px 12px;
      border-radius: 8px;
      padding: 80px 50px 50px 50px;
      position: relative;
      h1 {
        text-align: center;
        margin: 10px auto;
        color:rgb(100, 100, 100);
      }
      .brand {
        text-align: center;
        border-radius: 50%;
        height: 120px;
        width: 120px;
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translate(-50%, 0);
        background:#fff none repeat scroll 0% 0%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
        img {
          max-width: 100%;
          height: auto;
          padding: 20px;
        }
      }
      .cad {
        color: green;
        font-size: .8rem;
      }
      .error {
        color: red;
        font-size: .8rem;
      }
      .btn-register {
        align-self: flex-end;
        button {
          padding: 10px 20px;
          margin-top: 10px;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          color: #FFF;
          font-weight: bold;
          background: rgba(0, 0, 0, 0) linear-gradient(40deg, rgb(254, 27, 96) 0%, rgb(232, 29, 29) 100%) repeat scroll 0% 0%;
          &:hover {
           background: rgba(0, 0, 0, 0) linear-gradient(40deg, rgb(254, 30, 80) 0%, rgb(232, 15, 15) 100%) repeat scroll 0% 0%;
          }
          &:focus {
            outline: none;
          }
        }
      }
      .createacc {
        text-align: center;
        margin: 20px auto 0px auto;
        display: block;
        a {
          color: rgb(100, 100, 100);
          font-size: 14px;
          &:hover {
            opacity: .8;
          }
        }
      }
    }
    form {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      label {
        font-weight: bold;
        color: rgb(100, 100, 100);
        font-size: 14px;
      }
      input {
        border: 1px solid transparent;
        border-radius: 4px;
        padding: 10px 30px 10px 10px;
        margin: 5px 0;
        width: 100%;
        background: #EEE;
        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
    }
  }

</style>
