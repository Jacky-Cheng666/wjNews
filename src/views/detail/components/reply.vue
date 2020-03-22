<template>
  <div class="reply">
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <span class="count">0条回复</span>
      <!-- list模块 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
                </div>
              </div>
              <!-- 点赞图标 -->
              <div class="zan">
                <van-icon
                  @click="replyZan(item)"
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
      <!-- 输入框 -->
      <write ref="write"></write>
    </van-popup>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
import { commentList } from "@/api/comment.js";
import write from "./write";
export default {
  name: "reply",
  components: {
    write
  },
  data() {
    return {
      show: false,
      commentObj: {},
      loading: false,
      finished: false,
      list: [],
      last_id: undefined
    };
  },
  async created() {
    // 一般写在created里面，因为越早越好。
    // 代表我这个组件一旦创建，就需要订阅这个数据。
    bus.$on("reply", async data => {
      // console.log("我在comment里面", data);
      // 加到评论列表里面
      // 加到第一条。
      this.show = true;
      // 把被点击的那一行数据点击保存起来。
      this.commentObj = data;
    });
  },
  methods: {
    replyZan() {},
    async onLoad() {
      let res = await commentList({
        type: "c",
        // 评论id，因为这个id是对象，所以调用toString。
        // 如果你的请求不是get请求，那么可以不用toString方法。因为它内部传值时会自己调用toString方法。如果是get请求，但是参数是路径参数，那么也可以不用toString方法，它内部会帮你toString。否则需要手动调用toString方法转字符串。
        source: this.commentObj.com_id.toString(),
        offset: this.last_id,
        limit: 10
      });
      console.log(res);
      this.list.push(...res.data.results);
      // 记录下一次开始的id。
      this.last_id = res.data.last_id;
      if (res.data.end_id == res.data.last_id) {
        this.finished = true;
      } else {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less">
.reply {
  margin-bottom: 54px;
  .count {
    margin-top: 10px;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
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