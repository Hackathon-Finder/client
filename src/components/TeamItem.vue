<template>
  <div>
    <div class="d-flex header-wrapper">
      <h5>{{team.name}}</h5>
      <div class="ml-auto">
        <b-button>Join</b-button>
      </div>
    </div>
    <hr />
    <div class="body-wrapper">
      <h6 class="mb-3">Status: {{team.status}}</h6>
      <h6 class="mb-3">Members: {{team.team_size}}/{{team.max_size}}</h6>
      <p class="mb-3">Skillset :</p>
      <div class="mb-3" v-for="skillset in team.skillset" :key="skillset.id">
        <b-badge pill variant="primary">
          {{skillset.skill}}
        </b-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['team'],
  name: 'TeamItem',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>