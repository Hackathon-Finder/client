<template>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div>{{question}}</div>
        <b-button disabled>{{buttonTitle}}</b-button>
          <MonacoEditor
          width="800"
          height="500"
          theme="vs-dark"
          :language="buttonTitle"
          :options="options"
          @change="onChange"
          ></MonacoEditor>
          <b-button v-on:click.prevent="submit">Submit</b-button>
        </div>
      <div class="col"></div>
    </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue';
export default {
  name: 'monaco',
  components: {
    MonacoEditor
  },
  created(){
    this.buttonTitle = this.$route.params.skill
  },
  data() {
    return {
      buttonTitle:"",
      options: {
          
      },
      answer: '',
      question: `The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17. Find the sum of all the primes below two million.`
    }
  },
  methods: {
    onChange(value) {
      this.answer = value
    },
    submit(){
        this.$store.dispatch('updateSkill', {answer: this.answer, skill: this.buttonTitle})
        .then(({data})=>{
          this.$router.push('/profile')
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
