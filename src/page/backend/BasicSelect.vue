<script>
import {Search} from "@element-plus/icons-vue";
import axios from "axios";

export default {
  name: "BasicSelect",
  components: {Search},
  data() {
    return {
      selectId: '',
      userData: []
    }
  },
  methods: {
    selectById() {
      axios.get(`http://localhost:8080/user/${this.selectId}`)
          .then(response => {
            this.userData = response.data;
          })
          .catch(error => {
            console.error('Error fetching user:',error);
          });
    }
  },
  created() {
    this.selectById();
  }
}
</script>

<template>
  <div id="selectUser">
    <el-input v-model="selectId"
              placeholder="Select all user"
              @input="selectById"
              clearable
              style="width: 70%">
      <template #append>
        <el-button @click="selectById">
          <el-icon><Search /></el-icon>
        </el-button>
      </template>
    </el-input>
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
#selectUser, #userTable {
  display: flex;
  justify-content: center;
}
</style>