<script>
export default {
  name: "CssTest",
  data() {
    return {
      starOn: false,
    }
  }
}
</script>

<template>
  <div class="cssTestContainer">
    <div class="cssTestIntro">
      <el-row style="color:black; font-size: 1.5em; font-family: 'MomoStorm', serif;">
        <el-col :span="3" />
        <el-col :span="8">
          CSS Test
        </el-col>
      </el-row>
      <el-row style="color: black; font-size:1em; font-family: MomoStorm,serif;">
        <el-col :span="4" />
        <el-col :span="20">
          record some interesting CSS usage.
        </el-col>
      </el-row>
    </div>
    <el-row class="underlineCssTest">
      <el-col :span="24">
        <div class="underlineCss">
          <el-row style="margin-bottom: 20px">
            <el-col :span="1" />
            <el-col :span="20" style="font-size: 1em">· underline animation test:</el-col>
          </el-row>
          <div style="margin-left: 80px">
            <span style="font-size: 1.5em; font-family: ShangWeiShouShu,serif">
              Cuanto te habrá dolido acostumbrarte a mí,
              <br>a mi alma sola y salvaje, a mi nombre que todos ahuyentan.
              <br>Hemos visto arder tantas veces el lucero besándonos los ojos
              <br>y sobre nuestras cabezas destorcerse los crepúsculos en abanicos girantes.
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="gridCssTest">
      <el-col :span="24">
        <div class="gridCss">
          <el-row style="margin-bottom: 20px">
            <el-col :span="1" />
            <el-col :span="20" style="font-size: 1em">· grid animation test:</el-col>
          </el-row>
          <div style="margin-left: 80px">
            <div class="gridContainer">
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
              <div class="gridItem" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="loadingCssTest">
      <el-col :span="24">
        <div class="loadingCss">
          <el-row style="margin-bottom: 20px">
            <el-col :span="1" />
            <el-col :span="20" style="font-size: 1em">· loading animation test:</el-col>
          </el-row>
          <div style="margin-left: 80px">
            <el-row>
              <div class="dotLoading">正在加载中<dot>...</dot></div>
            </el-row>
            <el-row>
              <div class="bouncingLoader">
                <div class="bouncingLoaderItem" />
                <div class="bouncingLoaderItem" />
                <div class="bouncingLoaderItem" />
              </div>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="textAnimationCssTest">
      <el-col :span="24">
        <div class="textCss">
          <el-row style="margin-bottom: 20px">
            <el-col :span="1" />
            <el-col :span="20" style="font-size: 1em">· text animation test:</el-col>
          </el-row>
          <div  style="margin-left: 80px" class="textAnimation" data-text="MadLogar">MadLogar</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="starAnimationCssTest">
      <el-col :span="24">
        <div class="starCss">
          <el-row style="margin-bottom: 20px">
            <el-col :span="1" />
            <el-col :span="20" style="font-size: 1em">· star animation test:</el-col>
          </el-row>
          <div  style="margin-left: 80px">
            <el-switch v-model="starOn" />
            <div class="starAnimation" v-if="starOn">
              <div class="nightSky1" />
              <div class="nightSky2" />
              <div class="nightSky3" />
              <div class="nightSky4" />
              <div class="nightSky5" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.cssTestContainer {
  height: 590px;
  overflow: auto;
}
.underlineCss, .gridCss, .loadingCss, .textCss, .starCss {
  margin: 40px 40px 0;
  white-space: pre-wrap;
}
@import "@/assets/css/scrollbar.css";
@import "@/assets/css/underline.css";
@import "@/assets/css/grid.scss";
@import "@/assets/css/dotLoading.css";
@import "@/assets/css/bouncingLoader.css";
@import "@/assets/css/textAnimation.scss";
@import "@/assets/css/starAnimation";
.starAnimation {
  background-color: black;
  width: 1000px;
  height: 500px;
}
</style>