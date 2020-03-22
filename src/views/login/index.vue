<template>
  <div class="login">
    <!-- 1,导航栏模块 -->
    <van-nav-bar title="登录" />
    <!-- 2，输入框 -->
    <van-field
      required
      :error-message="valid.mobile"
      v-model="form.mobile"
      clearable
      placeholder="请输入手机号"
    >
      <template slot="left-icon">
        <i class="iconfont icon-shouji"></i>
      </template>
    </van-field>
    <van-field
      required
      :error-message="valid.code"
      class="pwd"
      v-model="form.code"
      clearable
      placeholder="请输入密码"
    >
      <template slot="left-icon">
        <i class="iconfont icon-lock"></i>
      </template>
      <van-button @click="getYZM" round slot="button" size="small" class="code">发送验证码</van-button>
    </van-field>

    <!-- 3，登录按钮 -->
    <van-button
      loading-type="spinner"
      :loading="isLoading"
      loading-text="登陆中..."
      @click="doLogin"
      type="info"
      block
    >登录</van-button>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
import { setToken } from "@/utils/token.js";
export default {
  name: "login",
  data() {
    return {
      isLoading: false,
      // 错误提示对象。
      valid: {
        mobile: "",
        code: ""
      },
      // 输入框绑定的数据。
      form: {
        mobile: "13911111111",
        code: "246810"
      }
    };
  },
  methods: {
    async doLogin() {
      this.valid = {};
      // 1，先做登录校验
      if (this.checkLogin()) {
        this.isLoading = true;
        // 调用登录接口。
        // 这里res拿到的就是响应体。
        try {
          let res = await login({ ...this.form });
          // 如果没报错，就写后面的代码
          console.log(res);
          // 登录成功把token存到vuex中
          this.$store.commit("changeToken", res.data.token);
          this.$store.commit("changeRefToken", res.data.refresh_token);
          // vuex里面的数据一旦页面刷新就会被清空。所以还需要存储到loaclStorage里面。
          setToken("wjtoken", JSON.stringify(res.data));
          // 判断路径：如果是Login就跳到home，如果是checkLogin就back。
          if (this.$route.path == "/login") {
            // 跳转到首页。
            this.$router.push("/home");
          } else {
            // 从哪来回哪里去
            this.$router.back();
          }
        } catch {
          //捕捉错误信息。

          // console.log("手机或验证码错误");
          this.$toast.fail("手机或验证码错误");
        } finally {
          //finally不管成功还是失败都会执行这里面的代码。
          this.isLoading = false;
        }
      }
    },
    // 这个函数是用来做登录格式校验的。如果全部校验成功，就返回true，有一个不成功，就返回false。
    checkLogin() {
      let flag = true;
      // 只要有一个不匹配就把flag的值改成false。
      if (
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
          this.form.mobile
        ) == false
      ) {
        flag = false;
        this.valid.mobile = "手机号格式有误";
      }
      if (!/^\d{6}$/.test(this.form.code)) {
        flag = false;
        this.valid.code = "请输入6位数字验证码";
      }
      return flag;
    },
    // 3，获取验证码按钮点击事件
    getYZM() {}
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #f5f7f9;
  .van-nav-bar {
    background-color: #3e9df8;
    .van-nav-bar__title {
      color: #fff;
    }
  }

  .van-button.code {
    background-color: #ededed;
  }
  .van-button--block {
    width: 90%;
    margin: 30px auto 0;
    border-radius: 5px;
  }
  .pwd {
    display: flex;
    align-items: center;
  }
}
</style>