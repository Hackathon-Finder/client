<template>
  <div>
    <div id="image-wraper"></div>
    <b-container class="text-center" id="content">
      <div class="p-5 mt-5 mb-5">
        <b-button @click.prevent="showForm" variant="link" class="addHackhatons">
          <h2 class="mr-3">
            <i class="fas fa-code mr-3"></i> 
            <strong> create hackathons event ?</strong>
          </h2>
        </b-button>
        <div v-if="formAdd == true" class="card mt-5">
          <div class="card-body p-5">
            <b-form id="form-wrapper" @submit.prevent="addEvent">
              <div class="row no-gutters d-flex justify-content-between">
                <div class="col col-md-7 col-sm-12 input-group col-12 mb-4">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="fas fa-laptop-code"></i>
                    </div>
                  </div>
                  <input
                    v-model="form.title"
                    type="text"
                    class="form-control font-weight-bold "
                    placeholder="Event title"
                    required
                  >
                </div>
                <b-form-file
                  style="overflow: hidden"
                  class=" col col-md-4 col-sm-12 col-12 mb-4"
                  v-model="form.pictures"
                  type="file"
                  ref="file"
                  placeholder="Image poster"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </div>
              <div class="row no-gutters d-flex justify-content-between">
                <b-form-datepicker 
                  placeholder="Event started"
                  v-model="form.date_started" 
                  class="col col-md-4 col-sm-12 input-group col-12 text-left mb-4"
                ></b-form-datepicker>
                <b-form-datepicker 
                  :min="new Date(form.date_started)"
                  placeholder="Event ended"
                  v-model="form.date_ended" 
                  class="col col-md-4 col-sm-12 input-group col-12 text-left mb-4"
                ></b-form-datepicker>
                <div class="col col-md-2 col-sm-12 input-group col-12 mb-4">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="fas fa-users"></i>
                    </div>
                  </div>
                  <input
                    v-model="form.team_size"
                    type="number"
                    class="form-control "
                    placeholder="Max. Team"
                    required
                  >
                </div>
              </div>
              <wysiwyg 
                class="mb-4 text-left"
                placeholder="Event summary..."
                v-model="form.summary" />
              <div class="d-flex justify-content-end">
                <b-button type="submit" variant="primary">Add hackathon event</b-button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
      <!-- <Search class="mt-5 mb-5" /> -->
      <CardList v-for="event in getAllOpen" :key="event._id" :event="event" />
      <h1 v-if="getAllStart.length !== 0">Event started</h1>
      <CardList v-for="event in getAllStart" :key="event._id" :event="event" />
      <h1  v-if="getAllEnd.length !== 0">Event ended</h1>
      <CardList v-for="event in getAllEnd" :key="event._id" :event="event" />
    </b-container>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import CardList from './CardList'
import Search from './Search'

export default {
  data () {
    return {
      form: {
        title: "",
        summary: "",
        team_size: null,
        date_started: "",
        date_ended: "",
        pictures: null
      },
      formAdd: false
    }
  },
  methods: {
    showForm () {
      if (this.formAdd == false) this.formAdd = true
      else if (this.formAdd == true) this.formAdd = false
    },
    addEvent () {
      let date = []
      const formData = new FormData()
      formData.append('pictures', this.form.pictures)
      formData.set('title', this.form.title)
      formData.set('summary', this.form.summary)
      formData.set('max_size', this.form.team_size)
      formData.append('date', this.form.date_started)
      formData.append('date', this.form.date_ended)
      
      this.$store.dispatch('addEvents', formData)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: `Success to add hackathon event`,
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('getEventsOrganizer')
          this.formAdd = false
          this.reset()
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    reset () {
      this.form.title = ""
      this.form.summary = ""
      this.form.team_size = null
      this.form.date_started = ""
      this.form.date_ended = ""
      this.form.pictures = null
    }
  },
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
    this.$store.dispatch('getEventsOrganizer')
  }
}
</script>

<style scoped>

.btn-primary {
  background-color: #a27fec;
  border-color: #a27fec;
}

.btn-primary:hover {
  background-color: #5126ad;
  border-color: #5126ad;
}

.addHackhatons {
  color: white;
  font-family: 'Rajdhani', arial;
  margin-bottom: 0;
  text-decoration: none
}

.addHackhatons:hover {
  border-bottom: 1px solid white;
  border-right: 1px solid white
}

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

#content {
  margin-top: -300px;
}

</style>
