<template>
  <div class="mine">
    <div class="header">
      <!-- 用户信息 -->
      <div v-if="$store.state.token" class="user">
        <img class="user-icon" :src="userObj.photo" alt />
        <span class="username">{{userObj.name}}</span>
      </div>
      <div v-else class="user">
        <img class="top-phone" src="http://toutiao.research.itcast.cn/img/wd_weidl.png" alt />
      </div>

      <!-- 粉丝关注 -->
      <div v-if="$store.state.token" class="fans-info">
        <div class="detail">
          <div>{{userObj.art_count}}</div>
          <div>动态</div>
        </div>
        <div class="detail">
          <div>{{userObj.follow_count}}</div>
          <div>关注</div>
        </div>
        <div class="detail">
          <div>{{userObj.fans_count}}</div>
          <div>粉丝</div>
        </div>
      </div>
      <!-- 今日阅读 -->
      <div v-if="$store.state.token" class="read">
        <span>今日阅读</span>
        <span>20分钟</span>
      </div>
    </div>
    <!-- 工具栏 -->
    <div class="tools">
      <div class="items">
        <van-icon class="icon1" name="star-o" />
        <div class="word">收藏</div>
      </div>
      <div class="items">
        <van-icon class="icon2" name="underway-o" />
        <div class="word">历史</div>
      </div>
      <div class="items">
        <van-icon class="icon3" name="records" />
        <div class="word">作品</div>
      </div>
    </div>
    <!-- 设置栏 -->
    <van-cell-group class="setting">
      <van-cell class="set-item" title="消息通知" is-link />
      <van-cell class="set-item" title="用户反馈" is-link />
      <van-cell class="set-item" title="小智同学" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getInfo } from "@/api/user.js";
export default {
  data() {
    return {
      userObj: {}
    };
  },
  async created() {
    if (this.$store.state.token) {
      // 有token代表登录了，就发送请求获取当前数据。
      let res = await getInfo();
      console.log(res);
      this.userObj = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  .header {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #3e9df8;
    .user {
      display: flex;
      padding: 40px 20px 0px 20px;
      .user-icon {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-left: 30px;
      }
      .username {
        margin-left: 20px;
        color: #fff;
      }
      .top-phone {
        width: 60px;
        height: 60px;
        margin: 0 auto;
      }
    }

    .fans-info {
      display: flex;
      padding: 15px 0;
      .detail {
        flex: 1;
        color: #fff;
        text-align: center;
      }
    }
    .read {
      position: absolute;
      top: 54px;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 4px 10px 4px 15px;
      border-top-left-radius: 27px;
      border-bottom-left-radius: 27px;
      color: #fff;
      font-size: 14px;
    }
  }
  .tools {
    display: flex;
    padding: 20px 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .items {
      flex: 1;
      text-align: center;
      border-right: 1px solid #ccc;
      &:last-child {
        border: none;
      }
      .icon1,
      .icon2,
      .icon3 {
        font-size: 35px;
        margin-bottom: 8px;
      }
      .icon1 {
        color: red;
      }
      .icon2 {
        color: rgb(255, 158, 31);
      }
      .icon3 {
        color: rgb(106, 147, 255);
      }
    }
  }
  .setting {
    .set-item {
      font-size: 18px;
      height: 48px;
    }
  }
}
</style>