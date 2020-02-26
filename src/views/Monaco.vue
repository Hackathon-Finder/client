<template>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div>{{question}}</div>
          <b-dropdown id="dropdown-offset" offset="25" :text="buttonTitle" class="m-2">
            <b-dropdown-item v-for="(item,i) in languages" :key="i" href="#" v-on:click.prevent="changeTitle(item)">{{item}}</b-dropdown-item>
          </b-dropdown>
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
  data() {
    return {
      buttonTitle:"Programming Language",
      languages:['JavaScript','Java','Python','C#','PHP','C++','C','TypeScript','Ruby','Swift','Go','Kotlin'],
      options: {
          
      },
      answer: '',
      question: `The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17. Find the sum of all the primes below two million.`
    }
  },
  methods: {
    changeTitle(value){
      this.buttonTitle = value
    },
    onChange(value) {
      this.answer = value
    },
    submit(){
        console.log('answer is:',this.answer, 'language is:', this.buttonTitle)
        this.$store.dispatch('updateSkill', {answer: this.answer, skill: this.buttonTitle})
        .then(({data})=>{
          console.log(data)
          this.$router.push('/')
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
