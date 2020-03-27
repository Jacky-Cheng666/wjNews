<template>
  <div class="robot">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" />
    <!-- 聊天面板 -->
    <div class="chat-wrap" ref="chatWrap">
      <div v-for="(item, index) in list" :key="index" class="chat-item" :class="{user:item.isMe}">
        <img
          class="icon"
          :src="item.isMe?$route.params.icon:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3057474121,2324025370&fm=111&gp=0.jpg'"
          alt
        />
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- 底部发送消息输入框 -->
    <van-search
      class="my-write"
      left-icon
      v-model="msg"
      show-action
      shape="round"
      action-text="发送"
      background="#d43d3d"
      placeholder="请输入..."
      @search="send"
      @cancel="send"
    ></van-search>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "robot",
  data() {
    return {
      msg: "",
      list: [
        { isMe: false, content: "我是小智机器人，对我说点儿什么吧" }
        // { isMe: false, content: "你好，我是小智机器人" },
        // { isMe: false, content: "请问，有什么可以帮助您的" }
      ],
      socket: ""
    };
  },
  methods: {
    send() {
      if (this.msg.length == 0) {
        this.$toast("发送内容不能为空");
        return;
      }
      this.socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now()
      });
      this.list.push({
        isMe: true,
        content: this.msg
      });
      this.$nextTick(() => {
        this.$refs.chatWrap.scrollTop = this.$refs.chatWrap.scrollHeight;
      });
      this.msg = "";
    }
  },
  created() {
    // console.log(this.$route.params.icon);
    this.socket = io(
      `http://ttapi.research.itcast.cn?token=${this.$store.state.token}`
    );
    //订阅服务器发来的消息
    this.socket.on("message", data => {
      console.log(data);
      this.list.push({
        isMe: false,
        content: data.msg
      });
      this.$nextTick(() => {
        //   等页面渲染完成才执行下面的代码。
        this.$refs.chatWrap.scrollTop = this.$refs.chatWrap.scrollHeight;
      });
    });
  }
};
</script>

<style lang="less" scoped>
.robot {
  .van-nav-bar {
    background-color: rgb(212, 61, 61);
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .chat-wrap {
    // padding-top: 20px;
    overflow: auto;
    // 滚动条还要有一个固定高度
    position: fixed;
    width: 100%;
    top: 76px;
    bottom: 54px;
    .chat-item {
      display: flex;
      margin-bottom: 20px;
      .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .content {
        background-color: #e0effb;
        border: 1px solid #c2d9ea;
        padding: 0 10px;
        // 设置最大宽度
        max-width: 48%;
        text-align: left;
        line-height: 35px;
        border-radius: 5px;
      }
    }
    .user {
      flex-direction: row-reverse;
      .icon {
        margin-left: 10px;
      }
      .content {
        background-color: greenyellow;
      }
    }
  }
  .my-write {
    position: fixed;
    width: 100%;
    bottom: 0px;
    left: 0;
    .van-search__action {
      color: #fff;
    }
  }
}
</style>