<template>
  <div>
    <ul class="members-wrapper" v-for="member in team.members" :key="member._id">
      <li>{{member.name}}</li>
    </ul>
    <ul class="recomendation-wrapper" v-for="user in userRecommendation" :key="user._id">
      <div v-if="userRecommendation.length <= 0">
        There is no recommendation for you
      </div>
    </ul>
  </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data () {
    return {
      team: {},
      userRecommendation: []
    }
  },
  methods: {
    getTeam () {
      this.$store.dispatch('getTeam', this.$route.params.id)
        .then(({data}) => {
          this.team = data
          console.log(data.skillset, 'ini skillset')
          console.log(this.team, 'ini team')
          return this.$store.dispatch('getUserRecommendation', data.skillset)
        })
        .then(({data}) => {
          this.userRecommendation = data
          console.log(this.userRecommendation)
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    getUserRecommendation () {
      this.$store.dispatch('getUserRecommendation', this.$route.params.id)
        .then(({data}) => {
          this.userRecommendation = data
          console.log(this.userRecommendation)
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    }
  },
  created () {
    this.getTeam()
  }
}
</script>

<style>

</style>