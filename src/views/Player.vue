<template>
  <div>
    <div class="navbar">
      <div class="left">
        <van-icon name="arrow-down" />
      </div>
      <div class="center">
        <span>推荐</span>
        <span class="song">歌曲</span>
        <span>歌词</span>
      </div>
      <div class="right">
        <p class="zhibo">
          <img src alt />
        </p>
        <p>
          <van-icon name="share-o" />
        </p>
      </div>
    </div>
    <div class="content_box">
      <div
        class="song-img"
        :style="{ background: `url(${albumPic}) center center/cover` }"
      ></div>
      <Lrc :songid="songid"></Lrc>
      <div class="play">
        <div
          class="progress"
          ref="progress"
          @touchstart="handleStart"
          @touchmove="handleMove"
          @touchend="handleEnd"
        >
          <div class="progress-box" ref="progress_box">
            <div class="point"></div>
          </div>
        </div>
        <div class="time">
          <div class="start-time" :start="start">{{ start | filterTime }}</div>
          <div class="all-time">{{ end | filterTime }}</div>
        </div>
      </div>
      <div class="control-play">
        <span class="iconfont repeat">&#xe600;</span>
        <span class="iconfont lastsong">&#xe6cc;</span>
        <p class="pause">
          <span class="iconfont pause">&#xe721;</span>
        </p>
        <span class="iconfont nextsong">&#xe6cb;</span>
        <span class="iconfont menu">&#xe64c;</span>
      </div>
    </div>
    <audio
      :src="`${songurl}`"
      @canplay="canPlay"
      @timeupdate="timeUpdate"
      ref="audio"
    ></audio>
  </div>
</template>

<script>
import { getSongUrl } from "@/api/singer.js";
import { getAlbum } from "../api/singer";
import Lrc from "../components/Lrc";
import songs from "../utils/songs";
export default {
  components: {
    Lrc,
  },
  // props: {
  //   start: { type: Number, default: 0 },
  //   end: { type: Number, default: 0 },
  // },
  computed: {
    isPlay() {
      return this.$store.state.player.isPlay;
    },
    getList() {
      return this.$store.state.getHotSongList.songlist;
    },
    getCurrentSong() {
      return this.$store.state.getHotSongList.currentidx;
    },
  },
  watch: {
    start() {
      //监听播放时间的变化
      let percent = (this.start / this.end) * 100;
      this.$refs.progress_box.style.width = `${percent}%`;
    },
    isPlay() {
      console.log("监听到了isPlay的状态", this.isPlay);
      let audio = this.$refs.audio;
      this.isPlay ? audio.play() : audio.pause();
    },
  },
  data() {
    return {
      name: "演员",
      songurl: "",
      start: 0,
      end: 0,
      percent: 0,
      songlist: [],
      albummid: "",
      albumPic: "",
      songid: "",
    };
  },
  created() {
    // console.log("歌曲id", this.$route.params.id);
    // console.log("songlist", this.getList);
    // console.log("currentidx", this.getCurrentSong);
    this.albummid = this.getList[this.getCurrentSong].album.mid;
    // this.songmid = this.getList[this.getCurrentSong].mid;
    // console.log("songmid", this.songmid);
    let { id } = this.$route.params;
    this.songurl = songs[id];
    this.songid = id;
    console.log(this.songurl, this.songid);
    // getSongUrl(id).then((res) => {
    //   // console.log(res);
    //   // console.log(res.data.data[id]);
    //   this.songurl = res.data.data[id];
    // });
    getAlbum(this.albummid).then((res) => {
      console.log("获取当前播放歌曲的专辑信息", res);
      this.albumPic = res.data.data.picUrl;
      // console.log(this.albumPic);
    });
  },
  methods: {
    canPlay() {
      console.log("音乐可以播放了");
      let audio = this.$refs.audio;
      let { currentTime, duration } = audio;
      this.start = currentTime;
      this.end = duration;
      this.$store.commit("player/isPlayMut", true);
    },
    handleStart(e) {
      this.$store.commit("player/isPlayMut", false);
    },
    handleMove(e) {
      this.$store.commit("player/isPlayMut", false);
      let progress = this.$refs.progress;
      let offsetX = progress.getBoundingClientRect().left;
      let { clientX } = e.targetTouches[0];
      let distance = clientX - offsetX;
      let max = progress.getBoundingClientRect().width;
      let percent = (distance / max) * 100;
      this.percent = percent;
      if (distance > 0 && distance <= max) {
        this.$refs.progress_box.style.width = `${percent}%`;
      }
      console.log(this.end, this.percent);
      this.start = (this.end * this.percent) / 100;
    },
    handleEnd(e) {
      this.$store.commit("player/isPlayMut", true);
      let t = (this.percent * this.end) / 100;
      this.$refs.audio.currentTime = t;
    },
    timeUpdate() {
      let audio = this.$refs.audio;
      // console.log(audio.currentTime, audio.duration);
      let { currentTime, duration } = audio;
      this.start = currentTime;
    },
  },
  filters: {
    filterTime: (value) => {
      let time = parseInt(value);
      let m = parseInt(time / 60);
      let s = time % 60;
      s = s < 9 ? `0${s}` : s;
      m = m < 9 ? `0${m}` : m;
      return m + ":" + s;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/index.less";

body {
  height: 100vh;
  background: #6c4e3a;
}
.navbar {
  position: relative;
  .flex;
  .marg(44);
  .h(60);
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .fs(26);
    .w(236);
    .flex;
    .song {
      padding-left: 18 / @remSize;
      padding-right: 18 / @remSize;
      .h(10);
      .l_h(10);
      border-left: 1px solid #857265;
      border-right: 1px solid #857265;
    }
  }
  .right {
    .flex;
    .w(130);
    .zhibo {
      .flex-center;
      .w(60);
      .h(60);
      border: 1px solid #857265;
      border-radius: 50%;
      img {
        .h(44);
        .w(44);
        background: orange;
        border-radius: 50%;
      }
    }
  }
}
.content_box {
  width: 100%;
  margin: 0 auto;
  .pad_l(62);
  .pad_r(62);
  .song-img {
    .w(630);
    .h(630);
    background: url() left top 100% 100% / cover;
    border-radius: 8px;
    .marg_b(66);
  }
  .play {
    .progress {
      .marg_t(54);
      .marg_b(24);
      position: relative;
      height: 6px;
      border-radius: 3px;
      background: #999999;
      .progress-box {
        height: 6px;
        position: absolute;
        top: 0;
        left: 0;
        // width: 20%;
        background: skyblue;
        border-radius: 3px;
        .point {
          position: absolute;
          top: 50%;
          right: -10 / @remSize;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: orange;
        }
      }
    }
    .time {
      .flex;
      .marg_t(14);
    }
  }
  .control-play {
    /deep/.iconfont {
      .fs(50);
    }
    .marg(0, 65);
    .fs(40);
    .flex;
    .pause {
      .w(116);
      .h(116);
      background: #bbbbbb;
      .flex-center;
      border-radius: 50%;
      .fs(60);
      /deep/.iconfont {
        .fs(60);
      }
    }
  }
}
</style>
