<template>
  <div class="searchResult">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="onClickLeft" />
    <!-- 列表部分 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="my-cell" v-for="(item,index) in list" :key="index">
        <template slot="title">
          <!-- 标题模块 -->
          <div class="title">{{item.title}}</div>
          <!-- 宫格模块 -->
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(item, index) in 3" :key="index">
              <van-image class="content-img" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </van-grid-item>
          </van-grid>
          <!-- 作者模块 -->
          <div class="info">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}</span>
            <span>{{item.pubdate}}</span>
          </div>
          <!-- 操作模块 -->
          <div class="toolBar">
            <van-row>
              <van-col span="8">
                <van-icon name="comment-o" />
                <span>89</span>
              </van-col>
              <van-col span="8">
                <van-icon name="like-o" />
                <span>点赞</span>
              </van-col>
              <van-col span="8">
                <van-icon name="share" />
                <span>分享</span>
              </van-col>
            </van-row>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onLoad() {
      let str = {
        message: "OK",
        data: {
          total_count: 277,
          page: 2,
          per_page: 10,
          results: [
            {
              title:
                "\u57fa\u4e8eAndroid\u7684\u9ed1\u9a6c\u5934\u6761APP\u7684\u8bbe\u8ba1\u4e0e\u5b9e\u73b0",
              aut_id: 1206755653360549888,
              pubdate: "2020-01-11T18:24:36",
              ch_id: 5,
              cover: { type: 0, images: [] },
              is_top: 0,
              art_id: 1215942576838803456,
              aut_name: "13812345678",
              comm_count: 13,
              like_count: 0,
              collect_count: 0
            },
            {
              title:
                "\u57fa\u4e8eAndroid\u7684\u9ed1\u9a6c\u5934\u6761APP\u7684\u8bbe\u8ba1\u4e0e\u5b9e\u73b0",
              aut_id: 1206755653360549888,
              pubdate: "2020-01-11T18:19:56",
              ch_id: 5,
              cover: { type: 0, images: [] },
              is_top: 0,
              art_id: 1215941404669247488,
              aut_name: "13812345678",
              comm_count: 1,
              like_count: 0,
              collect_count: 0
            },
            {
              title:
                "\u57fa\u4e8eAndroid\u7684\u9ed1\u9a6c\u5934\u6761APP\u7684\u8bbe\u8ba1\u4e0e\u5b9e\u73b0",
              aut_id: 1206755653360549888,
              pubdate: "2020-01-11T17:37:56",
              ch_id: 5,
              cover: { type: 0, images: [] },
              is_top: 0,
              art_id: 1215930835392266240,
              aut_name: "13812345678",
              comm_count: 13,
              like_count: 0,
              collect_count: 1
            },
            {
              title:
                "\u57fa\u4e8eAndroid\u7684\u9ed1\u9a6c\u5934\u6761APP\u7684\u8bbe\u8ba1\u4e0e\u5b9e\u73b0",
              aut_id: 1206755653360549888,
              pubdate: "2020-01-11T17:20:54",
              ch_id: 5,
              cover: { type: 0, images: [] },
              is_top: 0,
              art_id: 1215926549816016896,
              aut_name: "13812345678",
              comm_count: 0,
              like_count: 0,
              collect_count: 0
            },
            {
              title:
                "LRC\u6b4c\u8bcd\u539f\u7406\u548c\u5b9e\u73b0\u9ad8\u4effAndroid\u7f51\u6613\u4e91\u97f3\u4e50",
              aut_id: 1,
              pubdate: "2018-11-29T16:53:40",
              ch_id: 5,
              cover: {
                type: 1,
                images: [
                  "https://static.segmentfault.com/v-5bf531c8/global/img/squares.svg"
                ]
              },
              is_top: 0,
              art_id: 111141,
              aut_name: "\u5409\u5409\u56fd\u738b",
              comm_count: 17,
              like_count: 0,
              collect_count: 1
            },
            {
              title:
                "\u9ed1\u9a6c\u7a0b\u5e8f\u5458\u2014\u2014 PHP\u5165\u95e8\u6559\u7a0b_PHP\u57fa\u7840\u4e4bWeb\u524d\u7aef \u3010\u89c6\u9891\u6559\u7a0b\u3011",
              aut_id: 2,
              pubdate: "2018-11-29T15:26:52",
              ch_id: 17,
              cover: {
                type: 3,
                images: [
                  "https://img-blog.csdnimg.cn/20181101123143130.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQxMDU5Njc=,size_16,color_FFFFFF,t_70",
                  "https://img-blog.csdnimg.cn/20181101123028650.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQxMDU5Njc=,size_16,color_FFFFFF,t_70",
                  "https://img-blog.csdnimg.cn/20181101123009178.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQxMDU5Njc=,size_16,color_FFFFFF,t_70"
                ]
              },
              is_top: 0,
              art_id: 29062,
              aut_name: "13552285417",
              comm_count: 478,
              like_count: 0,
              collect_count: 3
            },
            {
              title: "\u9ed1\u9a6c\u5934\u6761\u5185\u5bb9\u7ba1\u7406123",
              aut_id: 1141972584368177152,
              pubdate: "2019-06-24T22:32:14",
              ch_id: 7,
              cover: {
                type: 1,
                images: [
                  "http://toutiao.meiduo.site/FtNcS8sKFSYQbtBbd40eFTL6lAs_"
                ]
              },
              is_top: 0,
              art_id: 1143164937707716608,
              aut_name: "\u5c0f\u9752\u9f99",
              comm_count: 0,
              like_count: 0,
              collect_count: 0
            },
            {
              title:
                "\u9ed1\u9a6c\u7a0b\u5e8f\u5458_PHP\u4ece\u5165\u95e8\u5230\u7cbe\u901a\u3010\u89c6\u9891\u6559\u7a0b\u3011",
              aut_id: 3,
              pubdate: "2018-11-29T15:26:36",
              ch_id: 7,
              cover: {
                type: 3,
                images: [
                  "https://img-blog.csdnimg.cn/2018103101261855.PNG",
                  "https://img-blog.csdnimg.cn/20181031012631129.PNG",
                  "https://img-blog.csdnimg.cn/20181031012722997.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQxMDU5Njc=,size_16,color_FFFFFF,t_70"
                ]
              },
              is_top: 0,
              art_id: 28719,
              aut_name: "18811179159",
              comm_count: 138,
              like_count: 0,
              collect_count: 3
            },
            {
              title: "\u9ed1\u9a6cjavaee10\u671f[\u517179.9G]",
              aut_id: 2,
              pubdate: "2018-11-29T15:55:49",
              ch_id: 7,
              cover: { type: 0, images: [] },
              is_top: 0,
              art_id: 63738,
              aut_name: "13552285417",
              comm_count: 84,
              like_count: 0,
              collect_count: 0
            },
            {
              title:
                "\u300a\u8ba9\u6211\u6b22\u559c\u8ba9\u6211\u5fe7\u300b\uff08\u5373\u5174\u6f14\u594f\uff1a\u5927\u53d4\u94a2\u7434\uff09",
              aut_id: 3,
              pubdate: "2018-11-29T15:52:54",
              ch_id: 5,
              cover: { type: 0, images: [] },
              is_top: 0,
              art_id: 60106,
              aut_name: "18811179159",
              comm_count: 1,
              like_count: 0,
              collect_count: 0
            }
          ]
        }
      };
      // console.log(str);
      this.list = str.data.results;
      this.finished = true;
    }
  }
};
</script>

<style lang="less">
.searchResult {
  .van-nav-bar {
    background-color: rgb(212, 61, 61);
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .my-cell {
    margin-bottom: 20px;
    padding-bottom: 0;
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .content-img {
    height: 73px;
  }
  .info {
    span {
      margin-right: 5px;
      font-size: 12px;
      color: #999;
    }
  }
  .toolBar {
    height: 45px;
    .van-row {
      height: 100%;
      .van-col {
        height: 100%;
        border-right: 0.5px solid #ececec;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        span {
          margin-left: 4px;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>