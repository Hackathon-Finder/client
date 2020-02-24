<template>
  <div>
    <div id="image-wraper"></div>
    <b-container class="text-center" id="content">
      <Search class="mt-5 mb-5" />
      <CardList v-for="event in getAllStart" :key="event._id" :event="event" />
      <h1>Event on going</h1>
      <CardList v-for="event in getAllOnGoing" :key="event._id" :event="event" />
      <h1>Event ended</h1>
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
    getAllStart () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'start') result.push(events[i])
      }

      return result
    },
    getAllOnGoing () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'on going') result.push(events[i])
      }

      return result
    },
    getAllEnd () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'end') result.push(events[i])
      }

      return result
    }
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

#image-wraper::after {
  background-color: rgba(222, 0, 0, 0.3);
}  

h1 {
  font-family: 'Rajdhani', arial;
  font-weight: bold;
  font-size: 3rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  color: #6d6f71
}

#content {
  margin-top: -300px;
}
</style>
