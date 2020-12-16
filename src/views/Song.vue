<template>
  <div class="content-div">
    <!-- 顶部歌手图片部分 -->
    <div
      class="singer-banner"
      :style="{
        background: `url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000) center center/cover`,
      }"
    >
      <div class="singer-top">
        <p><van-icon name="arrow-left" /></p>
        <p>
          <span><van-icon name="share" /></span>
          <span>···</span>
        </p>
      </div>
      <div class="singer-bottom">
        <div class="singer-name">{{ name }}</div>
        <div class="singer-fans">2469.6万粉丝</div>
        <div class="concern">
          <van-button type="default" :round="true">扑通小组</van-button>
          <van-button type="default" :round="true">已关注</van-button>
        </div>
      </div>
    </div>
    <!-- 专辑信息部分 -->
    <div class="album-msg">
      <div class="left">
        <p class="oneline">
          <span>数字专辑</span>
          <span class="album-name">Mojito</span>
        </p>
        <p class="twoline">
          <span class="album-sell">已售5555555张</span>
        </p>
      </div>
      <div class="right">
        <p class="album-price">￥3.00</p>
        <p class="album-buy">
          <span><van-icon name="shopping-cart-o" /></span>
          <span>购买</span>
        </p>
      </div>
    </div>
    <!-- 核心内容nav部分 -->
    <div class="wrapper-box">
      <ul>
        <li>
          <span class="song-title1">歌曲</span>
          <span class="num song-num">35</span>
        </li>
        <li>
          <span class="song-title2">专辑</span>
          <span class="num album-num">35</span>
        </li>
        <li>
          <span class="song-title2">视频</span>
          <span class="num video-num">35</span>
        </li>
        <li>
          <span class="song-title2">关于TA</span>
          <span></span>
        </li>
      </ul>
    </div>
    <!-- 全部播放、热门、菜单 -->
    <div class="wrapper-play">
      <p class="play-all">
        <span><van-icon name="play-circle" /></span>
        <span>全部播放</span>
      </p>
      <p class="hot">
        <span>热门</span>
        <span>
          <van-icon name="arrow-down" />
        </span>
        <span><van-icon name="bars" /></span>
      </p>
    </div>
    <!-- 歌曲列表 -->
    <div class="song-list">
      <ul>
        <li
          v-for="(item, index) in songlist"
          :key="item.mid"
          @click="jumpTo(item.mid, index)"
        >
          <!-- <router-link :to="'/player/' + item.mid"> -->
          <div class="left">
            <p class="song-name">{{ item.name }}</p>
            <p class="about">
              <span>VIP</span>
              <span>SQ</span>
              <span>独家</span>
              <span class="singer-name" v-for="itm in item.singer" :key="itm.mid">{{
                itm.name
              }}</span>
              <span class="point">·</span>
              <span class="album-name">{{ item.album.name }}</span>
            </p>
          </div>
          <div class="right">
            <span><van-icon name="play-circle" /></span>
            <span>···</span>
          </div>
          <!-- </router-link> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import { getSongs } from "../api/singer"; //这里的一定要加{}，不然会被当做是方法使用，报错
export default {
  data() {
    return {
      name: "",
      mid: "",
      songlist: [],
    };
  },
  created() {
    // console.log(this.$route.params);
    let { params } = this.$route;
    let { singer_mid, singer_name } = params.singer_mid
      ? params
      : {
          singer_mid: "002J4UUk29y8BY",
          singer_name: "薛之谦",
        };
    // let { singer_mid, singer_name } = params;
    this.name = singer_name;
    this.mid = singer_mid;

    getSongs(this.mid).then((res) => {
      // console.log(res);
      this.songlist = res.data.data.list;
      console.log(this.songlist);
    });
  },
  methods: {
    jumpTo(songmid, index) {
      this.$router.push(`/player/${songmid}`);
      this.$store.commit("getHotSongList/getListMut", this.songlist);
      this.$store.commit("getHotSongList/getCurrentMut", index);
    },
  },
};
</script>

