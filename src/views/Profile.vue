<template>
  <div>
    <div class="row m-3 row-cols-1 row-cols-sm-2 row-cols-md-2">
      <div class="col d-flex justify-content-center p-3">
        <div class="card">
          <img :src="user.pict" class="card-img-top" alt="profile image">
          <div class="card-body">
          <div>
            <h4><strong>{{ user.name }}</strong></h4>
          </div>
            <div class="row no-gutters d-flex justify-content-between">
              <div class="col col-lg-8 col-md-8 col-sm-8 pr-3">
                <b-input disabled
                  class="editable"
                  style="font-weight: bold;"
                  v-model="user.email"
                />
              </div>
              <div class="col col-lg-4 col-md-4 col-sm-4 pl-3">
                <b-input disabled
                  class="editable text-right"
                  v-model="user.hp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3">
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active">Skill set</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Testimony</a>
            </li>
          </ul>
        </div>
        <!-- <div class="row no-gutters d-flex w-100">
          <div class="card col col-lg-12 col-md-12 col-sm-12 mb-5">
            <div class="card-body">
              <p>tes</p>
            </div>
          </div>
          <div class="card col col-lg-12 col-md-12 col-sm-12">
            <div class="card-body">
              <p>tes</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>

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
