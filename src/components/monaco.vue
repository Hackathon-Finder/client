<template>
    <div>
        <MonacoEditor
        width="800"
        height="500"
        theme="vs-dark"
        language="javascript"
        :options="options"
        @change="onChange"
        ></MonacoEditor>
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
      options: {
          
      },
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
