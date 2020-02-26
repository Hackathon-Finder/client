<template>
  <div>
    <User v-if="user.role == 'user'" />
    <Organizer v-else-if="user.role == 'organizer'" />
  </div>
</template>

<script>
import Organizer from '../components/OrganizerProfile'
import User from '../components/UserProfile'
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  components: {
    Organizer, User
  }
}
</script>

<style scoped>

.editable:disabled {
  background-color: white
}

.editable {
  padding: 0;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid black
}
.editable:focus {
  box-shadow: none
}
</style>
