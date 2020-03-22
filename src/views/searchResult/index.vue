<template>
  <div class="searchResult">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="onClickLeft" />
    <!-- 列表部分 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="my-cell" v-for="(item,index) in list" :key="index">
        <template slot="title">
          <!-- 标题模块 -->
          <div @click="$router.push(`/detail/${item.art_id}`)" class="title">
            <span class="two">{{item.title}}</span>
            <img
              style="width:116px;height:73px"
              v-if="item.cover.type==1"
              :src="item.cover.images[0]"
              alt
            />
          </div>
          <!-- 宫格模块 -->
          <van-grid v-if="item.cover.type==3" :border="false" :column-num="3">
            <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
              <van-image class="content-img" :src="item" />
            </van-grid-item>
          </van-grid>
          <!-- 作者模块 -->
          <div class="info">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate | formatTime}}</span>
          </div>
          <!-- 操作模块 -->
          <div class="toolBar">
            <van-row>
              <van-col @click="doComment" span="8">
                <van-icon name="comment-o" />
                <span>{{item.comm_count}}</span>
              </van-col>
              <van-col @click="doZan" span="8">
                <van-icon name="like-o" />
                <span>点赞</span>
              </van-col>
              <van-col span="8">
                <van-icon name="share" />
                <span>分享</span>
              </van-col>
            </van-row>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search.js";
export default {
  name: "searchResult",
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    // 检查用户是否登录函数，返回false(没登录)或者true(已登录)。

    onClickLeft() {
      this.$router.back();
    },
    async onLoad() {
      // 发请求获取数据
      let res = await getSearch({
        page: this.page,
        per_page: this.pageSize,
        q: this.$route.params.key
      });
      // 这一页数据加载完了，下一次需要加载下一页数据。
      this.page++;
      console.log(res);

      // 2，既然有分页就应该判断的是页码有没有到最后一页。
      // 如果到了最后一页，就应该标记为没有更多了。
      if (this.page > Math.ceil(res.data.total_count / this.pageSize)) {
        this.finished = true;
      } else {
        let arr = res.data.results;
        this.list.push(...arr);
        // this.list = res.data.results;
        // 将Loading改为false，代表可以继续加载。
        this.loading = false;
      }
    },
    // 点赞的点击事件
    doZan() {
      // 判断有没有登录
      if (this.$checkLogin()) {
        this.$toast.success("点赞成功");
      }
    },
    doComment() {
      // console.log(this.$store.state.token);
      if (this.$checkLogin()) {
        this.$toast("评论成功");
      }
    }
  }
};
</script>

<style lang="less">
.searchResult {
  .van-nav-bar {
    background-color: rgb(212, 61, 61);
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .my-cell {
    margin-bottom: 20px;
    padding-bottom: 0;
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .content-img {
    height: 73px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .word {
      font-size: 18px;
    }
  }
  .info {
    span {
      margin-right: 5px;
      font-size: 12px;
      color: #999;
    }
  }
  .toolBar {
    height: 45px;
    .van-row {
      height: 100%;
      .van-col {
        height: 100%;
        border-right: 0.5px solid #ececec;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        span {
          margin-left: 4px;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>