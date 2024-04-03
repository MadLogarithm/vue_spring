<script>
export default {
  name: "CssTest"
}
</script>

<template>
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
</template>

<style scoped>
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
</style>
