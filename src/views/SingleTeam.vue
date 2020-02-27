<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2>{{team.name}}</h2>
        <div class="mb-5">
          <b-button v-if="canJoin && !alreadyJoin" @click="joinTeam">
            Join
          </b-button>
          <b-button
            class="mr-2" 
            v-if="team.ownerId._id === $store.state.user._id && team.eventId.status === 'open'" 
            @click="lockTeam">
            Lock Team
          </b-button>
          <b-button 
            v-if="team.ownerId._id === $store.state.user._id && team.eventId.status === 'open'" 
            @click="deleteTeam">
            Delete
          </b-button>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="8" xl="9">
        <div class="mb-5">
          Members
          <hr/>
          <ul class="members-wrapper" v-for="(member,index) in team.members" :key="index">
            <div v-if="member._id === team.ownerId._id">
              <div>Team Leader</div>
              <div>{{member.name}}</div>
            </div>
            <div v-else >
              <li>
                <span @click="$router.push(`/users/${member._id}`)">{{member.name}}</span>
                <b-button
                  class="ml-3 mr-1"
                  v-if="$store.state.user._id === team.ownerId._id && team.eventId.status === 'open'"
                  size="sm"
                  @click="removeMemberFromTeam(member._id)">
                  <i class="fas fa-times"></i>
                </b-button>
                <b-button
                  class="ml-3"
                  v-if="$store.state.user._id === team.ownerId._id && team.eventId.status === 'ended'" 
                  size="sm" v-b-modal.modal-review @click="currentReview = member._id">
                  Review
                </b-button>
              </li>
            </div>
          </ul>

        </div>
        <div>

          Applicants
          <hr/>
          <ul class="applicant-wrapper" v-for="applicant in team.applicants" :key="applicant._id">
            <li>
              <span @click="$router.push(`/users/${applicant._id}`)">
                {{applicant.name}}
              </span>
              <b-button
                class="ml-3 mr-1"
                v-if="team.ownerId._id === $store.state.user._id"
                size="sm" 
                @click="addMemberToTeam(applicant._id)">
                <i class="fas fa-plus"></i>
              </b-button>
              <b-button
                v-if="team.ownerId._id === $store.state.user._id || applicant._id === $store.state.user._id"
                size="sm" 
                @click="removeApplicantFromTeam(applicant._id)">
                <i class="fas fa-times"></i>
              </b-button>
            </li>
          </ul>
        </div>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="4" xl="3">
        <div 
          v-if="userRecommendation.length > 0 && 
          team.ownerId._id === $store.state.user._id &&
          team.eventId.status === 'open'">
          Recommended User
          <hr/>
          <ul class="recomendation-wrapper" v-for="user in userRecommendation" :key="user._id">
            <div
              class="d-flex justify-content-between"
              style="width: 100%"
              v-if="user._id !== team.ownerId._id">
              <div>
                <strong>{{user.name}}</strong>
              </div>
              <div>
                <b-button
                  v-if="team.eventId.status === 'open'"
                  size="sm" 
                  class="mr-2" 
                  @click="inviteUser(user._id)">
                  Invite
                </b-button>
              </div>
            </div>
          </ul>
        </div>
        <b-modal id="modal-review" title="Review Performance" hide-footer>
          <b-form id="form-wrapper" @submit.prevent="reviewUser">
            <b-form-textarea
              id="textarea"
              v-model="comment"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              class="mb-3"
            ></b-form-textarea>
            <div class="d-flex">
              Performance
              <select class="ml-3" id="dropdown-performance" v-model="pickRate">
                <option disabled selected>Pick performance level</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="d-flex justify-content-end mt-3">
              <b-button @click.prevent="reviewUser" variant="primary">Create</b-button>
            </div>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data () {
    return {
      team: {},
      userRecommendation: [],
      pickRate: 0,
      currentReview: '',
      comment: '',
    }
  },
  methods: {
    getTeam () {
      this.$store.dispatch('getTeam', this.$route.params.id)
        .then(({data}) => {
          this.team = data
          return this.$store.dispatch('getUserRecommendation', data.skillset)
        })
        .then(({data}) => {
          this.userRecommendation = data
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
      this.$store.dispatch('getUserRecommendation', this.team.skillset)
        .then(({data}) => {
          this.userRecommendation = data
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response
          })
        })
    },
    inviteUser (userId) {
      const payload = {
        userId,
        teamId: this.team._id
      }
      //loading disini
      this.$store.dispatch('inviteUser', payload)
        .then(({data})=> {
          swal.fire({
            icon: 'success',
            title: 'Success...',
            text: data.message
          })
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    joinTeam () {
      const payload = {
        id: this.team._id,
        userId: this.$store.state.user._id
      }
      this.$store.dispatch('joinTeam', payload)
        .then(({data}) => {
          this.getTeam()
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    lockTeam () {
      const payload = {
        id: this.team.eventId._id,
        teamId: this.$route.params.id
      }
      const status = {
        id: this.$route.params.id,
        status: 'locked'
      }
      this.$store.dispatch('updateStatusTeam', status)
        .then(_ => {
          return this.$store.dispatch('lockTeam', payload)
        })
        .then(({data}) => {
          this.$router.push(`/events/${this.team.eventId._id}`)
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    deleteTeam () {
      // swal confirmation here
      this.$store.dispatch('deleteTeam', this.$route.params.id)
        .then(({data}) => {
          this.$router.push(`/events/${data.eventId}`)
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    addMemberToTeam (id) {
      if (this.team.team_size >= this.team.max_size) {
        swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Total maximum members reached!'
        })
      } else {
        const payload = {
          id: this.$route.params.id,
          userId: id
        }
        this.$store.dispatch('addMemberToTeam', payload)
          .then(({data}) => {
            this.getTeam()
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
    removeMemberFromTeam (id) {
      const payload = {
        id: this.$route.params.id,
        userId: id
      }
      this.$store.dispatch('removeMemberFromTeam', payload)
        .then(({data}) => {
          this.getTeam()
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    removeApplicantFromTeam (id) {
      const payload = {
        id: this.$route.params.id,
        userId: id
      }
      this.$store.dispatch('removeApplicantFromTeam', payload)
        .then(({data}) => {
          this.getTeam()
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    reviewUser () {
      const payload = {
        id: this.currentReview,
        rank: this.pickRate,
        comment: this.comment,
        teamId: this.team._id
      }
      this.$store.dispatch('reviewUser', payload)
        .then(({data}) => {
          this.$bvModal.hide('modal-review')
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
  },
  computed: {
    canJoin () {
      if (
        this.team.status === 'open' && 
        this.$store.state.user._id !== this.team.ownerId._id &&
        this.$store.state.user.role !== 'organizer') {
        return true
      } else {
        return false
      }
    },
    alreadyJoin () {
      for(let i = 0; i < this.team.members.length; i++) {
        if (this.team.members[i]._id == this.$store.state.user._id) {
            return true;
            break;
        }
      }
      for(let i = 0; i < this.team.applicants.length; i++) {
        if (this.team.applicants[i]._id == this.$store.state.user._id) {
            return true;
            break;
        }
      }
      return false
    }
  }
}
</script>

<style>

</style>