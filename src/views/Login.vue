<template>
  <div class='login'>
    <div class='LoginWrapper'>
      <div class='brand'>
        <img src='../assets/img/mesa.png' alt='Mesa Mobile Thinking'>
      </div>
      <h1>Sign in</h1>
      <form @submit.prevent='login'>
        <label for='email'>E-mail</label>
        <input type='email' v-model='form.email' name='email' placeholder='exemple@email.com' required/>

        <label for='password'>Password</label>
        <input type='password' v-model='form.password' name='password' placeholder='••••••••' required/>
        <span class='loginError' v-if="validation">Invalid e-mail or password</span>
        <div class='btn-login'>
          <button type='submit'>Login</button>
        </div>
      </form>
      <div class='createacc'>
        <a href>
          <router-link to='/signup'>Create account</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import { AUTH_REQUEST } from '../store/actions/auth'

export default {
  name: 'login',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    validation: false
  }),
  methods: {
    login: function () {
      const { email, password } = this.form
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(r => {
        const { token } = r
        localStorage.setItem('user-token', token)
        this.$root._router.push('/Home')
      }).catch(() => {
        this.validation = true
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .LoginWrapper {
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
      .loginError {
        color: red;
        font-size: .8rem;
      }
      .btn-login {
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
