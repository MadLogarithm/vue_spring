<script>
import axios from "axios";
import {Loading, Refresh, Search} from "@element-plus/icons-vue";

export default {
  name: "userSearch",
  components: {Loading, Refresh},
  computed: {
    Search() {
      return Search
    }
  },
  data() {
    return {
      input: null,
      user: null,
      events: null,
      loading: false,
      error: null,
      eventsLoading: false,
      eventsError: null,
      eventsRefreshing: false,
      userCache: {},
      eventsCache: {},
      eventsUpdateTime: {},
    }
  },
  methods: {
    getUserInfo(user) {
      if(!this.loading) {
        this.user = null;
        this.events = null;
        this.error = null;
        this.eventsError = null;
        this.loading = true;
        if (this.userCache[user]) {
          this.user = this.userCache[user];
          this.loading = false;
          console.log(">>>>>load user from cache");
        } else {
          axios.get('https://api.github.com/users/' + user)
              .then(response => {
                this.user = response.data;
                if (!this.userCache[user]) {
                  this.userCache[user] = response.data;
                }
                this.loading = false;
                console.log(">>>>>load user from github");
              })
              .catch(error => {
                this.error = error;
                this.loading = false;
                console.log(error);
              })
        }
      }
      if(!this.eventsLoading) {
        if (this.eventsCache[user]) {
          this.events = this.eventsCache[user];
          this.eventsLoading = false;
          console.log(">>>>>load events from cache");
        } else {
          axios.get('https://api.github.com/users/' + user + '/events')
              .then(response => {
                this.events = response.data;
                if (!this.eventsCache[user]) {
                  this.eventsCache[user] = response.data;
                  let currentTime = new Date();
                  this.eventsUpdateTime[user] = this.setDate(currentTime);
                }
                this.eventsLoading = false;
                console.log(">>>>>load events from github");
              })
              .catch(error => {
                this.eventsError = error;
                this.eventsLoading = false;
                console.log(error);
              })
        }
      }
    },
    refreshEventsList(user) {
      if(!this.eventsRefreshing) {
        axios.get('https://api.github.com/users/' + user + '/events')
            .then(response => {
              this.events = response.data;
              this.eventsCache[user] = response.data;
              let currentTime = new Date();
              this.eventsUpdateTime[user] = this.setDate(currentTime);
              this.eventsRefreshing = false;
              console.log(">>>>>load events from github");
            })
            .catch(error => {
              this.eventsError = error;
              this.eventsRefreshing = false;
              console.log(error);
            })
      }
    },
    setDate(date) {
      const now = new Date(date);
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    strName(str) {
      let i = 0;
      for (; i < str.length; i++) {
        if (str[i] === ']') {
          break;
        }
      }
      return str.slice(1,i);
    },
    strSrc(str) {
      let i = 0;
      let j = 0;
      for (; i < str.length; i++) {
        if (str[i] === '(') {
          break;
        }
      }
      i++;
      for(j = i; j < str.length; j++) {
        if (str[j] === ')') {
          break;
        }
      }
      return str.slice(i,j);
    },
  },
}
</script>

<template>
  <div class="myInfo">
    <div class="searchBar" style="display: flex; justify-content: center">
      <el-input
          v-model="input"
          style="max-width: 600px"
          placeholder="Please input user name"
          class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="getUserInfo(input)" />
        </template>
      </el-input>
    </div>
    <div v-if="loading">
      <el-icon style="font-size: 20px; padding: 20px; animation: rotating 2s linear infinite reverse;"><Loading /></el-icon>Loading...
    </div>
    <div class="errorBox" style="margin: 20px" v-if="error">
      <img :src="require('@/assets/pic/doodle_jump_sticker_cry.png')" alt="" style="float: left; height: 100px; width: 100px"/>
      {{error}}
    </div>
    <div class="infoCard" style="margin: 20px" v-if="!loading && !error && user != null">
      <el-row>
        <el-col :span="3">
          <el-avatar :size="100" :src="user.avatar_url" />
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-link style="font-weight: bolder; line-height: 30px; font-size: 1.2em" :href="user.html_url">{{user.login}}</el-link>
            </el-col>
          </el-row>
          <div  class="basicInfo">
            <el-row style="margin: 10px;" v-if="user.bio">
              <div class="underlineCss">
                <span style="color: black; font-size: 1em; font-family: MomoStorm,serif;">
                  {{user.bio}}{{user.name ? ' ——' + user.name : ''}}
                </span>
              </div>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="12">
                Followers: <span>{{user.followers}}</span>
              </el-col>
              <el-col :span="12">
                Following: <span>{{user.following}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="12" v-if="user.company">
                Company: <span>{{user.company}}</span>
              </el-col>
              <el-col :span="12">
                Public Repos: <span>{{user.public_repos}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px" v-if="user.blog || user.twitter_username">
              <el-col :span="12" v-if="user.blog">
                blog: <el-link :href="user.blog">{{user.blog}}</el-link>
              </el-col>
              <el-col :span="12" v-if="user.twitter_username">
                twitter: <el-link :href="'https://twitter.com/' + user.twitter_username">{{user.twitter_username}}</el-link>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="24">
                Created time: <span>{{setDate(user.created_at)}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="24">
                Last update: <span>{{setDate(user.updated_at)}}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div v-if="eventsLoading" style="margin-top: 10px">
        <el-icon style="font-size: 20px; padding: 20px; animation: rotating 2s linear infinite reverse;"><Loading /></el-icon>Loading...
      </div>
      <div class="errorBox" style="margin: 20px" v-if="eventsError">
        <img :src="require('@/assets/pic/doodle_jump_sticker_cry.png')" alt="" style="float: left; height: 100px; width: 100px"/>
        {{eventsError}}
      </div>
      <div class="eventsBox" style="margin-top: 20px" v-if="!eventsLoading && !eventsError && events != null">
        <el-row>
          <el-col :span="3" />
          <el-col :span="8" style="font-weight: bolder; line-height: 30px; font-size: 1.2em">Recent Events</el-col>
          <el-col :span="4" />
          <el-col :span="8" style="display: flex; line-height: 30px; align-items: center;">
            events update at:
            <span style="margin-left: 3px; font-size: 14px; font-weight: 500; color: #606266">{{eventsUpdateTime[user.login]}}</span>
            <el-icon v-if="!eventsRefreshing"
                @click="refreshEventsList(user.login)"
                style="margin-left: 3px; font-size: 22px;"><Refresh /></el-icon>
            <el-icon v-if="eventsRefreshing"
                @click="refreshEventsList(user.login)"
                style="margin-left: 3px; font-size: 22px; animation: rotating 2s linear infinite reverse;"><Refresh /></el-icon>
          </el-col>
        </el-row>
        <div class="recentEvents" style="margin-top: 10px">
          <img v-if="!events.length" :src="require('@/assets/pic/doodle_jump_sticker_no.png')" alt="" style="float: left; height: 100px; width: 100px"/>
          <div v-if="events !== '[]'" class="eventsList">
            <el-row class="eventCard" style="height: auto; width: auto; padding: 20px" v-for="event in events" v-bind:key="event.id">
              <el-col :span="24">
                <el-row>
                  <el-col :span="9">
                    repo: <el-link :href="'https://github.com/' + event.repo.name">{{event.repo.name}}</el-link>
                  </el-col>
                  <el-col :span="7">
                    <el-popover style="background-color: rgba(255,255,255,0.5);"
                                :visible-arrow="false"
                                placement="bottom-start"
                                width="160"
                                trigger="hover"
                                ref="op_popover" popper-class="op_popover">
                      <div class="popoverDetail">
                        <el-row>
                          <el-col :span="7">
                            <el-avatar :size="30" :src="event.actor.avatar_url" />
                          </el-col>
                          <el-col :span="17" style="display: flex; align-items: center">
                            {{event.actor.login}}
                          </el-col>
                        </el-row>
                      </div>
                      <template #reference>
                        <div>
                          actor: <el-link :href="'https://github.com/' + event.actor.login">{{event.actor.login}}</el-link>
                        </div>
                      </template>
                    </el-popover>
                  </el-col>
                  <el-col :span="8">
                    time: <span>{{setDate(event.created_at)}}</span>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="9">
                    type: <span>{{event.type}}</span>
                  </el-col>
                  <el-col :span="7" v-if="event.type === 'PushEvent' && event.payload.ref">
                    ref: <span>{{event.payload.ref}}</span>
                  </el-col>
                  <el-col :span="12" v-if="(event.type === 'CreateEvent' || event.type === 'DeleteEvent') && event.payload.ref">
                    ref: <span>{{event.payload.ref}}</span>
                  </el-col>
                  <el-col :span="8" v-if="event.type === 'PushEvent'">
                    commits number: <span>{{event.payload.size}}</span>
                  </el-col>
                  <el-col :span="7" v-if="event.type === 'ReleaseEvent'">
                    actions: <span>{{event.payload.action}}</span>
                  </el-col>
                  <el-col :span="7" v-if="event.type === 'WatchEvent' && event.org">
                    <el-popover style="background-color: rgba(255,255,255,0.5);"
                                :visible-arrow="false"
                                placement="bottom-end"
                                width="180"
                                trigger="hover"
                                ref="op_popover" popper-class="op_popover">
                      <div class="popoverDetail">
                        <el-row>
                          <el-col :span="7">
                            <el-avatar :size="30" :src="event.org.avatar_url" />
                          </el-col>
                          <el-col :span="17" style="display: flex; align-items: center">
                            {{event.org.login}}
                          </el-col>
                        </el-row>
                      </div>
                      <template #reference>
                        <div>
                          author: <el-link :href="'https://github.com/' + event.org.login">{{event.org.login}}</el-link>
                        </div>
                      </template>
                    </el-popover>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px;" v-if="event.type === 'ReleaseEvent'">
                  <el-col :span="9">
                    name: <span>{{event.payload.release.name}}</span>
                  </el-col>
                  <el-col :span="7">
                    tag: <span>{{event.payload.release.tag_name}}</span>
                  </el-col>
                  <el-col :span="8">
                    <el-popover style="background-color: rgba(255,255,255,0.5);"
                                :visible-arrow="false"
                                placement="bottom-end"
                                width="160"
                                trigger="hover"
                                ref="op_popover" popper-class="op_popover">
                      <div class="popoverDetail">
                        <el-row>
                          <el-col :span="7">
                            <el-avatar :size="30" :src="event.payload.release.author.avatar_url" />
                          </el-col>
                          <el-col :span="17" style="display: flex; align-items: center">
                            {{event.payload.release.author.login}}
                          </el-col>
                        </el-row>
                      </div>
                      <template #reference>
                        <div>
                          author: <el-link :href="event.payload.release.author.html_url">{{event.payload.release.author.login}}</el-link>
                        </div>
                      </template>
                    </el-popover>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px;" v-if="event.type === 'ReleaseEvent'">
                  <el-col :span="9">
                    release: <el-link :href="strSrc(event.payload.release.body)">{{strName(event.payload.release.body)}}</el-link>
                  </el-col>
                  <el-col :span="7">
                    created_at: <span>{{setDate(event.payload.release.created_at)}}</span>
                  </el-col>
                  <el-col :span="8">
                    published_at: <span>{{setDate(event.payload.release.published_at)}}</span>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px;" v-if="event.type === 'PushEvent'">
                  <el-col :span="8">
                    commits list:
                  </el-col>
                </el-row>
                <div class="commitCard" style="padding-inline: 20px" v-if="event.type === 'PushEvent'">
                  <el-row  v-for="commit in event.payload.commits" v-bind:key="commit.sha">
                    <el-col :span="3"></el-col>
                    <el-col :span="12">
                      <el-link :href="'https://github.com/' + event.repo.name + '/commit/' + commit.sha">{{commit.message}}</el-link>
                    </el-col>
                    <el-col :span="8">
                      <el-popover style="background-color: rgba(255,255,255,0.5);"
                                  :visible-arrow="false"
                                  placement="bottom-end"
                                  width="200"
                                  trigger="hover"
                                  ref="op_popover" popper-class="op_popover">
                        <div class="popoverDetail">
                          <el-row>
                            <el-col :span="24">
                              {{commit.author.name}}
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                              <span>{{commit.author.email}}</span>
                            </el-col>
                          </el-row>
                        </div>
                        <template #reference>
                          <div>
                            author: <el-link :href="'https://github.com/' + commit.author.name">{{commit.author.name}}</el-link>
                          </div>
                        </template>
                      </el-popover>
                    </el-col>
                  </el-row>
                </div>
                <el-row style="margin-top: 10px;" v-if="event.type === 'CreateEvent'">
                  <el-col :span="9" v-if="event.payload.description">
                    description: <span>{{event.payload.description}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/github.css";
@import "@/assets/css/scrollbar.css";
@import "@/assets/css/underline.css";
</style>