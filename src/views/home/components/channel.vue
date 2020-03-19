<template>
  <van-popup
    class="channel-wrap"
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="left"
    :style="{ width: '85%',height:'100%' }"
    @closed="isDel = false;"
  >
    <!-- 我的频道 -->
    <div class="my-channel">
      <div class="title">
        <span>我的频道</span>
        <van-button
          @click="isDel=!isDel"
          color="#f85a5a"
          size="mini"
          plain
          round
        >{{isDel?'完成':'编辑'}}</van-button>
      </div>
      <div class="content">
        <template v-for="(item, index) in myList">
          <van-tag :key="index" v-if="item.id!=0" size="large">
            {{item.name}}
            <van-icon @click="del(item,index)" v-if="isDel" class="close" color="red" name="clear" />
          </van-tag>
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
          v-for="(item, index) in otherList"
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
import { channelAll, channelSave, channelDel } from "@/api/channel.js";
import { setToken } from "@/utils/token.js";
export default {
  name: "channel",
  props: {
    // myList这个值是父组件传进来的
    // 因为传递的是数组，也就是换句话说传递的是地址
    // 他们最终指向的都是同一块空间。
    // 就意味着，我在子组件里加一个元素，那么父组件里的那个数组也会多一个元素。
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
      // 是否编辑
      isDel: false
    };
  },
  async created() {
    let res = await channelAll();
    // console.log("所有频道", res);
    this.allChannels = res.data.channels;
  },
  methods: {
    addChannel(item) {
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "pullLoading", false);
      this.$set(item, "list", []);
      // item.pullLoading = false;
      // 因为它不用在界面显示，可以直接添加属性。
      item.pre_time = Date.now();
      // 把被点击的频道加到我的频道里面。
      this.myList.push(item);
      // 删除filters里面添加上去的元素
      // for (var i = 0; i < this.otherList.length; i++) {
      //   if (this.otherList[i].id == item.id) {
      //     // 删除匹配到的第i个元素。
      //     this.otherList.splice(i, 1);
      //   }
      // }
      if (this.$store.state.token) {
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
      } else {
        // 没有登录将频道信息存入到本地存储。
        setToken("channels", JSON.stringify(this.myList));
      }
    },
    // 删除图标的点击事件
    del(item, index) {
      // for (var i = 0; i < this.myList.length; i++) {
      //   if (this.myList[i] == item) {
      //     this.myList.splice(i, 1);
      //   }
      // }
      this.myList.splice(index, 1);

      if (this.$store.state.token) {
        //登陆了
        // 调用删除频道接口
        channelDel({
          channels: [item.id]
        });
      } else {
        // 用户未登录
        setToken("channels", JSON.stringify(this.myList));
      }
      // 根据最新的数据来生成这个数组
      // let channels = this.myList.slice(1).map((item, index) => {
      //   return {
      //     id: item.id,
      //     seq: index + 1
      //   };
      // });
      // console.log(channels);

      // channelSave({ channels });
    }
  },
  computed: {
    // 过滤掉我的频道外的所有频道
    otherList() {
      return this.allChannels.filter(item => {
        return !this.myList
          .map(it => {
            return it.id;
          })
          .includes(item.id);
      });
    }
  }
};
</script>

<style lang="less">
.channel-wrap {
  padding: 0 10px;
  .my-channel {
    margin-top: 60px;
    .content {
      .close {
        position: absolute;
        top: -7px;
        right: -9px;
      }
    }
  }
  .van-tag--large {
    font-size: 16px;
    margin-right: 10px;
    margin-top: 10px;
    position: relative;
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