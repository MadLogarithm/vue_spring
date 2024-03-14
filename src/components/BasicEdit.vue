<script>
import axios from "axios";
import {Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  name: "BasicEdit",
  components: {Plus},
  data() {
    return {
      userData: [],
      newUser: {
        id: '',
        name: '',
        age: ''
      },
      dialogVisible: false,
      responseMessage: ''
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
    },
    newUserSubmit() {
      axios.post("http://localhost:8080/user", this.newUser)
          .then(response => {
            this.responseMessage = response.data;
            this.messageBoxTrue();
            this.selectAllUser();
          })
          .catch(error => {
            this.responseMessage = error;
            this.messageBoxFalse();
            console.error("Error push user:", error);
          });
      this.resetNewUser();
      this.dialogVisible = false;
    },
    cancelSubmit() {
      this.resetNewUser()
      this.dialogVisible = false;
    },
    resetNewUser() {
      this.newUser.id = '';
      this.newUser.name = '';
      this.newUser.age = '';
    },
    messageBoxTrue() {
      ElMessage({
        message: this.responseMessage,
        type: 'success',
      });
    },
    messageBoxFalse() {
      ElMessage({
        message: this.responseMessage,
        type: 'error',
      });
    },
    deleteRow(id) {
      axios.delete("http://localhost:8080/user/delete/" + id)
          .then(response => {
            this.responseMessage = response.data;
            this.messageBoxTrue();
            this.selectAllUser();
          })
          .catch(error => {
            this.responseMessage = error;
            this.messageBoxFalse();
            console.error("Error delete user:", error);
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
    <el-table :data="userData" stripe style="width: 70%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="name" />
      <el-table-column prop="age" label="age" />
      <el-table-column fixed="rigtht" label="Operations">
        <template v-slot:default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.row.id)"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div id="editTable">
    <el-button round @click="dialogVisible = true">
      <el-icon><Plus /></el-icon>
    </el-button>
    <el-dialog v-model="dialogVisible" title="New user" @close="resetNewUser">
      <el-form :model="newUser">
        <el-form-item label="id" label-width="60px">
          <el-input v-model="newUser.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="name" label-width="60px">
          <el-input v-model="newUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="age" label-width="60px">
          <el-input v-model="newUser.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmit">Cancel</el-button>
          <el-button type="primary" @click="newUserSubmit">Submit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
#userTable, #editTable {
  display: flex;
  justify-content: center;
}
</style>