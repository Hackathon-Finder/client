<template>
  <b-container class="bv-example-row">
    <b-row align-h="center" align-v="center" style="height:calc(100vh - 4.6rem)">
      <b-col>
        <div style="display: flex; justify-content:center; align-items:center;">
          <div class="image-wrapper">
            <img src="@/assets/colabs-login-image.jpg" alt="">
          </div>
          <b-form id="form-wrapper" @submit.prevent="login">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <b-icon icon="envelope"></b-icon>
                </div>
              </div>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              >
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <b-icon icon="lock"></b-icon>
                </div>
              </div>
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              >
            </div>
            <div class="d-flex justify-content-between">
              <g-signin-button
                class="btn btn-primary"
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                  <i class="fab fa-google"></i> | Google
              </g-signin-button>
              <b-button type="submit" variant="primary">Login</b-button>
            </div>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import swal from 'sweetalert2'
import axios from '../server'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        password: '',
        email: ''
      },
      googleSignInParams: {
        client_id: process.env.VUE_APP_GOOGLE_ID
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.form)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: 'Login success, Welcome',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', data.token)
          this.$store.commit('SET_LOGIN', true)
          this.$store.commit('SET_USER', data.user)
          this.reset()
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    reset () {
      this.form.password = ''
      this.form.name = ''
      this.form.hp = ''
      this.form.email = ''
    },
    onSignInSuccess: function (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      axios({
        method: 'post',
        url: `http://localhost:3000/glogin/${idToken}`,
        data: {}
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('userId', data.userId)
          swal.fire(
            'Login success!',
            'You are now logged in',
            'success'
          )
          this.$router.push('/')
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.message
          })
        })
    },
    onSignInError: function (error) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: error
      })
    }
  }
}
</script>

<style scoped>
  .image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    overflow: hidden;
  }
  .image-wrapper img {
    /* position: absolute; */
    /* width: 500px; */
    height: 500px;
    z-index: -1;
  }
  #form-wrapper {
    padding: 2rem;
    border: 1px #d6d6d6 solid;
    border-radius: 4px;
    background-color: #fff;
    text-align: right;
    margin-left: -50px;
    min-width: 340px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
  @media only screen and (max-width: 768px) {
    .image-wrapper {
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -2;
      background-image: url("../assets/colabs-login-image.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .image-wrapper::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .image-wrapper img {
      display: none;
    }
    #form-wrapper {
      margin-left: 0;
    }
  }
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
</style>
