<template>
  <div @click="$router.push(`/team/${team._id}`)">
    <div class="d-flex align-items-center header-wrapper">
      <div>{{team.name}}</div>
      <!-- <div class="ml-auto">
        <b-button size="sm" variant="primary" v-if="canJoin">Join</b-button>
      </div> -->
    </div>
    <hr />
    <div class="body-wrapper">
      <h6 class="mb-3">Status: {{team.status}}</h6>
      <h6 class="mb-3">Members: {{team.team_size}}/{{team.max_size}}</h6>
      <p class="mb-3">Skillset :</p>
      <div class="mb-3" v-for="skillset in team.skillset" :key="skillset.id">
        <b-badge pill variant="warning">
          {{skillset.skill}}
        </b-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['team'],
  name: 'TeamItem',
  data () {
    return {
    }
  },
  computed: {
    // canJoin () {
    //   if (
    //     this.team.status === 'open' && 
    //     this.$store.state.user._id !== this.team.ownerId &&
    //     this.$store.state.user.role !== 'organizer') {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  }
}
</script>

<style scoped>
.header-wrapper {
  font-weight: bold;
}
</style>