<template>
  <van-popup class="more-wrap" v-model="show">
    <van-cell-group v-if="isFirst">
      <!-- 用group包起来，为了说明这是一组cell -->
      <van-cell icon="failure" title="不感兴趣" @click="disLike" />
      <van-cell @click="isFirst=false" is-link icon="info-o" title="反馈垃圾内容" />
      <van-cell @click="blackAuthor" icon="delete" title="拉黑作者" />
    </van-cell-group>

    <!-- 举报举办 -->
    <van-cell-group v-else>
      <van-cell @click="isFirst=true" icon="arrow-left"></van-cell>
      <van-cell
        @click="feedback(item.type)"
        v-for="(item, index) in reportList"
        :key="index"
        :title="item.title"
      ></van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
import { articleDislike, articleReport, authorBlack } from "@/api/article.js";
export default {
  name: "more",
  data() {
    return {
      show: false,
      // 文章id
      art_id: "",
      // 作者id
      aut_id: "",
      // 文章数组
      art_list: [],
      reportList: [
        { type: 1, title: "标题夸张" },
        { type: 2, title: "低俗色情" },
        { type: 3, title: "错别字多" },
        { type: 4, title: "旧闻重复" },
        { type: 5, title: "广告软文" },
        { type: 6, title: "内容不实" },
        { type: 7, title: "涉嫌违法犯罪" },
        { type: 8, title: "侵权" },
        { type: 0, title: "其他问题" }
      ],
      // 标记是否为第一个阶段
      isFirst: true
    };
  },
  methods: {
    async disLike() {
      // 发请求给服务器删除数据
      for (var i = 0; i < this.art_list.length; i++) {
        if (this.art_id == this.art_list[i].art_id) {
          this.art_list.splice(i, 1);
          break; //因为找到了就没必要继续循环了，直接跳出循环。
        }
      }
      //   console.log(this.art_id.toString());

      let res = await articleDislike({
        //   文章art_id为大数字，调用toString方法转化为字符串，就不会丢失精度
        target: this.art_id.toString()
      });
      console.log(res);

      //   弹出提示
      this.$toast("删除成功!");
      this.show = false;
    },
    // 举报点击事件
    async feedback(item) {
      // 删除数组中的文章，界面上就看不到了。
      for (var i = 0; i < this.art_list.length; i++) {
        if (this.art_id == this.art_list[i].art_id) {
          this.art_list.splice(i, 1);
          break;
        }
      }

      try {
        let res = await articleReport({
          target: this.art_id.toString(),
          type: item,
          remark: "其他说明"
        });
        // console.log(res);
        this.$toast("举报成功");
      } catch {
        this.$toast("您已举报过该文章");
      } finally {
        this.show = false;
        this.isFirst = true;
      }
    },
    async blackAuthor() {
      // 删除数组中的文章，界面上就看不到了。
      for (var i = 0; i < this.art_list.length; i++) {
        if (this.art_id == this.art_list[i].art_id) {
          this.art_list.splice(i, 1);
          break;
        }
      }

      let res = await authorBlack({
        target: this.aut_id.toString()
      });
      console.log(res);
      this.$toast("拉黑作者成功");
      this.show = false;
    }
  }
};
</script>

<style lang="less">
.more-wrap {
  width: 80%;
  border-radius: 5px;
}
</style>