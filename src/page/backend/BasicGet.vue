<script>
import axios from "axios";

export default {
  name: "BasicGet",
  data() {
    return {
      responseMessage: 'null',
      userData: []
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
    },
    getUser() {
      axios.get('http://localhost:8080/getUser')
          .then(response => {
            this.userData = this.parseData(response.data);
          })
          .catch(error => {
            console.error('Error fetching getUser:', error);
          });
    },
    resetUser() {
      this.userData = [];
    },
    parseData(data) {
      return data.map(item => {
        return {
          id: item[0],
          name: item[1],
          email: item[2]
        };
      });
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
  <div id="testButton">
    <el-button @click="getUser">get</el-button>
    <el-button @click="resetUser">reset</el-button>
  </div>
  <div id="userTable">
    <el-table :data="userData" style="width: 70%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="name" />
      <el-table-column prop="age" label="age" />
    </el-table>
  </div>
</template>

<style scoped>
#testButton, #messageBox, #userTable {
  display: flex;
  justify-content: center;
}
</style>