<template>
  <b-container>
    <div class="row">
      <div class="col col-sm-12 col-12 col-md-4">
        <div class="col- d-flex justify-content-center p-3">
          <div class="card" style="border: none"> 
            <img :src="user.pict" class="card-img-top" alt="profile image">
          </div>
        </div>
      </div>
      <div class="col col-sm-12 col-12 col-md-8 set-detail">
        <div class="p-3">
          <div>
            <b-tabs content-class="mt-3">
              <b-tab title="Detail information" active>
                <div class=" mt-4">
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
                      <b-icon icon="phone"></b-icon>
                    </div>
                    <input v-if="user.hp !== ''" type="text" class="form-control font-weight-bold" disabled v-model="user.hp" >
                    <p v-else style="border: none" class="form-control font-italic" > No phone number </p>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Skillset">
                <div v-if="skillSetLength !== 0" class="ml-3">
                  <button disabled v-for="(skillset, index) in user.skillset" :key="index" 
                    type="button" 
                    :class="{ 'btn-warning' : skillset.verifiedPoint >= 0}"
                    class="btn btn-primary btn-sm m-2" style="cursor: auto">
                    {{ skillset.skill }} -
                    {{ convertSkill(skillset.level) }}
                  </button>
                  <div class="d-flex align-items-center mt-5">
                    <button disabled class="btn btn-warning btn-sm mr-3" style="width: 20px; height: 10px; cursor: auto"></button> 
                    <div>
                      <p style="margin: 0; padding: 0">Verify skillset</p>
                    </div>
                  </div>
                </div>
                <div v-else class="ml-3">
                  <p class="text-center font-italic">No skillset yet</p>
                </div>
              </b-tab>
              <b-tab title="Reviews">
                <div class="mt-3">
                  <p v-if="reviewLength == 0" class="text-center font-italic">No review yet</p>
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
              </b-tab>
            </b-tabs>
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
      verify: true
    }
  },
  computed: {
    user () {
      return this.$store.state.userDetail
    },
    skillSetLength () {
      let data = this.user.skillset
      return data.length
    },
    reviewLength () {
      let data = this.user.review
      return data.length
    },
  },
  created () {
      this.$store.dispatch('getUserDetail', this.$route.params.id)
  },
  methods: {
    convertSkill (e) {
      if(e == 1) return 'Beginner'
      else if(e == 2) return 'Intermediate'
      else if(e == 3) return 'Advance'
      else if(e == 4) return 'Expert'
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
