<template>
  <div class="box">
    <van-nav-bar title="歌手库" left-arrow class="top">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="content-box">
      <div class="hot-singer">
        <div class="title">
          <span>热门歌手</span>
          <span>
            <em>关注歌手</em>
            <em><van-icon name="arrow" /></em>
          </span>
        </div>
        <div class="wrapper1" ref="wrapper1">
          <ul class="content1">
            <li v-for="(item, index) in hot_list" v-show="index < 10" :key="index">
              <img :src="item.singer_pic" alt="" />
              <p class="singer-name">{{ item.singer_name }}</p>
              <p class="play">
                <span></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="category">
        <ul
          v-for="(value, name, idx) in singer_category"
          :class="'wrapper2' + '_' + idx"
          :ref="'wrapper2' + '_' + idx"
          :key="idx"
          v-show="name != 'index'"
        >
          <li :class="'content2' + '_' + idx">
            <van-button
              size="mini"
              :round="true"
              v-for="(item, index) in value"
              :key="index"
              :type="index == numArr[idx] ? 'primary' : 'default'"
              @click="handleCategory(idx, index, item.id)"
              >{{ item.name }}</van-button
            >
          </li>
        </ul>
      </div>
      <div class="singer-chose-fa">
        <ul class="singer-chose">
          <li
            class="singer-about-fa"
            v-for="(item, index) in singer_list"
            :key="index"
            @click="jumpTo(item)"
          >
            <div class="singer-about">
              <div class="singer-pic">
                <img :src="item.singer_pic" alt="" />
              </div>
              <div class="singer-msg">
                <p class="singer-name">{{ item.singer_name }}</p>
                <p class="fans">粉丝 32.5万</p>
              </div>
            </div>
            <div class="concern">
              <van-button type="default" size="normal" :round="true">关注</van-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import { getSingerList, getSingerCategory } from "../api/singer";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      singer_list: [],
      hot_list: [],
      singer_category: {},
      numArr: [0, 0, 0, 0, 0, 0], //记录四个不同分类的被激活序号
      idArr: [-100, -100, -100, -100, -100, -100], // 记录当前被点击分类的id
    };
  },
  created() {
    getSingerList().then((res) => {
      this.singer_list = res.data.data.list;
      this.hot_list = res.data.data.list;
      // console.log("singer_list", this.singer_list);
    });
    getSingerCategory().then((res) => {
      this.singer_category = res.data.data;
      // console.log("singer_category", this.singer_category);
    });
  },
  updated() {
    // console.log(this.$refs);
    // console.log(this.$refs.wrapper1);
    // console.log(this.$refs.wrapper2_1[0]);
    let scroll1 = new BScroll(this.$refs.wrapper1, { scrollX: true });
    // let scroll2 = new BScroll(this.$refs.wrapper2_1[0], { scrollX: true });
  },
  methods: {
    handleCategory(idx, index, id) {
      let numArr = this.numArr;
      let idArr = this.idArr;
      numArr[idx] = index;
      idArr[idx] = id;
      // console.log("numArr", numArr);
      // console.log("idArr", idArr);
      this.numArr = [...numArr];
      this.idArr = [...idArr];
      getSingerList(idArr[0], idArr[1], idArr[3]).then((res) => {
        this.singer_list = res.data.data.list;
        // console.log("singer_list", this.singer_list);
      });
    },
    jumpTo(item) {
      this.$router.push({
        name: "song",
        params: item,
      });
    },
  },
};
</script>

<style lang="less">
@import "../style/index.less";
body {
  background: #fafafa;
  .w(750);
}
.content-box {
  background: #fafafa;
  .pad(30,30);
}
.top {
  background: #ffffff;
}
.hot-singer {
  width: 100%;
  overflow: hidden;
  // height: 327 / @remSize;
  .h(327);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // font-size: 20 / @remSize;
    .fs(20);
    color: #858585;
    .pad_l(20);
    .pad_b(34);
    .h(76);
    span {
      &:nth-child(2) {
        .h(16);
        em {
          &:nth-child(2) {
            .marg_l(10);
            .l_h(16);
          }
        }
      }
    }
  }
  .wrapper1 {
    width: 100%;
    .content1 {
      .w(1900);
      display: flex;
      .marg_r(30);
      li {
        flex-shrink: 0;
        background: #ffffff;
        .w(150);
        .h(220);
        display: flex;
        flex-direction: column;
        align-items: center;
        .marg_r(25);
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
        img {
          .w(90);
          .h(90);
          border-radius: 50%;
          .marg_t(20);
        }
        .singer-name {
          .fs(20);
        }
      }
    }
  }
}
.category {
  width: 100%;
  overflow: hidden;
  ul {
    width: 100%;
    li {
      width: 100%;
    }
  }
  .wrapper2_1 {
    .content2_1 {
      width: 150%;
    }
  }
}
.singer-chose-fa {
  .marg(40,0);
  .singer-chose {
    .singer-about-fa {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .h(110);
      .marg_b(20);
      .singer-about {
        display: flex;
        align-items: center;
        .singer-pic {
          .w(110);
          .h(110);
          border-radius: 50%;
          overflow: hidden;
          .marg_r(20);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .singer-msg {
          display: flex;
          flex-direction: column;
          .singer-name {
            .fs(27);
          }
          .fans {
            .fs(19);
            color: #919191;
            .marg_t(10);
          }
        }
      }
    }
  }
}
</style>
