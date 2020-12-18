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
  props: ["songid", "seekTime"],
  computed: {
    isPlay() {
      return this.$store.state.player.isPlay;
    },
  },
  watch: {
    seekTime(newTime, oldTime) {
      if (!this.lrcObj) {
        return false;
      }
      this.lrcObj.seek(newTime * 1000);
    },
    isPlay(newPlay, oldPlay) {
      console.log("歌词播放状态", newPlay);
      if (!this.lrcObj) {
        return false;
      }
      if (newPlay) {
        this.lrcObj.play(this.seektime * 1000);
      } else {
        this.lrcObj.stop();
      }
    },
  },
  mounted() {
    getLrc(this.songid).then((res) => {
      let lrc = res.data.data.lyric;
      // console.log(lrc);
      if (this.lrcObj) {
        this.lrcObj.stop();
      }
      this.lrcObj = new Lyric(lrc, (obj) => {
        console.log(obj.txt);
        this.text = obj.txt;
      });
      this.lrcObj.play();
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
  .flex-center;
}
</style>