<style lang="less">
@import "../style/index.less";
body {
  .w(750);
  .content-div {
    width: 100%;
  }
  .singer-banner {
    background: #525253;
    position: relative;
    .h(676);
    .singer-top {
      .pad(30,30);
      .flex;
      .fs(40);
      color: #ffffff;
      p {
        &:nth-child(2) {
          span {
            &:nth-child(2) {
              .marg_l(30);
              .fs(50);
            }
          }
        }
      }
    }
    .singer-bottom {
      width: 100%;
      .pad(30,30);
      position: absolute;
      bottom: 30 / @remSize;
      .fs(23);
      color: #ffffff;
      div {
        .marg_t(10);
      }
      .singer-name {
        .fs(36);
        font-weight: bold;
      }
      .concern {
        display: flex;
        justify-content: space-between;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 30 / @remSize;
          .fs(30);
          .h(65);
          background: none;
          color: #ffffff;
        }
      }
    }
  }
  .album-msg {
    .marg(20,30);
    .pad(20,30);
    border-radius: 10px;
    .flex;
    background: #eef0f1;
    .left {
      .oneline {
        .marg_b(10);
        span {
          .marg_r(10);
          &:nth-child(1) {
            color: #ffffff;
            background: #545454;
            .pad(10);
            .fs(20);
            border-radius: 5px;
          }
          &:nth-child(2) {
            .fs(23);
            font-weight: bold;
          }
        }
      }
      .twoline {
        .fs(21);
        color: #525253;
      }
    }
    .right {
      .flex;
      p {
        &:nth-child(1) {
          .marg_r(30);
          .fs(23);
          font-weight: bold;
          &:nth-child(2) {
            .fs(30);
          }
        }
        &:nth-child(2) {
          .pad(10,30);
          border-radius: 10px;
          .flex;
          .fs(30);
          font-weight: bold;
          background: #ffffff;
          span {
            &:nth-child(2) {
              .marg_l(10);
            }
          }
        }
      }
    }
  }
  .wrapper-box {
    ul {
      .pad(40,60);
      .flex;
      .num {
        .fs(17);
        color: #747474;
        .marg_l(8);
        span[class="song-title2"] {
          .fs(25);
          color: #747474;
        }
      }
      li {
        .pad(20,0);
        &:nth-child(1) {
          font-weight: bold;
          .song-title1 {
            .fs(40);
          }
          .song-num {
            .fs(17);
          }
        }
      }
    }
  }
  .wrapper-play {
    .pad(30,30);
    .flex;
    .play-all {
      .fs(30);
      .flex;
      span {
        &:nth-child(1) {
          .fs(40);
          color: #69e0b8;
        }
        &:nth-child(2) {
          .marg_l(10);
        }
      }
    }
    .hot {
      color: #9e9e9e;
      .flex;
      span {
        .marg_l(10);
        &:nth-child(1) {
          .fs(28);
        }
        &:nth-child(2) {
          .fs(20);
          .marg_l(4);
        }
        &:nth-child(3) {
          .fs(40);
        }
      }
    }
  }
  .song-list {
    .pad(20,30);
    li {
      .pad(10,0);
      .flex;
      .left {
        color: #686868;
        .song-name {
          .fs(30);
          color: #090909;
        }
        .about {
          .flex;
          span {
            &:nth-child(-n + 3) {
              border: 1px solid #69e0b8;
              border-radius: 4px;
              .fs(8);
              .marg_r(5);
            }
            &:nth-child(2) {
              color: #e9be6a;
              border: 1px solid #e9be6a;
            }
            &:nth-child(4 + n) {
              color: #9d9d9d;
            }
          }
          .point {
            .marg(10);
          }
          .singer-name {
            .fs(25);
            .marg(5);
          }
          .album-name {
            .fs(25);
          }
        }
      }
      .right {
        .flex;
        span {
          .fs(40);
          color: #bababa;
          &:nth-child(1) {
            .marg_r(30);
          }
        }
      }
    }
  }
}
</style>
