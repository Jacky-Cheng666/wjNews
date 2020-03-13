<template>
  <div class="home">
    <!--1， 搜索模块 -->
    <div class="search">
      <van-icon class="icon" name="wap-nav" />
      <van-search
        class="searchBar"
        v-model="value"
        shape="round"
        background="#d43d3d"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="icon" name="search" />
    </div>
    <!-- 2，频道模块 -->
    <van-tabs v-model="active" class="my-tabs" @click="onClick">
      <van-tab :title="item.name" :name="item.id" v-for="(item, index) in channels" :key="index">
        <!-- 下拉刷新模块 -->
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad(item)"
          >
            <van-cell
              :label="item.aut_name"
              value="内容"
              v-for="(item,index) in item.list"
              :key="index"
              :title="item.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channelList } from "@/api/channel.js";
import { articleList } from "@/api/article.js";
export default {
  name: "home",
  data() {
    return {
      channels: [],
      value: "",
      active: 0
    };
  },
  methods: {
    // 1，切换tab栏点击事件
    onClick() {},
    // 2，获取文章列表方法
    getArticlist() {},
    onSearch() {},
    // 这里的item指的是每个频道
    async onLoad(item) {
      let res = await articleList({
        // 频道id
        channel_id: item.id,
        // 时间戳。如果用Date.now()永远都是加载随机数据。
        // 要记录上一次请求返回的pre_timestamp时间戳。
        timestamp: item.pre_time,
        // 是否置顶
        with_top: 0
      });
      console.log(res);
      let arr = res.data.results;
      // 记录下一页时间戳(要不要在界面显示?不要，只是发请求，所以可以直接给对象加属性)
      item.pre_time = res.data.pre_timestamp;
      // 当前是哪个频道，就把哪个频道的数据传进来。修改这个频道里面的List和loading。
      item.list.push(...arr);
      item.loading = false;
      if (item.list.length >= 50) {
        // 如果真的想说加载完了，应该设置finished为true而不是loading。
        item.finished = true;
      }
    },
    // 只要往下拽，就会触发该事件。一旦触发该事件，会把下拉状态pullLoading状态改为true。
    onRefresh() {
      // 去请求数据，请求到数据后，记得把pullLoading状态改为false。
      // console.log("我被调用了");
      // setTimeout(() => {
      //   this.pullLoading = false;
      // }, 1000);
    }
  },
  async created() {
    // 1，获取频道数据
    let res = await channelList();
    // console.log(res);
    this.channels = res.data.channels;
    // 拿到频道数据后，我就直接给频道数据里每个元素都添加那四个属性即可。
    this.channels.forEach(item => {
      // 需要给每个元素加那4个属性。
      // loading:表示加载状态。如果为false，代表还需要加载数据。所以会调用onload()方法。true代表不需要加载，则不会调用onload方法。
      this.$set(item, "loading", false);
      // finished：数据是否已记载完毕。
      this.$set(item, "finished", false);
      // pullLoading用来控制下拉刷新的状态。为false代表停止刷新。为true代表正在刷新中。
      this.$set(item, "pullLoading", false);
      // list文章列表
      this.$set(item, "list", []);
      // 因为它不用在界面显示，所以可以直接添加属性。
      item.pre_time = Date.now();
    });
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
      //问题： 如果在这个组件的style样式里面加了scoped的话，van-tabs__wrap这个盒子的固定定位会失效。因为home组件相当于父组件，而van-tabs__wrap这个盒子不在子组件的最外层，所以如果home组件加了固定定位的话，子组件van-tabs__wrap这个标签应用不到父组件的样式，因为它不是最外层标签。用/deep/语法既可以满足使用scoped又可以让样式下沉到子组件。
      position: fixed;
      z-index: 999;
      top: 54px;
      width: 100%;
    }
  }
}
</style>