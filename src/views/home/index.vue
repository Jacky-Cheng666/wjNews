<template>
  <div class="home">
    <!--1， 搜索模块 -->
    <div class="search">
      <van-icon @click="$refs.channel.show=true" class="icon" name="wap-nav" />
      <van-search
        @focus="searchNews"
        class="searchBar"
        shape="round"
        background="#d43d3d"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="icon" name="search" />
    </div>
    <!-- 2，频道模块 -->
    <van-tabs class="my-tabs" v-model="active">
      <van-tab :name="item.id" v-for="(item, index) in channels" :key="index" :title="item.name">
        <!-- 列表模块开始 -->
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh(item)">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad(item)"
          >
            <!-- 每一行就是一个cell。 -->
            <van-cell v-for="(it,idx) in item.list" :key="idx">
              <!-- 自定义title内容 -->
              <template slot="title">
                <!-- 标题div -->
                <div @click="$router.push(`/detail/${it.art_id}`)" class="title">
                  <span class="word">{{it.title}}</span>
                  <img
                    style="width:116px;height:73px"
                    v-if="it.cover.type==1"
                    :src="it.cover.images[0]"
                    alt
                  />
                </div>
                <!-- 图片div -->
                <van-grid v-if="it.cover.type==3" :gutter="0" :border="false" :column-num="3">
                  <van-grid-item v-for="(item, index) in it.cover.images" :key="index">
                    <van-image style="height:73px" :src="item" />
                  </van-grid-item>
                </van-grid>
                <!-- 作者，评论div -->
                <div class="info">
                  <div>
                    <span class="info-span">{{it.aut_name}}</span>
                    <span class="info-span">{{it.comm_count}}评论</span>
                    <span class="info-span">{{it.pubdate|formatTime}}</span>
                  </div>
                  <van-icon @click="showMore(it,item.list)" class="info-more" name="cross" />
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
        <!-- 列表模块结束 -->
      </van-tab>
    </van-tabs>
    <!-- 3，弹出层模块 -->
    <channel :myList="channels" ref="channel"></channel>
    <!-- 这里的v-model是控制弹出层的现实和隐藏。 -->
    <!-- 4，更多模块 -->
    <more ref="more"></more>
  </div>
</template>

