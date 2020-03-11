<template>
  <div class="home">
    <!-- 搜索模块 -->
    <van-search
      v-model="value"
      shape="round"
      background="#3194ff"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      class="searchBar"
    >
      <div slot="action" @click="onSearch">
        <van-icon class="rSearch" name="search" />
      </div>
      <van-icon slot="left" name="wap-nav" />
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style lang="less">
.home {
  .van-icon {
    color: #fff;
    font-size: 20px;
  }
  .van-icon-search {
    color: #323233;
  }
  .rSearch {
    color: #fff;
    margin-left: 10px;
  }
  .van-search__action {
    line-height: 14px;
  }
  .van-search__content--round {
    margin-left: 15px;
  }
}
</style>