<template>
  <div class="personInfo">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />
    <!-- 单元格模块 -->
    <van-cell-group class="info">
      <van-cell @click="$refs.photo.show=true" title="头像" is-link>
        <template slot="default">
          <img class="avatar" :src="userProfile.photo" alt />
        </template>
      </van-cell>
      <van-cell is-link title="昵称" :value="userProfile.name"></van-cell>
      <van-cell is-link title="介绍" :value="userProfile.intro"></van-cell>
      <!-- 分割线 -->
      <div class="split"></div>
      <van-cell is-link title="性别" :value="userProfile.gender==0?'男':'女'"></van-cell>
      <van-cell is-link title="生日" :value="userProfile.birthday"></van-cell>
    </van-cell-group>
    <!-- 头像弹出层 -->
    <photo ref="photo"></photo>
  </div>
</template>

<script>
import { userProfile, getInfo } from "@/api/user.js";
import bus from "@/utils/bus.js";
import photo from "./components/photo";
export default {
  name: "personInfo",
  components: {
    photo
  },
  data() {
    return {
      userProfile: {}
    };
  },
  methods: {
    onClickRight() {}
  },
  async created() {
    // 1，获取用户个人信息
    let res = await userProfile();
    // console.log(res);
    this.userProfile = res.data;
    // 2，获取用户自己信息
    let res1 = await getInfo();
    // console.log(res1);
    // 注意这里不能通过这个方式直接加对象，这样加一个没有定义过的对象，页面上是不会响应的。
    // this.userProfile.intro = res1.data.intro;

    // $set是响应式添加对象。什么是响应式：简单来说就是数据变了，界面也会跟着变化。
    this.$set(this.userProfile, "intro", res1.data.intro);
  }
};
</script>

<style lang="less" scoped>
.personInfo {
  .van-nav-bar {
    background-color: #d43d3d;
    .van-icon-arrow-left,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
    }
  }
  .info {
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }

    .split {
      height: 10px;
      background-color: #f5f7f9;
    }
  }
}
</style>