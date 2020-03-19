<template>
  <div class="detail">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 文章部分 -->
    <h2 class="title">文章标题</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <div class="info">
          <img class="icon" src="http://toutiao.meiduo.site/Fj-nZRmJLzM9kCYJ9vzYR6tfNhBV" alt />
          <!-- 作者名字和信息 -->
          <div class="aut-info">
            <div class="name">作者</div>
            <div class="time">一年前</div>
          </div>
          <!-- 关注按钮 -->
          <van-button type="info" icon="plus">关注</van-button>
        </div>
      </template>
    </van-cell>
    <!-- 文章内容区域 -->
    <div class="content">过眼溪山，怪都似、旧时相识。还记得、梦中行遍，江南江北。佳处径须携杖去，能消几緉平生屐。笑尘劳、三十九年非、长为客。</div>
    <!-- 操作区域 -->
    <div class="operation">
      <van-button icon="like" round>点赞</van-button>
      <van-button icon="delete" round>不喜欢</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {}
  }
};
</script>

<style lang="less">
.detail {
  .van-nav-bar {
    background-color: rgb(212, 61, 61);
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .title {
    text-align: center;
  }

  .info {
    display: flex;
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .aut-info {
      flex: 1;
    }
  }
  .content {
    padding: 30px 15px;
  }
  .operation {
    display: flex;
    justify-content: space-around;
  }
}
</style>