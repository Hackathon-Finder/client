<template>
  <b-container class="landing" >
    <b-row>
      <b-col id="content">
          <p id="title">Welcome to hackathon profesionnal finder and team builder</p>
            <b-button-group vertical>
              <b-button class="mb-4" @click.prevent="searchRouter">
                <b-icon icon="search" class="mr-2"></b-icon> Search hackathon event</b-button>
              <b-button @click.prevent="createRouter">
                <b-icon icon="pen" class="mr-2"></b-icon> Create hackathon event</b-button>
            </b-button-group>
      </b-col>
      <b-col id="content-image">
        <div id="image-wraper">
          <img src="../assets/landing.jpg" id="image" alt="Responsive image">
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {
    searchRouter () {
      
    },
    createRouter () {
      if (localStorage.getItem('token')) this.$router.push('/')
      else this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.landing {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 90vh;
  width: 100vw;
  overflow: scroll;
  align-items: center !important;
  justify-content: center;
  display: flex;
}

#title {
  font-size: 2.4rem;
  color: #0e32ad;
  /* padding-top: 7rem; */
  padding-bottom: 4rem
}

#image-wraper {
  height: 400px;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow: hidden;
}

#content {
  flex: 0 0 58.333333%;
  max-width: 58.333333%;
}
#content-image {
  flex: 0 0 41.666667%;
  max-width: 41.666667%;
}

#image {
  height: 350px;
}

.btn-group-vertical > .btn, .btn-group-vertical > .btn-group {
  background-color:#adbbf8 !important;
  font-size: 1.25rem;
  border-radius: 5px !important;
  color: black !important;
  border: 0.5px solid #d6d6d6;
  width: 25rem;
  height: 3.25rem;
  text-align: left;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.2);
}

@media only screen and (max-width: 700px) {
    #image-wraper {
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100vh;
      height: 100vh;
      z-index: -2;
      background-image: url("../assets/landing.jpg");
      /* Position and center the image to scale nicely on all screens */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    #image-wraper img {
      display: none;
    }
    #content {
      max-width: 100%;
      margin-left: 40px
    }
    #image-wraper::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.3)
    }
    #title {
      font-size: 2rem;
      color: white;
      font-weight: bold;
      /* padding-top: 7rem; */
      padding-bottom: 4rem
    }
  }

</style>
