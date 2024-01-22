<script>
import axios from "axios";

export default {
  name: "BasicGet",
  data() {
    return {
      responseMessage: ''
    }
  },
  methods: {
    getHello() {
      axios.get('http://localhost:8080/hello')
          .then(response => {
            this.responseMessage =response.data;
          })
          .catch(error => {
            this.responseMessage = error;
            console.error('Error fetching hello:', error);
          });
    }
  }
}
</script>

<template>
  <el-button @click="getHello">get</el-button>
  <p>{{responseMessage}}</p>
</template>

<style scoped>

</style>