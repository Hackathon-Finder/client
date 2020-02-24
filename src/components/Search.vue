<template>
  <div class="form-group row d-flex p-4 justify-content-center align-items-center">
    <div class="col-md-4 col-sm-6 d-flex justify-content-center align-items-center text-right">
      <h2> <i class="fas fa-map-marker-alt mr-3"></i> hackathons in</h2>
    </div>
    <div class="col-md-6">
      <input type="text" class="form-control" placeholder="Indonesia">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  h2 {
    color: white;
    font-family: 'Rajdhani', arial;
    margin-bottom: 0;
  }

  .form-control {
    color: white;
    font-weight: bold;
    border: none;
    font-size: 2rem;
    border-bottom: 1px solid white
  }

  .form-control:valid {
    background-color:  transparent !important;
  }

  .form-control:focus {
    box-shadow: none
  }

  .form-control:hover {
    transform:scale(1.02);
    transition-duration: 0.2s;
  }

  ::placeholder {
    color: rgb(232, 232, 232);
    opacity: 1;
  }

  @media only screen and (max-width: 768px) {
    .form-control {
      text-align: center
    }
  }

</style>
