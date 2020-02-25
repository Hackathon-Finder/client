<template>
  <div>
    <div class="row m-3 row-cols-1 row-cols-sm-2 row-cols-md-2">
      <div class="col d-flex justify-content-center p-3">
        <div class="card">
          <img :src="user.pict" class="card-img-top" alt="profile image">
          <div class="card-body">
            <div class="row no-gutters d-flex justify-content-between">
              <div class="col col-lg-7 col-md-6 col-sm pr-2">
                <b-input disabled
                  class="editable"
                  style="font-weight: bold;"
                  v-model="user.email"
                />
              </div>
              <div class="col col-lg-5 col-md-6 col-sm pl-2">
                <b-input disabled
                  class="editable text-right"
                  v-model="user._id"
                />
              </div>
            </div>
            <div>
              <p><strong>{{ user.email }}</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div class="col border d-flex justify-content-center p-3">
        <p>tes</p>
        <p>tes</p>
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
