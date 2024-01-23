<script>
import axios from "axios";

export default {
  name: "BasicGet",
  data() {
    return {
      responseMessage: 'null'
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
    },
    resetHello() {
      this.responseMessage = 'null';
    }
  }
}
</script>

<template>
  <div id="testButton">
    <el-button @click="getHello">get</el-button>
    <el-button @click="resetHello">reset</el-button>
  </div>
  <div id="messageBox">
    <p>{{responseMessage}}</p>
  </div>
</template>

<style scoped>
#testButton, #messageBox {
  display: flex;
  justify-content: center;
}
</style>