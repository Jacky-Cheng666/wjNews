<template>
  <div class="detail">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 文章部分 -->
    <h2 class="title">{{articleObj.title}}</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <div class="info">
          <img class="icon" :src="articleObj.aut_photo" alt />
          <!-- 作者名字和信息 -->
          <div class="aut-info">
            <div class="name">{{articleObj.aut_name}}</div>
            <div class="time">{{articleObj.pubdate | formatTime}}</div>
          </div>
          <!-- 关注按钮 -->
          <van-button @click="unFollow" v-if="articleObj.is_followed" type="info">已关注</van-button>
          <van-button @click="follow" v-else type="info" icon="plus">关注</van-button>
        </div>
      </template>
    </van-cell>
    <!-- 文章内容区域 -->
    <van-cell>
      <template slot="title">
        <div class="content" v-html="articleObj.content"></div>
      </template>
    </van-cell>
    <!-- 操作区域 -->
    <div class="operation">
      <van-button @click="like" :class="{active:articleObj.attitude==1}" icon="like" round>点赞</van-button>
      <van-button @click="buXiHuan" :class="{active:articleObj.attitude==0}" icon="delete" round>不喜欢</van-button>
    </div>
    <h3 style="padding-left:15px">猜你喜欢</h3>

    <!-- 评论区域 -->
    <comment ref="comment"></comment>
    <!-- 撰写评论区域 -->
    <write :isReply="false" :is_collected="articleObj.is_collected" ref="write"></write>
    <!-- 回复栏模块 -->
    <reply></reply>
  </div>
</template>

<script>
import write from "./components/write";
import comment from "./components/comment";
import reply from "./components/reply";
import {
  articleDetail,
  articleLike,
  articleDisLike,
  articleBuXiHuan,
  articleXiHuan
} from "@/api/article.js";
import { followUser, unFollow } from "@/api/user.js";
export default {
  name: "detail",
  components: {
    comment,
    write,
    reply
  },
  async created() {
    // 页面一打开就去加载文章详情。
    let res = await articleDetail({
      art_id: this.$route.params.art_id
      // 这里的art_id要和article.js文件里面的params后面名字一致。相当于这里传递过去的是一个对象。封装函数里面取到对象的art_id的属性。
    });
    // console.log(res);
    this.articleObj = res.data;
  },
  data() {
    return {
      articleObj: {}
    };
  },
  methods: {
    // 1，关注用户点击事件
    async follow() {
      // 判断用户是否登录
      if (this.$checkLogin()) {
        try {
          let res = await followUser({
            target: this.articleObj.aut_id
          });
          this.$toast.success("关注成功");
          this.articleObj.is_followed = true;
        } catch {}
      }
    },
    async unFollow() {
      if (this.$checkLogin()) {
        let res = await unFollow({
          aut_id: this.articleObj.aut_id
        });
        this.$toast.success("取消关注成功");
        this.articleObj.is_followed = false;
      }
    },
    // 点赞文章
    async like() {
      if (this.articleObj.attitude != 1) {
        // 如果这时候attitude的值不为1，则不为点赞状态
        if (this.$checkLogin()) {
          let res = await articleLike({
            target: this.articleObj.art_id.toString()
          });
          // console.log(res);
          this.articleObj.attitude = 1;
        }
      } else if (this.articleObj.attitude == 1) {
        // 如果这时候attitude的值为1，选中点赞状态。
        // 发送取消点赞请求
        if (this.$checkLogin()) {
          let res = await articleDisLike({
            art_id: this.articleObj.art_id.toString()
          });
          // console.log("取消点赞");
          this.articleObj.attitude = -1;
        }
      }
    },
    // 不喜欢点击按钮时间
    async buXiHuan() {
      if (this.$checkLogin()) {
        if (this.articleObj.attitude != 0) {
          let res = await articleBuXiHuan({
            target: this.articleObj.art_id
          });
          this.articleObj.attitude = 0;
        } else if (this.articleObj.attitude == 0) {
          let res = await articleXiHuan({
            art_id: this.articleObj.art_id
          });
          this.articleObj.attitude = -1;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  margin-bottom: 44px;
  .van-nav-bar {
    background-color: rgb(212, 61, 61);
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .title {
    text-align: center;
  }

  .info {
    display: flex;
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .aut-info {
      flex: 1;
    }
  }
  .content {
    /deep/img {
      // 如果图片本身比较小，没必要放大到和屏幕一样宽。
      max-width: 100%;
    }
    // 找到content里面所有元素，给他们都设置换行模式。
    /deep/ * {
      // word-wrap:break-word：允许长单词换行。
      word-wrap: break-word;
      white-space: normal;
    }
  }
  .operation {
    display: flex;
    justify-content: space-around;
    .active {
      border-color: red;
      color: red;
    }
  }
}
</style>