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
                 active-text-color="violet"
                 :router="true"
                 :default-active="$route.path"
                 style=
                     "flex: 1;
                     justify-content: flex-start">
          <el-menu-item index="/home">
            <template v-slot:title>
              <el-icon><HomeFilled /></el-icon>
              <span>home</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="front">
            <template v-slot:title>
              <el-icon><ElementPlus /></el-icon>
              <span>front</span>
            </template>
            <el-menu-item index="/test">
              <template v-slot:title>
                <el-icon><Coin /></el-icon>
                <span>test</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="backend">
            <template v-slot:title>
              <el-icon><Connection /></el-icon>
              <span>backend</span>
            </template>
            <el-menu-item index="/basicGet">
              <template v-slot:title>
                <el-icon><ChatSquare /></el-icon>
                <span>basicGet</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/basicSelect">
              <template v-slot:title>
                <el-icon><Memo /></el-icon>
                <span>basicSelect</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/others">
            <template v-slot:title>
              <el-icon><MoreFilled /></el-icon>
              <span>other</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {ChatSquare, Coin, Connection, ElementPlus, HomeFilled, Memo, MoreFilled} from "@element-plus/icons-vue";

export default {
  name: "HomeSet.vue",
  components: {Memo, ChatSquare, Connection, Coin, ElementPlus, MoreFilled, HomeFilled}
}
</script>

<style scoped>
.home-container {
  flex-wrap: wrap;
  height: 100%;
}
</style>