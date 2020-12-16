<template>
  <div class="lrc">
    {{ text }}
  </div>
</template>

<script>
import { getLrc } from "../api/singer";
import Lyric from "lyric-parser";
export default {
  data() {
    return {
      text: "暂无歌词",
    };
  },
  props: ["songid"],
  mounted() {
    getLrc(this.songid).then((res) => {
      console.log("lrc", res);
      let lrc = res.data.data.lyric;
      this.lrcObj = new Lyric(lrc, (obj) => {
        console.log(obj.txt);
        this.text = obj.txt;
      });
    });
  },
};
</script>

<style lang="less" scoped>
@import "../style/index.less";
.lrc {
  .fs(24);
  color: #999999;
  .marg_b(50);
  .h(110);
}
</style>
