<template>
  <van-list
    class="comment"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <template slot="title">
        <div class="title">
          <!-- 头像 -->
          <img class="avatar" :src="item.aut_photo" alt />
          <!-- 详细信息 -->
          <div class="info">
            <div class="name">{{item.aut_name}}</div>
            <div class="content">{{item.content}}</div>
            <div class="bottom">
              <span class="time">{{item.pubdate | formatTime}}</span>
              <van-tag
                @click="showReply(item)"
                size="large"
                class="reply"
                color="#eff7f8"
                round
              >回复{{item.reply_count}}</van-tag>
            </div>
          </div>
          <!-- 点赞图标 -->
          <div class="zan">
            <van-icon
              @click="commZan(item)"
              class="zan-icon"
              :class="{color:item.is_liking}"
              name="like"
            ></van-icon>
            <span>{{item.like_count}}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
import { commentList, commentLike, commentDisLike } from "@/api/comment.js";
// 导入bus
import bus from "@/utils/bus.js";
export default {
  name: "comment",
  data() {
    return {
      loading: false,
      finished: false,
      last_id: undefined,
      // 存储cell数据。
      list: []
    };
  },
  methods: {
    async onLoad() {
      // console.log(this.$route.params.art_id);
      let res = await commentList({
        type: "a",
        // source: 文章id。这时候要拿文章ID，可以有什么方法拿到。
        source: this.$route.params.art_id, //这里的子组件仍然在父组件下面，可以通过this.$route.params.art_id方便拿到文章id。
        offset: this.last_id,
        // limit:页容量。
        limit: 10
      });
      // console.log(res);
      // 拿到数据后保存起来。
      this.list.push(...res.data.results);
      // 把下一页的last_id保存起来。
      this.last_id = res.data.last_id;
      // 判断是否结束
      if (res.data.end_id == res.data.last_id) {
        this.finished = true;
      } else {
        // 还有数据，就继续加载。
        this.loading = false;
      }
    },
    // 对评论点赞
    async commZan(item) {
      if (this.$checkLogin()) {
        // 1，点赞
        if (!item.is_liking) {
          let res = await commentLike({
            target: item.com_id.toString()
          });
          // console.log(res);
          item.is_liking = true;
          // 让点赞数+1
          item.like_count++;
        } else {
          // 2，取消点赞
          // console.log(item.com_id);

          let res = await commentDisLike({
            target: item.com_id.toString()
          });
          // console.log(res);
          item.is_liking = false;
          // 让点赞数-1
          item.like_count--;
        }
      }
    },
    // 弹出回复内容框
    showReply(item) {
      // 通过事件巴士把true值传递给兄弟组件reply。
      bus.$emit("reply", item);
    }
  },
  created() {
    // 一般写在created里面，因为越早越好。
    // 代表我这个组件一旦创建，就需要订阅这个数据。
    bus.$on("newCommt", data => {
      // console.log("我在comment里面", data);
      // 加到评论列表里面
      // 加到第一条。
      this.list.unshift(data);
    });
  }
};
</script>

<style lang="less" scoped>
.comment {
  .title {
    display: flex;
    .info {
      flex: 1;
      .name {
        color: #708ab6;
        margin-bottom: 10px;
      }
      .content {
        margin-bottom: 10px;
      }
      .bottom {
        .time {
          margin-right: 20px;
        }
        .reply {
          color: #000;
          padding: 5px 15px;
        }
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .zan {
      display: flex;
      align-items: center;
      .zan-icon {
        font-size: 25px;
        margin-right: 5px;
      }
      .color {
        color: red;
      }
    }
  }
}
</style>