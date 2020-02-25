<template>
    <div>
        <MonacoEditor
        width="800"
        height="500"
        theme="vs-dark"
        :language="programLanguage"
        :options="options"
        @change="onChange"
        ></MonacoEditor>
    <b-button v-on:click.prevent="submit">Submit</b-button>
    </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue';
export default {
  name: 'createAnwer',
  components: {
    MonacoEditor
  },
  data() {
    return {
      options: {
          
      },
      programLanguage: ""
    }
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
    submit(){
        console.log('answer submitted')
    }
  }
}
</script>

<style>
</style>
