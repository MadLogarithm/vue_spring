<script>
import axios from "axios";

export default {
  name: "ReportGetTest",
  data() {
    return {
      response: [],
    }
  },
  methods: {
    getReport() {
      // 调用后端接口获取报告数据
      axios.get('https://www.yunbaogao.cn/reportFile/opinionLeader/getInteractionHistory', {
        params: {
          since: '2023-4-8',
          until: '2024-4-8',
          _id: '183217247'
        }
      })
          .then(response => {
            this.response = response.data;
            console.log(response.data)
          })
          .catch(error => {
            console.error(error);
          })
    },
  },
  mounted() {
    this.getReport();
  }
}
</script>

<template>
  <div class="homeContainer">
    {{response}}
  </div>
</template>

<style scoped>
.homeContainer {
  height: 590px;
  overflow: hidden;
}
</style>
