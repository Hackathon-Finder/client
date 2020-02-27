<template>
  <div>
    <div id="image-wraper"></div>
    <b-container class="text-center" id="content">
      <div class="p-5 mt-5 mb-3 text-center">
        <b-button variant="link" class="title">
          <h2 class="mr-3">
            <i class="fas fa-laptop-code mr-3"></i>
            <strong>hackathons in Indonesia</strong>
          </h2>
        </b-button>
      </div>
      <!-- <Search class="mt-5 mb-5" /> -->
      <CardList v-for="event in getAllOpen" :key="event._id" :event="event" />
      <h1 class="p-5" v-if="getAllStart.length !== 0">Event started</h1>
      <CardList v-for="event in getAllStart" :key="event._id" :event="event" />
      <h1 class="p-5" v-if="getAllEnd.length !== 0">Event ended</h1>
      <CardList v-for="event in getAllEnd" :key="event._id" :event="event" />
    </b-container>
  </div>
</template>

<script>
import CardList from './CardList'
import Search from './Search'

export default {
  components: {
    CardList, Search
  },
  computed: {
    getAllOpen () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'open') result.push(events[i])
      }

      return result
    },
    getAllStart () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'started') result.push(events[i])
      }

      return result
    },
    getAllEnd () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'ended') result.push(events[i])
      }
      return result
    }
  },
  created () {
    this.$store.dispatch('getAllEvents')
  }
}
</script>

<style scoped>

#image-wraper {
  height: 300px;
  background-image: url("../assets/home.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.title {
  color: white;
  font-family: 'Rajdhani', arial;
  margin-bottom: 0;
  text-decoration: none;
  cursor: auto
}

.title:hover {
  border-bottom: 1px solid white;
  border-right: 1px solid white
}

#image-wraper::after {
  background-color: rgba(222, 0, 0, 0.3);
}  

h1 {
  font-family: 'Rajdhani', arial;
  font-weight: bold;
  font-size: 3rem;
  color: #6d6f71
}

#content {
  margin-top: -300px;
}

h2 {
  color: white;
  font-family: 'Rajdhani', arial;
  margin-bottom: 0;
}
</style>
