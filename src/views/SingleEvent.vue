<template>
  <div>
    <b-container class="mt-3">
      <b-row>
        <b-col cols="12">
          <h2 @click="handleEditable" :class="isShow" :title="popup">{{event.title}}</h2>
          <div :class="isEdit">
            <b-input
              class="editable-header"
              v-model="event.title"
            />
            <div class="my-3">
              <b-button
                class="mr-2"
                variant="outline-secondary"
                @click="handleEditable"
              >Cancel
              </b-button>
              <b-button
                variant="outline-primary"
                @click="updateField('title')">Update</b-button>
            </div>
          </div>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="8" xl="9" class=" mb-3">
          <div class="img-wrapper">
            <img :src="event.pictures" alt="">
          </div>
        </b-col>
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="4"
          xl="3"
        >
          <b-row>
            <b-col sm="6" lg="12">
              <infoItem
                :title="popup"
                :icon="'far fa-calendar-check'"
                :header="'From'"
                :content="fromDate"
                @click.native="handleEditFromDate"
              />
              <b-calendar
                hide-header
                class="mb-3"
                block
                width="100%"
                :min="today"
                value-as-date
                v-model="rawFromDate"
                v-if="editFromDate">
                <div class="d-flex">
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    class="ml-auto"
                    @click="setDate"
                  >
                    Set Date
                  </b-button>
                </div>
              </b-calendar>
            </b-col>
            <b-col sm="6" lg="12">
              <infoItem
                :title="popup"
                :icon="'far fa-calendar-times'"
                :header="'To'"
                :content="toDate"
                @click.native="handleEditToDate"
              />
              <b-calendar
                hide-header
                class="mb-3"
                block
                width="100%"
                :min="new Date(event.date[0])"
                value-as-date
                v-model="rawToDate"
                v-if="editToDate">
                <div class="d-flex">
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    class="ml-auto"
                    @click="setDate"
                  >
                    Set Date
                  </b-button>
                </div>
              </b-calendar>
            </b-col>
            <b-col sm="6" lg="12">
              <infoItem
                :title="popup"
                :icon="'far fa-hourglass'"
                :header="'Status'"
                :content="event.status"
                @click.native="handleEditStatus"
              />
              <div class="mb-3" v-if="editStatus">
                <b-form-group label="Status">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    name="Status"
                    stacked
                  ></b-form-radio-group>
                <div class="d-flex">
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    class="ml-auto"
                    @click="setStatus"
                  >
                    Set Status
                  </b-button>
                </div>
                </b-form-group>
              </div>
            </b-col>
            <b-col sm="6" lg="12">
              <infoItem
                :title="popup"
                :icon="'far fa-address-card'"
                :header="'Max Member'"
                :content="maxPerson"
                @click.native="handleEditTeamSize"
              />
              <div class="mb-3" v-if="editTeamSize">
                <b-input class="mb-3" v-model="event.max_size" />
                <div class="d-flex">
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    class="ml-auto"
                    @click="updateField('team_size')"
                  >
                    Set Max Member
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="block-wrapper">
            <h2>Event Summary</h2>
            <hr />
            <span @click="handleEditable" :class="isShow" :title="popup" v-html="event.summary">
            </span>
            <div :class="isEdit">
              <wysiwyg v-model="event.summary" />
              <div class="my-3">
                <b-button
                  class="mr-2"
                  variant="outline-secondary"
                  @click="handleEditable"
                >Cancel
                </b-button>
                <b-button
                  variant="outline-primary"
                  @click="updateField('summary')">Update</b-button>
              </div>
            </div>
          </div>
          <div class="flex-column align-items-end block-wrapper">
            <div class="d-flex justify-content-between">
              <h2>Participant</h2>
              <b-button 
                variant="primary" 
                v-if="canCreateTeam"
                v-b-modal.modal-create-team
              >Create Team</b-button>
            </div>
            <hr />
            <div>
              Locked Team
            </div>
            <div class="team-locked mb-3" v-for="team in event.teams" :key="team.id">
              <div v-if="event.teams.length > 0">
                <TeamItem :team="team" />
              </div>
              <div v-else>
                No Teams locked
              </div>
            </div>
            <hr />
            <div class="mb-3">
              Open Team
            </div>
            <div 
              class="team-locked mb-3" 
              v-for="team in event.applicants" 
              :key="team.id"
              style="border: 1px solid; padding: 1rem; border-radius: 8px;"
            >
              <TeamItem :team="team" />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <b-modal id="modal-create-team" title="Create Team" hide-footer>
        <b-form id="form-wrapper" @submit.prevent="createTeam">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="far fa-id-card"></i>
              </div>
            </div>
            <input
              v-model="teamName"
              class="form-control"
              placeholder="Team Name"
              required
            >
          </div>
          <ul 
            v-for="set in createdTeamSkillSet" 
            :key="set.id"
          >
            <li>{{set.skill}} | {{set.level}}</li>
          </ul>
          <div class="d-flex justify-content-between">
            <select id="dropdown-skills" @click="pickSkill" class="flex-grow:1">
              <option disabled selected>Pick Skill</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="Phyton">Phyton</option>
              <option value="C#">C#</option>
              <option value="PHP">PHP</option>
              <option value="C++">C++</option>
              <option value="C">C</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Ruby">Ruby</option>
              <option value="Swift">Swift</option>
              <option value="Go">Go</option>
              <option value="Kotlin">Kotlin</option>
            </select>
            <select id="dropdown-level" @click="pickLevel" flex-grow="1">
              <option disabled selected>Pick Level</option>
              <option value="1">Beginner</option>
              <option value="2">Intermediate</option>
              <option value="3">Advance</option>
              <option value="4">Expert</option>
            </select>
            <b-button variant="outline-primary" @click="addSkillSet">Add Skill Set</b-button>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <b-button @click.prevent="createTeam" variant="primary">Create</b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import InfoItem from '../components/InfoItem'
