<template>
  <div class="card mb-4">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="event.pictures" class="card-img" alt="loading image...">
      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h4 class="card-title">{{ event.title }}</h4>
          <p class="card-text">{{ this.cuttingSummary(event.summary) }}</p>
          <div class="row pl-3 info mt-5">
            <p style="color: #a27fec" class="mr-5">
              <i class="fas fa-users mr-2"></i>
              Max. member {{ event.team_size }} 
            </p>
            <p style="color: #a27fec">
              <i class="fas fa-map-marker-alt mr-2"></i>
              {{ event.location }} 
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center align-items-end date">
        <div class="date-body">
          <div class="row justify-content-around no-gutters">
            <div class="col mr-3 text-center">
              <p>START</p>
            </div>
            <div class="col text-center">
              <p>END</p>
            </div>
          </div>
          <div class="row justify-content-around no-gutters">
            <div class="col p-2 mr-3 col-date text-center">
              <h3>{{ this.getDate(event.date[0]) }}</h3>
              <p>{{ this.getMonth(event.date[0]) }}</p>
            </div>
            <div class="col p-2 col-date text-center">
              <h3>{{ this.getDate(event.date[1]) }}</h3>
              <p>{{ this.getMonth(event.date[1]) }}</p>
            </div>
          </div>
          <b-button variant="link" @click.prevent="detail" class="mt-4 see mb-4">
            SEE DETAIL <i class="fas fa-long-arrow-alt-right"></i>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    cuttingSummary(e) {
      return e.slice(0, 200) + "..."
    },
    getDate(e) {
      const result = e.split("-")
      return (result[0])
    },
    getMonth(e) {
      const result = e.split("-")
      let month = ""
      if (result[1] == "01") month = "JAN"
      else if(result[1] == "02") month = "FEB"
      else if(result[1] == "03") month = "MAR"
      else if(result[1] == "04") month = "APR"
      else if(result[1] == "05") month = "MEI"
      else if(result[1] == "06") month = "JUN"
      else if(result[1] == "07") month = "JUL"
      else if(result[1] == "08") month = "AUG"
      else if(result[1] == "09") month = "SEP"
      else if(result[1] == "10") month = "OKT"
      else if(result[1] == "11") month = "NOV"
      else if(result[1] == "12") month = "DEV"
      return (month)
    },
    detail() {
      this.$router.push(`/events/${this.event._id}`)
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0;
  color: #6d6f71
}

.col-date {
  width: 4.2rem;
  height: 4.2rem;
  overflow: hidden;
  border: 0.01rem solid #6d6f71
}

.col-date h3 {
  margin-bottom: 0
}

.wrapper{
  border: 1px solid;
  position: relative !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  height: 300px !important;
  overflow: hidden !important;
}

.see {
  margin-bottom: 0;
  color: #a27fec;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: right;
  text-decoration: none
}

.see:hover {
  color: #5126ad;
}

img {
  /* position: absolute; */
  /* width: 500px; */
  height: 100%;
  width: 100%;
  border-radius: 0
  /* z-index: -1; */
}

.card-body {
  text-align: left;
}

.card:hover {
  transform:scale(1.02);
  transition-duration: 0.2s;
}

@media only screen and (max-width: 768px) {
  .card-body {
    text-align: center
  }

  p {
    margin-bottom: 0
  }

  .info {
    display: flex;
    justify-content: center
  }

}

</style>
