<script>
export default {
  name: "CssTest"
}
</script>

<template>
  <div class="cssTestContainer">
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
    <el-row>
      <el-col :span="24">
        <div class="underlineCssTest">
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
    <el-row>
      <el-col :span="24">
        <div class="underlineCssTest">
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
.underlineCssTest {
  margin: 40px;
  white-space: pre-wrap;
}
.underlineCssTest span {
  background: linear-gradient(to right, #7e2f2b,#146420) no-repeat right bottom;
  background-size: 0 2px;
  transition: background-size 1s;
}
.underlineCssTest span:hover {
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
</style>