<template>
  <b-container>
    <b-row>
      <b-col>
        `<b-form @submit.prevent="onSubmit" class="input-form">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon icon="envelope"></b-icon>
              </div>
            </div>
            <input v-model="form.email" type="text" class="form-control" placeholder="Email">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon icon="award"></b-icon>
              </div>
            </div>
            <input v-model="form.organization" type="text" class="form-control" placeholder="Organization">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon icon="person"></b-icon>
              </div>
            </div>
            <input v-model="form.name" type="text" class="form-control" placeholder="Full Name">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon icon="phone"></b-icon>
              </div>
            </div>
            <input v-model="form.hp" type="text" class="form-control" placeholder="Phone Number">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon icon="lock"></b-icon>
              </div>
            </div>
            <input v-model="form.password" type="password" class="form-control" placeholder="Password">
          </div>
          <b-button type="submit" variant="primary">Register</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import swal from 'sweetalert2'

export default {
  data () {
    return {
      form: {
        name: '',
        organization: '',
        email: '',
        password: '',
        hp: '',
        role: 'Organizer'
      }
    }
  },
  methods: {
    onSubmit (evt) {
      this.$store.dispatch('registerOrganizer', this.form)
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
      this.name = ''
      this.organization = ''
      this.email = ''
      this.password = ''
      this.hp = ''
    }
  }
}
</script>

<style scoped>

.input-form {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

</style>
