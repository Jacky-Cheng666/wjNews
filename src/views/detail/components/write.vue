<template>
  <div class="write">
    <!-- 输入框 -->
    <van-search
      @keydown.enter="add"
      class="input"
      left-icon
      v-model="msg"
      shape="round"
      placeholder="写评论"
    />
    <!-- 评论图标 -->
    <van-icon @click="add" name="comment-o" />
    <!-- 收藏图标 -->
    <van-icon @click="artUnCollect" v-if="selfCollect" name="star" />
    <van-icon @click="artCollect" v-else name="star-o" />
    <!-- 分享图标 -->
    <van-icon name="share" />
  </div>
</template>

<script>
import { commentAdd } from "@/api/comment.js";
import bus from "@/utils/bus.js";
import { artCollect, artUnCollect } from "@/api/article.js";
export default {
  props: ["is_collected"],
  data() {
    return {
      msg: "",
      // 只会在创建的时候赋值一次，如果后面is_collected值发生改变了。selfCollect的值不会再改变了。
      selfCollect: this.is_collected
    };
  },
  watch: {
    // 侦听父组件传递过来的值。
    is_collected(val) {
      this.selfCollect = val;
    }
  },
  methods: {
    // 添加评论
    async add() {
      if (this.$checkLogin()) {
        // 如果内容不为空才发请求。
        if (this.msg.trim() != "") {
          let res = await commentAdd({
            // 文章的id
            target: this.$route.params.art_id,
            content: this.msg
          });
          // console.log(res);
          // bus.$emit
          // 通过event_bus把new_obj对象传送给订阅的对象。
          bus.$emit("newCommt", res.data.new_obj);
          this.msg = "";
        } else {
          this.$toast("说点儿什么吧");
        }
      }
    },
    // 收藏文章点击事件。
    async artCollect() {
      let res = await artCollect({
        target: this.$route.params.art_id
      });
      // console.log(res);
      // 每次都要刷新才能看到效果。
      this.selfCollect = true;
    },
    // 取消收藏文章点击事件。
    async artUnCollect() {
      let res = await artUnCollect({
        art_id: this.$route.params.art_id
      });
      // console.log(res);
      this.selfCollect = false;
    }
  }
};
</script>

<style lang="less">
.write {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  .input {
    flex: 1;
  }
  .van-icon {
    margin-right: 20px;
    font-size: 20px;
  }
}
</style>