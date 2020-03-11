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
    <van-tabs v-model="active" class="my-tabs">
      <van-tab :title="'标签'+item" v-for="(item, index) in 5" :key="index">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      active: "",
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ],
      // loading:表示加载状态。如果为false，代表还需要加载数据。所以会调用onload()方法。true代表不需要加载，则不会调用onload方法。
      loading: false,
      // finished：数据是否已记载完毕。
      finished: false
    };
  },
  methods: {
    onSearch() {},
    onLoad() {
      // 加载数据的方法。onLoad方法被调用时。会自动把v-model绑定的loading值改为true.
      console.log("我被调用了,可以加在数据了");
    }
  }
};
</script>

<style lang="less">
.home {
  padding-top: 98px;
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
    .van-tabs__wrap {
      position: fixed;
      z-index: 999;
      top: 54px;
      width: 100%;
    }
  }
}
</style>