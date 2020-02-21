<template>
  <div style="background-color: #fff">
    <b-container>
      <b-row>
        <b-navbar id="nav-wrapper" style="display: flex; justify-content: space-between; width: 100%;">
          <b-navbar-brand href="#" style="display:flex; align-items:center">
            <img class="img-logo mr-2" src="@/assets/coding.png" alt="" fluid />
            <div class="text-logo">Colabs</div>
            <div>Hackathon Portal</div>
          </b-navbar-brand>
        <!-- </b-navbar>
        <b-navbar> -->
          <b-navbar-nav>
            <!-- <b-nav-item href="#" @click.prevent="changePage('listArticle')">Home</b-nav-item> -->
            <b-nav-item href="#">Login</b-nav-item>
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Register" right>
              <b-dropdown-item href="#">
                <b-nav-item href="#">Register as User</b-nav-item>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <b-nav-item href="#">Register as Organizer</b-nav-item>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <!-- <b-nav-item href="#" @click.prevent="signOut">Sign Out</b-nav-item> -->
          </b-navbar-nav>
        </b-navbar>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {

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
  }
</style>
