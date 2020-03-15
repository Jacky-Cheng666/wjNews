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
        <van-tag
          @click="addChannel(item)"
          size="large"
          v-for="(item, index) in filters"
          :key="index"
        >
          <van-icon name="plus" />
          {{item.name}}
        </van-tag>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { channelAll, channelSave } from "@/api/channel.js";
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
      show: false,
      allChannels: [],
      // 过滤后的数组，频道推荐数组。
      filters: []
    };
  },
  async created() {
    let res = await channelAll();
    // console.log("所有频道", res);
    this.allChannels = res.data.channels;
    this.filters = this.allChannels.filter(item => {
      return !this.myList
        .map(it => {
          return it.id;
        })
        .includes(item.id);
    });
    // console.log(this.filters);
  },
  methods: {
    addChannel(item) {
      // console.log(item);
      // 把被点击的频道加到我的频道里面。
      this.myList.push(item);
      // 删除filters里面添加上去的元素
      for (var i = 0; i < this.filters.length; i++) {
        if (this.filters[i].id == item.id) {
          // 删除匹配到的第i个元素。
          this.filters.splice(i, 1);
        }
      }

      // 先准备调用接口需要的数据
      // 我们要调用slice方法，从下标1开始截取数组。然后再提取。
      // 例如：我的频道现在有，推荐，c++,前端,java，提取的时候不应该包含推荐。
      let channels = this.myList.slice(1).map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        };
      });
      console.log(channels);

      // 调用接口发请求去保存
      channelSave({ channels });
    }
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