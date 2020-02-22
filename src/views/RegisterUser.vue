<template>
  <b-container class="bv-example-row">
    <b-row align-h="center" align-v="center" style="height:calc(100vh - 4.6rem)">
      <b-col>
        <div style="display: flex; justify-content:center; align-items:center;">
          <div class="image-wrapper">
            <img src="@/assets/register-user.jpg" alt="">
          </div>
          <b-form id="form-wrapper" @submit.prevent="registerUser" style="text-align: right">
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
                  <b-icon icon="person"></b-icon>
                </div>
              </div>
              <input
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="Full Name"
                required
              >
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <b-icon icon="phone"></b-icon>
                </div>
              </div>
              <input
                v-model="form.hp"
                type="text"
                class="form-control"
                placeholder="Phone Number"
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

            <b-button type="submit" variant="primary">Register</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'RegisterUser',
  data () {
    return {
      form: {
        role: 'user',
        password: '',
        name: '',
        email: '',
        hp: ''
      }
    }
  },
  methods: {
    registerUser () {
      this.$store.dispatch('registerUser', this.form)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: 'Register Successful, Welcome',
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
    z-index: -1;
  }
  .image-wrapper img {
    height: 500px;
  }
  #form-wrapper {
    padding: 2rem;
    border: 1px #d6d6d6 solid;
    border-radius: 4px;
    background-color: #fff;
    margin-left: -50px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }

  @media only screen and (max-width: 768px) {
    #form-wrapper {
      margin-left: 0;
    }
    .image-wrapper {
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -2;
      background-image: url("../assets/register-user.jpg");
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
      background-color: rgba(0, 0, 0, 0.3);
    }
    .image-wrapper img {
      display: none;
    }
  }

</style>
