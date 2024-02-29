<template>
  <el-form ref="searchForm" :model="form" label-width="80px">
    <el-form-item prop="searchInput" :rules="inputRules[selectKeyword]">
      <el-input v-model="form.searchInput" placeholder="请输入内容" class="input-with-select">
        <template #prepend>
          <el-select v-model="selectKeyword" placeholder="搜索选项" class="searchType">
            <el-option label="账号" value="account"></el-option>
            <el-option label="用户名" value="username"></el-option>
            <el-option label="简介" value="description"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button icon="el-icon-search" @click="validateAndSearch">检索</el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "InputRules",
  data() {
    return {
      form: {
        searchInput: '',
      },
      selectKeyword: '',
      inputRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { validator: this.validateAccount, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: this.validateUsername, trigger: 'blur' }
        ],
        description: []
      }
    };
  },
  methods: {
    validateAccount(rule, value, callback) {
      const regExp = /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/;
      if (regExp.test(value)) {
        callback();
      } else {
        callback(new Error('账号格式不正确'));
      }
    },
    validateUsername(rule, value, callback) {
      const regExp = /^(?!.*\s$)[a-zA-Z0-9_\- ]{1,50}$/;
      if (regExp.test(value)) {
        callback();
      } else {
        callback(new Error('用户名格式不正确'));
      }
    },
    validateAndSearch() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.searchByType();
        } else {
          return false;
        }
      });
    },
    searchByType() {
      // 执行搜索逻辑
    },
  },
};
</script>


<style scoped>
.searchType {
  width: 140px;
}
.searchConditions input {
  height: 60px;
}
.searchConditions button {
  transition: border-bottom 0.3s;
  height: 60px;
}
.searchConditions button:hover {
  border-bottom: solid 1px #fff;
}
</style>