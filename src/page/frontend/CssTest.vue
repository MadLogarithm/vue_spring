<script>
export default {
  name: "CssTest"
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
        <div class="textAnimation" data-text="MadLogar">MadLogar</div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.cssTestContainer {
  height: 590px;
  overflow: auto;
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
.underlineCss, .gridCss, .loadingCss {
  margin: 40px 40px 0;
  white-space: pre-wrap;
}
.underlineCss span {
  background: linear-gradient(to right, #7e2f2b,#146420) no-repeat right bottom;
  background-size: 0 2px;
  transition: background-size 1s;
}
.underlineCss span:hover {
  background-position: left bottom;
  background-size: 100% 2px;
}
.gridContainer {
  width: 400px;
  height: 400px;
  margin: auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  transition: 0.5s;
  .gridItem {}
}
@for $i from 1 through 9 {
  .gridItem:nth-child(#{$i}) {
    background-color: hsl($i* 40, 100%, 74%);
  }
  .gridContainer:has(.gridItem:nth-child(#{$i}):hover) {
    $r: floor(($i - 1) / 3 + 1);
    $c: ($i - 1) % 3 + 1;
    $arr: 1fr 1fr 1fr;
    $rows: set-nth($arr, $r, 2fr);
    $cols: set-nth($arr, $c, 2fr);
    grid-template-rows: $rows;
    grid-template-columns: $cols;
  }
}
.dotLoading {}
.dotLoading > dot {
  height: 1em;
  overflow: hidden;
  display: inline-block;
  text-align: left;
  vertical-align: -0.25em;
  line-height: 1;
}
.dotLoading > dot:before {
  display: block;
  content: '...\A..\A.';
  white-space: pre-wrap;
  animation: dot 3s infinite step-start both;
}
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
.bouncingLoader {
  display: flex;
  justify-content: center;
}
.bouncingLoaderItem {
  width: 16px;
  height: 16px;
  margin: 3rem 0.2rem;
  background-color: #0b16f1;
  border-radius: 50%;
  animation: bouncingLoader 0.6s infinite alternate;
}
.bouncingLoaderItem:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncingLoaderItem:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bouncingLoader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
}
.textAnimation {
  width: 750px;
  color: #000;
  font-family: MomoStorm,serif;
  font-size: 100px;
  position: relative;
  margin: 0 auto;
}
.textAnimation:before {
  content: attr(data-text);
  background-color: #fff;
  position: absolute;
  left: 3px;
  text-shadow: 3px 0 red;
  animation: textAni2 2s linear infinite alternate-reverse;
}
.textAnimation:after {
  content: attr(data-text);
  background-color: #fff;
  position: absolute;
  left: 3px;
  text-shadow: -3px 0 blue;
  animation: textAni1 2s linear infinite alternate-reverse;
}
@keyframes textAni1 {
  $steps : 25;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip-path: inset(random(100) + px 0 random(100) + px 0);
    }
  }
}
@keyframes textAni2 {
  $steps : 25;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip-path: inset(0 random(450) + px 0 random(450) + px);
    }
  }
}
</style>