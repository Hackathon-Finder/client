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
            <img src="https://picsum.photos/500" alt="">
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
              />
              <div class="mb-3">
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
              />
              <div class="mb-3">
                <b-input class="mb-3" v-model="event.team_size" />
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
              <b-button variant="primary" v-if="canCreateTeam">Create Team</b-button>
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
      selected: '',
      fromDate: '',
      toDate: '',
      rawFromDate: null,
      rawToDate: null,
      editFromDate: false,
      editToDate: false,
      popup: '',
      isEdit: 'notEditable',
      isShow: 'editable',
      options: [
        { text: 'Open', value: 'open' },
        { text: 'Started', value: 'started' },
        { text: 'Ended', value: 'ended' }
      ]
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
          console.log(data)
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
      console.log(payload)
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
      return this.event.team_size + ' Person'
    },
    canCreateTeam () {
      const role = this.role
      const id = this.$store.state.user.id
      if (role === 'user') {
        // return true
        if (this.event.teams.includes(id) || this.event.applicants.includes(id)) {
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