<script>
import { getToken } from "@/utils/token.js";
import { channelList } from "@/api/channel.js";
import { articleList } from "@/api/article.js";
import channel from "./components/channel";
import dayjs from "dayjs";
import more from "./components/more";
export default {
  name: "home",
  components: { channel, more },
  data() {
    return {
      channels: [],
      active: "",
      // loading:控制列表List的刷新状态，为false会调用onLoad方法，为true不调用。
      // loading: false,
      // finished：是否已经到底，为false已经到底部，为true继续显示加载中。
      // finished: false,
      // list: [],
      // 下拉刷新，用来控制下拉刷新的状态。
      // pullLoading: false,
      // 频道列表数组
      channels: []
    };
  },
  methods: {
    async onLoad(item) {
      // loading为false，并且finished为false就会触发。上拉加载会调用这个事件去加载数据。当这个事件被调用会自动把loading自动改为true。记得手动把Loading改为false。
      // 加载数据的方法。onload方法被调用时，会自动把v-model绑定的loading改为true。
      // console.log("我被调用了，可以加载数据了");
      let res = await articleList({
        channel_id: item.id,
        // 要记录上一次请求返回的时间戳。
        // 这里不能写Date.now()的原因：写了后会永远加载不完，因为它每次加载都是随机加载，如果我们希望往上一拉就出上一页数据，再拉又出上一页数据，就需要传入上一页的时间戳。
        // 第一次加载数据时候，就是需要Date.now()找最新随机10条新闻。只是后面每次上拉要用上一页时间戳。
        timestamp: item.pre_time,
        with_top: 0
      });
      // console.log(res);
      let arr = res.data.results;
      // 如果数据加载完了，就停止刷新数据。
      if (arr.length == 0) {
        // 如果是真的想说数据加载完了，需要设置finished为true。而不是Loading=true。此时会停止调用onload方法。
        item.finished = true;
      } else {
        // 记录下一页的时间戳(不用在界面显示)
        item.pre_time = res.data.pre_timestamp;
        // 要当前是哪个频道，就把哪个频道的数据传进来。
        item.list.push(...arr);
        //如果真的去加载一段数据，然后再把loading改为false，滚到最后，一定会调用onLoad。因为loading属性是控制加载状态的， 为false就会再调用onLoad方法，为true就不调用了。
        item.loading = false;
        // 需求：如果数据超过100个了，就不加载了。就显示没有更多数据了。
        // if (item.list.length >= 100) {
        //   // 如果是真的想说数据加载完了，需要设置finished为true。而不是Loading=true。此时会停止调用onload方法。
        //   item.finished = true;
        // }
      }
    },
    // 只要下拉刷新就会触发该事件。一旦触发这个事件，会把下拉状态pullLoading改为true。
    async onRefresh(item) {
      // 用这个方法可以去请求新的数据，请求到数据后，记得把pullLoading状态改为false。
      // 每次上拉，去请求最新的随机数据。就意味着，我们要把这个频道记录的上一页的时间戳清空为Date.now()。
      item.pre_time = Date.now();
      // 把loading状态改为false。(这才代表可以重新加载一些新数据)
      item.loading = false;
      // 把finished改为false，因为有可能你下拉的时候，已经把数据加载完了，此时finished已经变成true了。把list重置为空数组
      item.finished = false;
      let res = await articleList({
        channel_id: item.id,
        // 要记录上一次请求返回的时间戳。
        // 这里不能写Date.now()的原因：写了后会永远加载不完，因为它每次加载都是随机加载，如果我们希望往上一拉就出上一页数据，再拉又出上一页数据，就需要传入上一页的时间戳。
        // 第一次加载数据时候，就是需要Date.now()找最新随机10条新闻。只是后面每次上拉要用上一页时间戳。
        timestamp: item.pre_time,
        with_top: 0
      });
      item.list = res.data.results;
      // 结束下拉状态(发完请求后就能把加载中。。。文字去掉)
      item.pullLoading = false;
    },
    // 显示更多方法
    showMore(item, list) {
      // item：当前被点击的文章。list文章数组
      // console.log(item);
      this.$refs.more.aut_id = item.aut_id;
      this.$refs.more.show = true;
      this.$refs.more.art_id = item.art_id;
      // 引用类型赋值，注意传递的是地址。
      this.$refs.more.art_list = list;
    },
    // 搜索框获得焦点
    searchNews() {
      this.$router.push("/search");
    }
  },
  async created() {
    if (this.$store.state.token) {
      // 1，获取频道列表方法
      let res = await channelList();
      // console.log(res);
      this.channels = res.data.channels;
      // 拿到频道数据后，我就直接给频道数组里面每个元素都添加那4个属性即可。
      this.channels.forEach(item => {
        // 注意：如果直接用赋值，界面不会跟着响应。所以我们要用$set。
        // item.loading = false;
        // item.finished = false;
        // item.pullLoading = false;
        // item.list = [];
        this.$set(item, "loading", false);
        this.$set(item, "finished", false);
        this.$set(item, "pullLoading", false);
        this.$set(item, "list", []);
        // item.pullLoading = false;
        // 因为它不用在界面显示，可以直接添加属性。
        item.pre_time = Date.now();
      });
    } else {
      let res = getToken("channels");
      // 如果有值，就把channels赋值为本地存储的频道。如果没有值就发请求获取服务器推荐的默认频道
      if (res) {
        this.channels = res;
      } else {
        res = await channelList();
        this.channels = res.data.channels;
        this.channels.forEach(item => {
          this.$set(item, "loading", false);
          this.$set(item, "finished", false);
          this.$set(item, "pullLoading", false);
          this.$set(item, "list", []);
          item.pre_time = Date.now();
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 98px;
  // margin-top: 98px;
  margin-bottom: 50px;
  .search {
    // opacity: 0;
    display: flex;
    align-items: center;
    background-color: #d43d3d;
    padding: 0 10px;
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 999;
    // 设置模型为内减模型。
    box-sizing: border-box;
    .icon {
      font-size: 25px;
      color: #fff;
    }
    .searchBar {
      flex: 1;
    }
  }
  .my-tabs {
    // padding-top: 98px;
    /deep/.van-tabs__wrap {
      position: fixed;
      z-index: 999;
      top: 54px;
      width: 100%;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .info-span {
        margin-right: 10px;
        font-size: 12px;
        color: #ccc;
      }
      .info-more {
        border: 1px solid #ccc;
        color: #ccc;
        width: 25px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      .word {
        font-size: 18px;
      }
    }
  }
}
</style>