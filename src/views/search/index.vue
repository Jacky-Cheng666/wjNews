<template>
  <div class="search-wrap">
    <!-- 1，搜索栏 -->
    <van-search
      @keydown.enter="toSearchResult(value)"
      @input="onInput"
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      background="#d43d3d"
      @cancel="onCancel"
    />
    <!-- 2，历史记录区域 -->
    <div v-if="isHistory" class="history">
      <div class="title">
        <span>历史记录</span>
        <van-icon @click="clearHistory" class="icon-del" name="delete" />
      </div>
      <div class="history-content">
        <van-row>
          <van-col
            @click="$router.push(`/searchResult/${item}`)"
            v-for="(item, index) in historyList"
            :key="index"
            class="history-item"
            span="12"
          >
            {{item}}
            <van-icon @click.stop="del(item)" class="closeHis" name="close" />
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 3，联想模块 -->
    <van-cell-group v-else>
      <van-cell
        @click="toSearchResult(item.oldItem)"
        v-for="(item, index) in list"
        :key="index"
        icon="search"
      >
        <template slot="title">
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggest } from "@/api/search.js";
import { debounce } from "@/utils/debounce.js";
import { setToken, removeToken, getToken } from "@/utils/token.js";
export default {
  name: "search",
  data() {
    return {
      value: "",
      isHistory: true,
      list: [],
      // 定时器变量
      // timeId: null,
      callback: "",
      // 保存搜索记录的数组
      historyList: getToken("history") || []
    };
  },
  methods: {
    // 单独删除某个历史记录
    del(item) {
      // 删除数组中的元素
      for (var i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i] == item) {
          this.historyList.splice(i, 1);
          break;
        }
      }
      setToken("history", JSON.stringify(this.historyList));
    },
    // 清除历史记录
    clearHistory() {
      removeToken("history");
      this.historyList = [];
    },
    // 跳转搜索结果页面方法
    toSearchResult(key) {
      // 把这次搜索的关键字存到数组里
      this.historyList.unshift(key);
      // [...new Set(this.historyList)] ：利用es6方法去重数组。
      // 把最新的数组转换为json字符串，再存到本地存储中。
      setToken("history", JSON.stringify([...new Set(this.historyList)]));
      this.$router.push(`/searchResult/${key}`);
    },
    onCancel() {
      // 从哪里来的就返回哪里去用back()方法。
      this.$router.back();
    },
    // 搜索框输入事件。
    onInput() {
      // this.callback = async function() {
      //   this.isHistory = false;
      //   // 如果删除完了，就不往下面发送请求。并将历史记录模块显示出来。
      //   if (this.value == "") {
      //     this.isHistory = true;
      //     this.list = [];
      //     return;
      //   }
      //   //发请求获得联想词汇
      //   let res = await getSuggest({
      //     q: this.value
      //   });
      //   this.list = res.data.options;
      //   //   遍历list这个数组，对每个元素进行高亮处理
      //   //   forEach可以做遍历，但是无法改掉每个元素的值。!!!!!!!!!!!!!!!!。如果想改只能用for循环或者map()方法。
      //   //   this.list.forEach(item => {
      //   // replace()：替换
      //   // item = item.replace(
      //   //   this.value,
      //   //   `<span style='color:red'>${this.value}</span>`
      //   // );
      //   // item = "sss";
      //   //   });
      //   this.list = this.list.map(item => {
      //     //   先统一转成小写，然后再replace替换。
      //     return {
      //       oldItem: item,
      //       newItem: item
      //         .toLowerCase()
      //         .replace(
      //           this.value.toLowerCase(),
      //           `<span style="color:red">${this.value}</span>`
      //         )
      //     };
      //   });
      // };
      // debounce(this.callback, 500);

      clearTimeout(this.timeId);
      this.timeId = setTimeout(async () => {
        // ********防抖代码*************
        // 让联想模块显示出来
        this.isHistory = false;
        // 如果删除完了，就不往下面发送请求。并将历史记录模块显示出来。
        if (this.value == "") {
          this.isHistory = true;
          this.list = [];
          return;
        }
        //发请求获得联想词汇
        let res = await getSuggest({
          q: this.value
        });
        this.list = res.data.options;
        //   遍历list这个数组，对每个元素进行高亮处理
        //   forEach可以做遍历，但是无法改掉每个元素的值。!!!!!!!!!!!!!!!!。如果想改只能用for循环或者map()方法。
        //   this.list.forEach(item => {
        // replace()：替换
        // item = item.replace(
        //   this.value,
        //   `<span style='color:red'>${this.value}</span>`
        // );
        // item = "sss";
        //   });
        this.list = this.list.map(item => {
          //   先统一转成小写，然后再replace替换。
          return {
            oldItem: item,
            newItem: item
              .toLowerCase()
              .replace(
                this.value.toLowerCase(),
                `<span style="color:red">${this.value}</span>`
              )
          };
        });
      }, 500);
    }
  }
};
</script>

<style lang="less">
body {
  background-color: #f5f7f9;
}
.search-wrap {
  background-color: #fff;
  .van-search__action {
    color: #fff;
  }
  .title {
    height: 45px;
    padding: 10px 15px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-del {
      font-size: 24px;
    }
  }
  .history-content {
    .history-item {
      padding-left: 28px;
      padding-right: 28px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 44px;
      text-align: center;
      line-height: 44px;
      border-top: 0.5px solid #e8e8e8;
      position: relative;
      &:nth-child(odd) {
        border-right: 1px solid #e8e8e8;
      }
    }
    .closeHis {
      position: absolute;
      right: 12px;
      top: 13px;
    }
  }
}
</style>