<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      user: null,
      events: null,
      loading: true,
      error: null,
      eventsLoading: true,
      eventsError: null,
    }
  },
  methods: {
    getUserInfo() {
      axios.get('https://api.github.com/users/MadLogarithm')
          .then(response => {
            this.user = response.data;
            this.loading = false;
            console.log("success get user info");
          })
          .catch(error => {
            this.error = error;
            this.loading = false;
            console.log(error);
          })
    },
    getRecentEvents() {
      axios.get('https://api.github.com/users/MadLogarithm/events')
          .then(response => {
            this.events = response.data;
            this.eventsLoading = false;
            console.log("success get recent events");
          })
          .catch(error => {
            this.eventsError = error;
            this.eventsLoading = false;
            console.log(error);
          })
    },
    getTimeZoneShortName() {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzParts = timezone.split('/');
      return tzParts[tzParts.length - 1];
    },
    setDate(date) {
      const now = new Date(date);
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}(`+ this.getTimeZoneShortName() + ')';
    },
  },
  created() {
    this.getUserInfo();
    this.getRecentEvents();
  },
}
</script>

<template>
  <div class="myInfo">
    <div v-if="loading">
      <i class="el-icon-loading" style="font-size: 20px; padding: 20px;"></i>Loading...
    </div>
    <div class="errorBox" style="margin: 20px" v-if="error">{{error}}</div>
    <div class="infoCard" style="margin: 20px" v-if="!loading && !error && user != null">
      <el-row class="basicInfo">
        <el-col :span="3">
          <el-avatar :size="100" :src="user.avatar_url" />
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <div>
                <el-link style="font-weight: bolder; line-height: 30px; font-size: 1.2em" :href="user.html_url">
                  {{user.login}}</el-link>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 10px;">
            <div style="color: gray; font-size: 1em; font-family: MomoStorm,serif;">
              {{user.bio}}
            </div>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              Followers: {{user.followers}}
            </el-col>
            <el-col :span="12">
              Following: {{user.following}}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="12">
              Company: {{user.company}}
            </el-col>
            <el-col :span="12">
              Public Repos: {{user.public_repos}}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="24">
              Created time: {{setDate(user.created_at)}}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="24">
              Last update: {{setDate(user.updated_at)}}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div v-if="eventsLoading" style="margin-top: 10px">
        <i class="el-icon-loading" style="font-size: 20px; padding: 20px;"></i>Loading...
      </div>
      <el-row class="recentEvents" v-if="!eventsLoading && !eventsError && events != null">
        {{events}}
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.recentEvents {
  margin-top: 10px;
  height: 350px;
  overflow: auto;
}
</style>