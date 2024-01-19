<template>
  <el-container class="home-container">
    <el-header style=
                   "display:flex;
                   background-color: antiquewhite;
                   justify-content: center;
                   align-items: center">
      vue_spring
    </el-header>
    <el-container>
      <el-aside style=
                    "width: 150px;
                    background-color: aliceblue;
                    display: flex;
                    justify-content: center">
        <el-menu background-color="aliceblue"
                 class="el-menu-vertical-demo"
                 text-color="black"
                 active-text-color="grey"
                 :router="true"
                 :default-active="$route.path"
                 style=
                     "flex: 1;
                     justify-content: flex-start">
          <el-menu-item index="/home">
            <template v-slot:title>
              <el-icon><HomeFilled /></el-icon>
              <span>Home</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/others">
            <template v-slot:title>
              <el-icon><MoreFilled /></el-icon>
              <span>Other</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>{{$route.path}}</el-main>
    </el-container>
  </el-container>
</template>

<script>
import {HomeFilled, MoreFilled} from "@element-plus/icons-vue";

export default {
  name: "HomeSet.vue",
  components: {MoreFilled, HomeFilled}
}
</script>

<style scoped>
.home-container {
  flex-wrap: wrap;
  height: 100%;
}
</style>