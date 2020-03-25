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
      <van-cell @click="nameShow=true" is-link title="昵称" :value="userProfile.name"></van-cell>
      <van-cell @click="introShow=true" is-link title="介绍" :value="userProfile.intro"></van-cell>
      <!-- 分割线 -->
      <div class="split"></div>
      <van-cell @click="genderShow=true" is-link title="性别" :value="userProfile.gender==0?'男':'女'"></van-cell>
      <van-cell @click="birthdayShow=true" is-link title="生日" :value="userProfile.birthday"></van-cell>
    </van-cell-group>
    <!-- 头像弹出层 -->
    <photo @upOK="changeImg" ref="photo"></photo>
    <!-- 昵称弹出层 -->
    <van-popup v-model="nameShow" position="bottom">
      <van-field v-model="userProfile.name" required placeholder="请输入用户名" />
    </van-popup>
    <!-- 介绍弹出层 -->
    <van-popup v-model="introShow" position="bottom">
      <van-field
        maxlength="50"
        show-word-limit
        type="textarea"
        v-model="userProfile.intro"
        placeholder="请输入简介"
      />
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup v-model="genderShow" position="bottom">
      <van-picker
        show-toolbar
        @cancel="genderShow = false"
        :columns="columns"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="birthdayShow" position="bottom">
      <van-datetime-picker
        @cancel="birthdayShow=false"
        @confirm="ChooseTime"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { userProfile, getInfo, editProfile } from "@/api/user.js";
import bus from "@/utils/bus.js";
import photo from "./components/photo";
import dayjs from "dayjs";
export default {
  name: "personInfo",
  components: {
    photo
  },
  data() {
    return {
      userProfile: {},
      nameShow: false,
      introShow: false,
      genderShow: false,
      birthdayShow: false,
      columns: ["男", "女"],
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    };
  },
  methods: {
    ChooseTime(value) {
      this.userProfile.birthday = dayjs(value).format("YYYY-MM-DD");
      this.birthdayShow = false;
    },
    onConfirm(value, index) {
      this.userProfile.gender = index;
      this.genderShow = false;
    },
    // 保存按钮点击事件
    async onClickRight() {
      try {
        let res = await editProfile({
          name: this.userProfile.name,
          intro: this.userProfile.intro,
          gender: this.userProfile.gender,
          birthday: this.userProfile.birthday
        });
        // console.log(res);
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          onClose: () => {
            this.$toast.success("更新成功");
          }
        });
      } catch {
        this.$toast.fail("更新失败");
      }
    },
    changeImg(val) {
      // console.log(val);
      this.$refs.photo.show = false;
      this.userProfile.photo = val;
    }
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
  .van-nav-bar__text:active {
    background-color: transparent;
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