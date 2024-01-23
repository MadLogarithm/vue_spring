<script>
import axios from "axios";

export default {
  name: "BasicEdit",
  data() {
    return {
      userData: []
    }
  },
  methods: {
    selectAllUser() {
      axios.get('http://localhost:8080/user/')
          .then(response => {
            this.userData = response.data;
          })
          .catch(error => {
            console.error("Error fetching user:", error);
          });
    }
  },
  created() {
    this.selectAllUser();
  }
}
</script>

<template>
  <div id="userTable">
    <el-table :data="userData" style="width: 70%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="name" />
      <el-table-column prop="age" label="age" />
    </el-table>
  </div>
</template>

<style scoped>
#userTable {
  display: flex;
  justify-content: center;
}
</style>