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
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in 6" :key="index" :title="'标签'+item">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      value: "",
      active: "",
      loading: false,
      finished: false,
      list: []
    };
  },
  methods: {
    onLoad() {
      // 加载数据的方法。onload方法被调用时，会自动把v-model绑定的loading改为true。
      console.log("我被调用了，可以加载数据了");
      let arr = [
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
      ];
      this.list.push(...arr);
      //如果真的去加载一段数据，然后再把loading改为false，滚到最后，一定会调用onLoad。因为loading属性是控制加载状态的， 为false就会再调用onLoad方法，为true就不调用了。
      this.loading = false;
      // 需求：如果数据超过100个了，就不加载了。就显示没有更多数据了。
      if (this.list.length >= 100) {
        // 如果是真的想说数据加载完了，需要设置finished为true。而不是Loading=true。
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less">
.home {
  padding-top: 54px;
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
  }
}
</style>