<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2 class="mt-3">{{team.name}}</h2>
          <b-badge variant="warning" class="mr-1 mb-3" v-for="skill in team.skillset" :key="skill._id">
            {{skill.skill}} - {{convertSkill(skill.level)}}
          </b-badge>
        <div class="mb-5">
          <b-button variant="primary" v-if="canJoin && !alreadyJoin" @click="joinTeam">
            Join
          </b-button>
          <b-button
            variant="primary"
            class="mr-2" 
            v-if="team.ownerId._id === $store.state.user._id && team.eventId.status === 'open'" 
            @click="lockTeam">
            Lock Team
          </b-button>
          <b-button 
            variant="outline-danger"
            v-if="team.ownerId._id === $store.state.user._id && team.eventId.status === 'open'" 
            @click="deleteTeam">
            Delete
          </b-button>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="8" xl="9">
        <div class="mb-5">
          <h4>Members</h4>
          <hr/>
          <div class="d-flex flex-wrap">
            <div
              v-for="(member,index) in team.members" 
              :key="index"
              class="mr-3 mb-3"
            >
              <div v-if="member._id === team.ownerId._id" class="member-wrapper team-lead">
                <div class="d-flex">
                  <div @click="$router.push(`/users/${member._id}`)" class="user-pict">
                    <img :src="member.pict" alt="">
                  </div>
                  <div class="mb"><i class="fas fa-crown"></i> &nbsp;{{member.name}}</div>
                </div>
              </div>
              <div v-else class="member-wrapper">
                <div class="d-flex">
                  <div @click="$router.push(`/users/${member._id}`)" class="user-pict">
                    <img :src="member.pict" alt="">
                  </div>
                  <div>
                    <div>{{member.name}}</div>
                    <b-button
                      variant="outline-danger"
                      class="mr-1"
                      v-if="$store.state.user._id === team.ownerId._id && team.eventId.status === 'open'"
                      size="sm"
                      @click="removeMemberFromTeam(member._id)">
                      <i class="fas fa-times"></i> Remove
                    </b-button>
                    <b-button
                      variant="outline-primary"
                      v-if="$store.state.user._id === team.ownerId._id && team.eventId.status === 'ended'" 
                      size="sm" v-b-modal.modal-review @click="currentReview = member._id">
                      <i class="fas fa-star"></i> Review
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div>
          <h4>Applicants</h4>
          <hr/>
          <div class="d-flex flex-wrap">
            <div
              v-for="applicant in team.applicants" 
              :key="applicant._id"
              class="mr-3 mb-3"
            >
              <div class="member-wrapper">
                <div class="d-flex">
                  <div @click="$router.push(`/users/${applicant._id}`)" class="user-pict">
                    <img :src="applicant.pict" alt="">
                  </div>
                  <div>
                    <div>{{applicant.name}}</div>
                    <b-button
                      variant="outline-primary"
                      class="mr-1"
                      v-if="team.ownerId._id === $store.state.user._id"
                      size="sm" 
                      @click="addMemberToTeam(applicant._id)">
                      <i class="fas fa-plus"></i>
                      Add Member
                    </b-button>
                    <b-button
                      variant="outline-danger"
                      v-if="team.ownerId._id === $store.state.user._id || applicant._id === $store.state.user._id"
                      size="sm" 
                      @click="removeApplicantFromTeam(applicant._id)">
                      <i class="fas fa-times"></i>
                      Remove Member
                    </b-button>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="4" xl="3">
        <div 
          v-if="userRecommendation.length > 0 && 
          team.ownerId._id === $store.state.user._id &&
          team.eventId.status === 'open'">
          Recommended User
          <hr/>
          <div class="recomendation-wrapper" v-for="user in userRecommendation" :key="user._id">
            <div
              class="d-flex align-items-center"
              style="width: 100%"
              v-if="user._id !== team.ownerId._id">
              <div class="user-pict">
                <img :src="user.pict" alt="">
              </div>
              <strong>{{user.name}}</strong>
              <b-button
                style="margin-left: auto"
                v-if="team.eventId.status === 'open'"
                size="sm" 
                @click="inviteUser(user._id)">
                <i class="fas fa-paper-plane"></i> Invite
              </b-button>
            </div>
            <b-badge variant="warning" class="ml-1 mt-3 mb-5" v-for="skill in user.skillset" :key="skill._id">
              <div class="wrappe" v-if="user._id !== team.ownerId._id">
                {{skill.skill}} - {{convertSkill(skill.level)}}
              </div>
            </b-badge>
          </div>
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
              <select class="custom-select ml-3" id="dropdown-performance" v-model="pickRate">
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
    },
    convertSkill (e) {
      if(e == 1) return 'Beginner'
      else if(e == 2) return 'Intermediate'
      else if(e == 3) return 'Advance'
      else if(e == 4) return 'Expert'
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

<style scoped>
ul {
  padding: 0;
}
.user-pict {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}
.user-pict img {
  width: 100%;
}
.member-wrapper {
  width: 100%;
  border: 1px solid #c2c2c2;
  border-radius: 8px;
  padding: 0.8rem;
  cursor: pointer;
  transition: 0.4s box-shadow;
}
.member-wrapper:hover {
  box-shadow: 0 20px 10px -20px rgba(0, 0, 0, 0.8);
  transition: 0.4s box-shadow;
}
.member-wrapper.team-lead {
  background-color: #FEC244;
}
</style>