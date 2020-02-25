<template>
  <div style="background-color: #fff">
    <b-container>
      <b-row>
        <b-navbar id="nav-wrapper" style="display: flex; justify-content: space-between; width: 100%;">
          <b-navbar-brand id="brand-text" to='/' style="display:flex; align-items:center">
            <img class="img-logo mr-2" src="@/assets/coding.png" alt="Colabs Logo" title="Colabs" fluid />
            <div class="text-logo">Colabs</div>
            <div class="subtext-logo">Hackathon Portal</div>
          </b-navbar-brand>
        <!-- </b-navbar>
        <b-navbar> -->
          <b-navbar-nav v-if="!this.isLogin">
            <!-- <b-nav-item href="#" @click.prevent="changePage('listArticle')">Home</b-nav-item> -->
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item-dropdown text="Register" right>
              <b-dropdown-item href="#">
                <b-nav-item to="/register-user">Register as User</b-nav-item>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <b-nav-item to="/register-organizer">Register as Organizer</b-nav-item>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <!-- <b-nav-item href="#" @click.prevent="signOut">Sign Out</b-nav-item> -->
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <!-- <b-nav-item href="#" @click.prevent="changePage('listArticle')">Home</b-nav-item> -->
            <b-nav-item to="/profile" >Profile</b-nav-item>
            <b-nav-item @click.prevent="logout">Logout</b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  methods: {
    logout () {
      swal.fire({
        title: 'Are you sure to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      }).then(result => {
        if (result.value) {
          swal.fire({
            title: 'Success!',
            text: 'See you soon.....',
            icon: 'success',
            confirmButtonText: 'Oke'
          })
          localStorage.removeItem('token')
          this.$store.commit('SET_LOGIN', false)
          this.$router.push('/')
        }
      })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
  .img-logo {
    height: 2.2rem !important;
  }
  .text-logo {
    font-family: 'Rajdhani', arial;
    font-weight: bold;
    font-size: 1.8rem;
    margin-right: 1rem;
  }
  @media only screen and (max-width: 768px) {
    #nav-wrapper {
      background-color: #fff;
    }
    #brand-text .subtext-logo {
      display: none !important;
    }
  }
</style>
