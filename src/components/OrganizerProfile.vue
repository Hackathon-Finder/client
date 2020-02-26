<template>
  <b-container>
    <div class="row">
      <div class="col col-sm-12 col-12 col-md-4">
        <div class="col- d-flex justify-content-center p-3">
          <div class="card" style="border: none"> 
            <img :src="user.pict" class="card-img-top" alt="profile image">
            <div class="p-2 row">
              <div  class="col col-sm-12 col-12 col-md-8">
                <b-form-file
                  v-if="editableImage"
                  style="overflow: hidden"
                  v-model="pict"
                  type="file"
                  ref="file"
                  placeholder="Image"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </div>
              <b-button v-if="!editableImage" @click.prevent="editImage" variant="link" class="edit col col-sm-12 col-12 col-md-4">
                <i class="fas fa-pen"></i> Edit
              </b-button>
              <b-button v-else-if="editableImage" @click.prevent="saveImage" variant="link" class="edit col col-sm-12 col-12 col-md-4">
                <i class="fas fa-save"></i> Save
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-sm-12 col-12 col-md-8">
        <div class="p-3">
          <div>
            <ul class="nav nav-tabs d-flex justify-content-between">
              <li class="nav-item">
                <a class="nav-link active">Detail Profile</a>
              </li>
              <li class="d-flex pl-2 align-items-center">
                <b-button v-if="!editable" @click.prevent="editProfile" variant="link" class="edit">
                  <i class="fas fa-pen pr-1"></i> Edit
                </b-button>
                <b-button v-else @click.prevent="saveProfile" variant="link" class="edit">
                  <i class="fas fa-save pr-1"></i> Save
                </b-button>
              </li>
            </ul>
          </div>
          <div v-if="!editable" class="mt-4">
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="envelope"></b-icon>
              </div>
              <input type="text" class="form-control font-weight-bold" disabled v-model="user.email" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="person"></b-icon>
              </div>
              <input type="text" class="form-control font-weight-bold" disabled v-model="user.name" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="house"></b-icon>
              </div>
              <input v-if="user.organization" type="text" class="form-control font-weight-bold" disabled v-model="user.organization" >
              <p v-else style="border: none" class="form-control font-italic" > add organization </p>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="phone"></b-icon>
              </div>
              <input v-if="user.hp !== ''" type="text" class="form-control font-weight-bold" disabled v-model="user.hp" >
              <p v-else style="border: none" class="form-control font-italic" > add phone number </p>
            </div>
          </div>
          <div v-if="editable" class="mt-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text ico">
                  <b-icon icon="envelope"></b-icon>
                </div>
              </div>
              <input type="text" class="form-control font-weight-bold" disabled v-model="user.email" placeholder="Email" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text ico">
                  <b-icon icon="person"></b-icon>
                </div>
              </div>
              <input type="text" class="form-control font-weight-bold" disabled v-model="user.name" placeholder="Full name" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text ico">
                  <b-icon icon="house"></b-icon>
                </div>
              </div>
              <input type="text" class="form-control" v-model="organization" placeholder="Organization" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text ico">
                  <b-icon icon="phone"></b-icon>
                </div>
              </div>
              <input type="text" class="form-control" v-model="hp" placeholder="Phone number" >
            </div>
          </div>
          <div class="mt-4">
            <ul class="nav nav-tabs d-flex justify-content-between">
              <li class="nav-item">
                <a class="nav-link active">Event history</a>
              </li>
            </ul>
          </div>
          <div class="mt-3 d-flex">
            <p class="mr-4"><strong>{{ getAllOpen }}</strong> Event opened</p>
            <p class="mr-4"><strong>{{ getAllStart }}</strong> Event started</p>
            <p><strong>{{ getAllEnd }}</strong> Event ended</p>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import swal from 'sweetalert2'

export default {
  data() {
    return {
      hp: "",
      pict: null,
      organization: "",
      editable: false,
      editableImage: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    getAllOpen () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'open') result.push(events[i])
      }

      return result.length
    },
    getAllStart () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'started') result.push(events[i])
      }

      return result.length
    },
    getAllEnd () {
      const events = this.$store.state.events
      const result = []

      for (let i = 0; i < events.length; i++) {
        if(events[i].status == 'ended') result.push(events[i])
      }
      return result.length
    }
  },
  created () {
    this.$store.dispatch('getEventsOrganizer')
  },
  methods: {
    editProfile () {
      this.editable = true
    },
    saveProfile () {
      let result = {
        hp: this.hp, 
        organization: this.organization
      }
      this.$store.dispatch('updateUser', result)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: 'Profile updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('loginToken')
          this.hp = data.hp
          this.organization = data.organization
          this.editable = false
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    saveImage () {
      const formData = new FormData()
      formData.append('pict', this.pict)
      this.$store.dispatch('updateUser', formData)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: 'Profile updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('loginToken')
          this.pict = null,
          this.editableImage = false
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    },
    editImage () {
      this.editableImage = true
    }
  }
}
</script>

<style scoped>

.form-control:disabled {
    background-color: white;
    border: none;
}

.form-control {
    border: none;
    border-bottom: 1px solid
}

.ico {
    background-color: white;
    border: none;
    border-radius: 0;
}


.edit {
  text-decoration: none;
  color: #808080
}

.edit:hover {
  text-decoration: none;
  color: #2d2d2d
}

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
