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
      <div class="col col-sm-12 col-12 col-md-8 set-detail">
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
              <input type="text" class="form-control font-weight-bold" disabled id="inlineFormInputGroup" v-model="user.email" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="person"></b-icon>
              </div>
              <input type="text" class="form-control font-weight-bold" disabled id="inlineFormInputGroup" v-model="user.name" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="phone"></b-icon>
              </div>
              <input v-if="user.hp !== ''" type="text" class="form-control font-weight-bold" disabled id="inlineFormInputGroup" v-model="user.hp" >
              <p v-else style="border: none" class="form-control font-italic" id="inlineFormInputGroup" > add phone number </p>
            </div>
            <div class="input-group mb-3">
              <div v-if="user.skillset.length == 0" class="input-group-text ico">
                <i class="fas fa-code"></i>
              </div>
              <div v-if="user.skillset.length !== 0" class="ml-3">
                <button v-for="(skillset, index) in user.skillset" :key="index" 
                  type="button" 
                  class="btn btn-primary btn-sm m-1">
                  {{ skillset.skill }} -
                  {{ convertSkill(skillset.level) }}
                </button>
              </div>
              <input v-if="user.skillset.length !== 0" type="text" class="form-control font-weight-bold" disabled id="inlineFormInputGroup">
              <p v-else style="border: none" class="form-control font-italic" id="inlineFormInputGroup" > add skillset </p>
            </div>
            <div class="p-3">
              <p>test your skil</p>
            </div>
          </div>
          <div v-if="editable" class="mt-4">
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="envelope"></b-icon>
              </div>
              <input type="text" class="form-control font-weight-bold" id="inlineFormInputGroup" disabled v-model="user.email" placeholder="Email" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="person"></b-icon>
              </div>
              <input type="text" class="form-control font-weight-bold" id="inlineFormInputGroup" disabled v-model="user.name" placeholder="Full name" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <b-icon icon="phone"></b-icon>
              </div>
              <input type="text" class="form-control" id="inlineFormInputGroup" v-model="phone" placeholder="Phone number" >
            </div>
            <div class="input-group mb-3">
              <div class="input-group-text ico">
                <i class="fas fa-code"></i>
              </div>
              <b-form id="form-wrapper" class="d-flex ml-2" @submit.prevent="addSkill">
                <div class="mr-3">
                  <select v-model="skillset.skill" class="custom-select" id="inputGroupSelect01">
                    <option selected>Pick skill</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
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
                </div>
                <div class="mr-3">
                  <select v-model="skillset.level" class="custom-select" id="inputGroupSelect01">
                    <option selected>Pick level</option>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advance</option>
                    <option value="4">Expert</option>
                  </select>
                </div>
              <b-button type="submit" variant="primary">Add skill</b-button>
              </b-form>
            </div>
            <div v-if="addSkillset.length !== 0" class="ml-5">
              <button v-for="(skillset, index) in addSkillset" :key="index" 
                type="button" 
                class="btn btn-primary btn-sm m-1">
                {{ skillset.skill }} - {{ skillset.level }}
              </button>
            </div>
            
          </div>
          <div class="mt-4">
            <ul class="nav nav-tabs d-flex justify-content-between">
              <li class="nav-item">
                <a class="nav-link active">Rewiews</a>
              </li>
            </ul>
          </div>
          <div class="mt-3">
            <p v-if="user.review.length == 0" class="text-center font-italic">No review yet</p>
            <div v-for="(review, index) in user.review" :key="index"  v-else class="card mb-3">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>{{ review.comment }}</p>
                  <footer v-if="review.rank == 1" class="blockquote-footer"><i class="fas fa-star" style="color: #fd7e13"></i> <cite class="ml-3">{{ review.comment.id_user.name }}</cite></footer>
                  <footer v-else-if="review.rank == 2" class="blockquote-footer"><i v-for="index in 2" :key="index" class="fas fa-star" style="color: #fd7e13"></i><cite class="ml-3">{{ review.comment.id_user.name }}</cite></footer>
                  <footer v-else-if="review.rank == 3" class="blockquote-footer"><i v-for="index in 3" :key="index" class="fas fa-star" style="color: #fd7e13"></i><cite class="ml-3">{{ review.comment.id_user.name }}</cite></footer>
                  <footer v-else-if="review.rank == 4" class="blockquote-footer"><i v-for="index in 4" :key="index" class="fas fa-star" style="color: #fd7e13"></i><cite class="ml-3">{{ review.comment.id_user.name }}</cite></footer>
                  <footer v-else-if="review.rank == 5" class="blockquote-footer"><i v-for="index in 5" :key="index" class="fas fa-star" style="color: #fd7e13"></i><cite class="ml-3">{{ review.comment.id_user.name }}</cite></footer>
                  <footer v-else class="blockquote-footer"><cite class="ml-3">{{ review.comment.id_user.name }}</cite></footer>
                </blockquote>
              </div>
            </div>
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
      skillset: {
        skill: "Pick skill",
        level: "Pick level"
      },
      phone: "",
      addSkillset: [],
      editable: false,
      editableImage: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    convertSkill (e) {
      if(e == 1) return 'Beginner'
      else if(e == 2) return 'Intermediate'
      else if(e == 3) return 'Advance'
      else if(e == 4) return 'Expert'
    },
    editProfile () {
      this.editable = true
    },
    saveProfile () {
      let result = {
        hp: this.phone, 
        skillset: this.addSkillset
      }
      this.$store.dispatch('updateUser', result)
        .then(({ data }) => {
          console.log(data)
          swal.fire({
            icon: 'success',
            title: 'Login success, Welcome',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('loginToken')
          this.phone = data.hp,
          this.skillset = data.skillset
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
      this.editableImage = false
    },
    editImage () {
      this.editableImage = true
    },
    addSkill () {
      if(this.skillset.level == '1') this.skillset.level = 1
      else if(this.skillset.level == '2') this.skillset.level = 2
      else if(this.skillset.level == '3') this.skillset.level = 3
      else if(this.skillset.level == '4') this.skillset.level = 4

      this.addSkillset.push({...this.skillset})
      this.skillset.skill = "Pick skill"
      this.skillset.level = "Pick level"
    }
  }
}
</script>

<style scoped>

.form-control {
    border: none;
    border-bottom: 1px solid
}

.form-control:disabled {
    background-color: white;
    border: none;
}

.ico {
    background-color: white;
    border: none;
    border-radius: 0;
}

.set-detail {
  height: 87vh !important;
  overflow: scroll
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
