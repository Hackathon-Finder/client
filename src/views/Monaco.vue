<template>
    <b-container>
      <div class="mb-5">
        <div class="p-5 text-center">
          <b-button variant="link" class="title">
            <h2 class="mr-3">
              <i class="far fa-file-code mr-3"></i>
              <strong>Colabs Exams: {{ buttonTitle }}</strong>
            </h2>
          </b-button>
        </div>
        <div class="mb-4">
          <h3>Question :</h3>
          <p>In the hexadecimal number system numbers are represented using 16 different digits: 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F</p>
          <p>The hexadecimal number AF when written in the decimal number system equals 10x16+15=175.</p>
          <p>In the 3-digit hexadecimal numbers 10A, 1A0, A10, and A01 the digits 0,1 and A are all present. Like numbers written in base ten we write hexadecimal numbers without leading zeroes.</p>
          <p>How many hexadecimal numbers containing at most sixteen hexadecimal digits exist with all of the digits 0,1, and A present at least once?</p>
          <p class="mt-5">Give your answer as a hexadecimal number.</p>
          <p class="font-italic">(A,B,C,D,E and F in upper case, without any leading or trailing code that marks the number as hexadecimal and without leading zeroes , e.g. 1A3F and not: 1a3f and not 0x1a3f and not $1A3F and not #1A3F and not 0000001A3F)</p>
        </div>
        <MonacoEditor class='editor mb-4' 
          theme='vs-dark' :language='languageSkill' 
          v-model='answer' />
          <b-button class="pl-5 pr-5" v-on:click.prevent="submit">Submit task</b-button>
        </div>
    </b-container>
</template>

<script>
import MonacoEditor from '../components/MonacoEditor.js'
import Swal from 'sweetalert2'
// import MonacoEditor from 'monaco-editor-vue';
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
      answer: '',
      buttonTitle:"",
      answer: '',
    }
  },
  methods: {
    onChange(value) {
      this.answer = value
    },
    submit(){
        this.$store.dispatch('updateSkill', {answer: this.answer, skill: this.buttonTitle})
          .then(({data})=>{
            return Swal.fire({
            title: 'Are you sure to submit? Please check again',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit!'
          })
        })
        .then(result => {
          if (result.value) {
            Swal.fire({
              title: 'Success!',
              text: 'Thank you',
              icon: 'success',
              confirmButtonText: 'Oke'
            })
            this.answer = '',
            this.buttonTitle = "",
            this.answer = '',
            this.$router.push('/profile')
          }
        })
        .catch(err=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors
          })
        })
    }
  },
  computed: {
    languageSkill() {
      const data = this.$route.params.skill
      return data.toLowerCase()
    }
  }
}
</script>

<style scoped>
h2 {
  color: #0e32ad;
  font-family: 'Rajdhani', arial;
  margin-bottom: 0;
}


.title {
  color: #0e32ad;
  font-family: 'Rajdhani', arial;
  margin-bottom: 0;
  text-decoration: none;
  cursor: auto
}

.title:hover {
  cursor: auto;
  text-decoration: none;
  border-bottom: 1px solid #0e32ad;
  border-right: 1px solid #0e32ad
}

.editor {
  width: auto;
  height: 400px;
  /* border: 2px solid #2c3e50; */
}

.btn-secondary {
  color: #fff;
  background-color: #0e32ad;
  border-color: #0e32ad;
}

.btn-secondary:hover {
  color: #fff;
  background-color: #092274;
  border-color: #092274;
}
</style>





  methods: {
    
  }
}
