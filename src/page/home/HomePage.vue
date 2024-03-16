<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      user: null,
      events: null,
      loading: false,
      error: null,
      eventsLoading: false,
      eventsError: null,
    }
  },
  methods: {
    getUserInfo() {
      if(!this.loading) {
        this.loading = true;
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
      }
    },
    getRecentEvents() {
      if(!this.eventsLoading) {
        this.loading = true;
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
              <el-link style="font-weight: bolder; line-height: 30px; font-size: 1.2em" :href="user.html_url">{{user.login}}</el-link>
            </el-col>
          </el-row>
          <el-row style="margin: 10px;">
            <div style="color: black; font-size: 1em; font-family: MomoStorm,serif;">
              {{user.bio}} ——{{user.name}}
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
            <el-col :span="12">
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
              twitter_username: <el-link :href="'https://twitter.com/' + user.twitter_username">{{user.twitter_username}}</el-link>
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
        </el-col>
      </el-row>
      <div v-if="eventsLoading" style="margin-top: 10px">
        <i class="el-icon-loading" style="font-size: 20px; padding: 20px;"></i>Loading...
      </div>
      <div class="errorBox" style="margin: 20px" v-if="eventsError">{{eventsError}}</div>
      <div class="eventsBox" style="margin-top: 20px" v-if="!eventsLoading && !eventsError && events != null">
        <div style="margin-left: 160px; font-weight: bolder; line-height: 30px; font-size: 1.2em">Recent Events</div>
        <div class="recentEvents" style="margin-top: 10px">
          <div class="eventsList">
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
                                  width="180"
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
                  <el-col :span="9">
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
.recentEvents {
  display: flex;
  justify-content: center;
}
.eventsList {
  margin-top: 10px;
  height: 290px;
  width: 70%;
  overflow: auto;
}
.basicInfo {
  span {
    font-size: 14px;
    font-weight: 500;
    color: #606266
  }
}
.eventCard {
  background-color: #FFFFFF;
  border-radius: 0;
  border-bottom: 1px solid lightgray;
  width: 760px;
  text-overflow: clip;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #606266
  }
}
.popoverDetail {
  span {
    font-size: 14px;
    font-weight: 500;
    color: #606266
  }
}
body *::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 10px;
}
body *::-webkit-scrollbar-track {
  background: rgba(0,0,0,.1);
  border-radius: 0;
}
body *::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0,0,0,.25);
  transition: color .2s ease;
}
</style>