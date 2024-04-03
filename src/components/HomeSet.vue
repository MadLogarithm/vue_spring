<template>
  <el-container class="home-container">
    <el-header style="background-color: antiquewhite;">
      <el-row>
        <el-col :span="8">
          <img :src="require('@/assets/pic/doodle_jump_sticker_sleep.png')" alt="" style="float: left; height: 60px; width: 60px"/>
        </el-col>
        <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
          vue_spring
        </el-col>
        <el-col :span="4" />
        <el-col :span="4" style="padding: 5px">
          <el-row>
            <el-col :span="24">
              <img ref="https://codetime.dev" alt="CodeTime Badge" src="https://img.shields.io/endpoint?style=plastic&color=222&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D25076%26project%3D%26in=0">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <img ref="https://codetime.dev" alt="CodeTime Badge" src="https://img.shields.io/endpoint?style=plastic&color=222&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D25076%26project%3D%26in=86400000">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside style=
                    "width: 160px;
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
          <el-sub-menu index="frontend">
            <template v-slot:title>
              <el-icon><ElementPlus /></el-icon>
              <span>frontend</span>
            </template>
            <el-menu-item index="/inputRules">
              <template v-slot:title>
                <el-icon><Coin /></el-icon>
                <span>input</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/userSearch">
              <template v-slot:title>
                <el-icon><User /></el-icon>
                <span>user</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/cssTest">
              <template v-slot:title>
                <el-icon><CoffeeCup /></el-icon>
                <span>css</span>
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
                <span>get</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/basicSelect">
              <template v-slot:title>
                <el-icon><Memo /></el-icon>
                <span>select</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/basicEdit">
              <template v-slot:title>
                <el-icon><EditPen /></el-icon>
                <span>edit</span>
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
import {
  ChatSquare, CoffeeCup,
  Coin,
  Connection,
  EditPen,
  ElementPlus,
  HomeFilled,
  Memo,
  MoreFilled, User
} from "@element-plus/icons-vue";

export default {
  name: "HomeSet.vue",
  components: {CoffeeCup, User, EditPen, Memo, ChatSquare, Connection, Coin, ElementPlus, MoreFilled, HomeFilled}
}
</script>

<style scoped>
.home-container {
  flex-wrap: wrap;
  width: 1528px;
  height: 100%;
}
</style>
