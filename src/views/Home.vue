<template>
  <div class="home border">
    <OrganizerHome v-if="userStatus.role == 'Organizer'" />
    <UserHome v-else-if="userStatus.role == 'User'" />
  </div>
</template>

<script>
import OrganizerHome from '../components/OrganizerHome'
import UserHome from '../components/UserHome'

export default {
  name: 'Home',
  components: {
    OrganizerHome, UserHome
  },
  computed: {
    userStatus () {
      return this.$store.state.user
    },
    getAllEvents () {
      return this.$store.state.events
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #f8f8f8;
}
</style>