import TeamItem from '../components/TeamItem'
import moment from 'moment'

export default {
  data () {
    return {
      event: {},
      fromDate: '',
      toDate: '',
      rawFromDate: null,
      rawToDate: null,
      editFromDate: false,
      editToDate: false,
      editStatus: false,
      editTeamSize: false,
      popup: '',
      isEdit: 'notEditable',
      isShow: 'editable',
      teamName: '',
      selected: '',
      options: [
        { text: 'Open', value: 'open' },
        { text: 'Started', value: 'started' },
        { text: 'Ended', value: 'ended' }
      ],
      createdTeamSkillSet: [],
      skillSet: {
        skill: '',
        level: ''
      }
    }
  },
  name: 'SingleEvent',
  components: {
    InfoItem,
    TeamItem
  },
  methods: {
    fetchEvent () {
      this.$store.dispatch('getSingleEvent', this.$route.params.id)
        .then(({ data }) => {
          this.event = data
          this.fromDate = moment(data.date[0]).format('DD MMMM YYYY')
          this.toDate = moment(data.date[1]).format('DD MMMM YYYY')
          this.rawFromDate = data.date[0]
          this.rawToDate = data.date[1]
          this.selected = data.status
          if (this.role === 'user') {
            this.popup = ''
          } else if (this.role === 'organizer') {
            this.popup = 'Click to edit'
          }
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    handleEditFromDate () {
      if (this.role === 'user') {
        return false
      } else if (this.role === 'organizer' && this.event.status === 'open') {
        if (this.editFromDate === true) {
          this.editFromDate = false
        } else {
          this.editFromDate = true
        }
      }
    },
    handleEditToDate () {
      if (this.role === 'user') {
        return false
      } else if (this.role === 'organizer' && this.event.status === 'open') {
        if (this.editToDate === true) {
          this.editToDate = false
        } else {
          this.editToDate = true
        }
      }
    },
    handleEditStatus () {
      if (this.role === 'user') {
        return false
      } else if (this.role === 'organizer') {
        if (this.editStatus === true) {
          this.editStatus = false
        } else {
          this.editStatus = true
        }
      }
    },
    handleEditTeamSize () {
      if (this.role === 'user') {
        return false
      } else if (this.role === 'organizer' && this.event.status === 'open') {
        if (this.editTeamSize === true) {
          this.editTeamSize = false
        } else {
          this.editTeamSize = true
        }
      }
    },
    handleEditable () {
      if (this.isEdit === 'notEditable') {
        this.isEdit = 'editable'
        this.isShow = 'notEditable'
      } else {
        this.isEdit = 'notEditable'
        this.isShow = 'editable'
      }
    },
    updateField (field) {
      const payload = {
        _id: this.$route.params.id,
        data: {
          [field]: ''
        }
      }
      payload.data[field] = this.event[field]
      this.$store.dispatch('updateEvent', payload)
        .then(result => {
          this.fetchEvent()
        })
        .catch(err => {
          this.fetchEvent()
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
      this.isEdit = 'notEditable'
      this.isShow = 'editable'
      // this.$store.dispatch('updateOne', payload)
    },
    setDate () {
      const payload = {
        _id: this.$route.params.id,
        data: {
          date: [this.rawFromDate, this.rawToDate]
        }
      }
      this.$store.dispatch('updateEvent', payload)
        .then(result => {
          this.fetchEvent()
          this.editFromDate = false
          this.editToDate = false
        })
        .catch(err => {
          this.fetchEvent()
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    setStatus () {
      const payload = {
        _id: this.$route.params.id,
        data: this.selected
      }
      this.$store.dispatch('updateStatus', payload)
        .then(result => {
          this.fetchEvent()
        })
        .catch(err => {
          this.fetchEvent()
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    pickSkill (event) {
      this.skillSet.skill = event.target.value
    },
    pickLevel (event) {
      this.skillSet.level = event.target.value
    },
    addSkillSet () {
      const skillset = {...this.skillSet}
      this.createdTeamSkillSet = [...this.createdTeamSkillSet, skillset]
    },
    createTeam () {
      const payload = {
        id: this.$route.params.id,
        name: this.teamName,
        ownerId: this.$store.state.user._id,
        max_size: this.event.team_size,
        skillset: this.createdTeamSkillSet
      }

      this.$store.dispatch('createTeam', payload)
        .then(({data}) => {
          return this.$store.dispatch('addMember', {userId: this.$store.state.user._id, teamId: data._id})
        })
        .then(({data}) => {
          return this.$store.dispatch('addApplicant', {id: this.$route.params.id, teamId: data._id})
        })
        .then(({data}) => {
          this.fetchEvent()
          this.$bvModal.hide('modal-create-team')
        })
        .catch(err => {
          this.fetchEvent()
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    }
  },
  created () {
    this.fetchEvent()
  },
  computed: {
    role () {
      return this.$store.state.user.role
    },
    today () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return new Date(today)
    },
    maxPerson () {
      return this.event.max_size + ' Person'
    },
    canCreateTeam () {
      const role = this.role
      const id = this.$store.state.user._id
      if (role === 'user') {
        // return true

        if ((this.event.teams && this.event.teams.includes(id)) || (this.event.teams && this.event.applicants.includes(id))) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .img-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .img-wrapper img {
    width: 100%;
    border-radius: 8px;
  }
  .info-wrapper {
    display: flex;
    justify-content: center;
  }
  .block-wrapper {
    padding: 1rem;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #c2c2c2;
    margin-bottom: 1rem;
    /* box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.2) */
  }
  hr {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
  }
  .notEditable {
    display: none;
  }
  .editable {
    display: block;
  }
  .editable-header {
    border: none;
    border-bottom: 1px solid #c2c2c2;
    font-size: 1.8rem;
    padding: 0;
  }
  .editable-header:focus {
    border-radius: 0;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
</style>
