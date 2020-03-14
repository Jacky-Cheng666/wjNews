<template>
  <van-popup
    class="channel-wrap"
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="left"
    :style="{ width: '85%',height:'100%' }"
  >
    <!-- 我的频道 -->
    <div class="my-channel">
      <div class="title">
        <span>我的频道</span>
        <van-button color="#f85a5a" size="mini" plain round>编辑</van-button>
      </div>
      <div class="content">
        <template v-for="(item, index) in myList">
          <van-tag :key="index" v-if="item.id!=0" size="large">{{item.name}}</van-tag>
        </template>
      </div>
    </div>
    <!-- 频道推荐 -->
    <div class="recommend-box">
      <div class="title">
        <span>频道推荐</span>
      </div>
      <div class="content">
        <van-tag size="large" v-for="(item, index) in 10" :key="index">
          <van-icon name="plus" />
          标签{{item}}
        </van-tag>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "channel",
  props: {
    myList: {
      type: Array,
      //   如果不传，默认值就是空数组
      default: []
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="less">
.channel-wrap {
  padding: 0 10px;
  .my-channel {
    margin-top: 60px;
  }
  .van-tag--large {
    font-size: 16px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .recommend-box {
    margin-top: 40px;
  }
}
</style>