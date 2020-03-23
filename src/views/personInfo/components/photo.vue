<template>
  <van-popup class="photo" v-model="show">
    <van-cell>
      <template slot="title">
        <span @click="choosePhoto">从相册选取</span>
        <input @change="fileChange" ref="photoFile" style="display:none" type="file" />
      </template>
    </van-cell>
    <van-cell title="拍照" />
    <van-cell @click="show=false" title="取消" />
  </van-popup>
</template>

<script>
// 导入图片预览
import { ImagePreview } from "vant";
import { uploadPhoto } from "@/api/user.js";
export default {
  name: "photo",
  data() {
    return {
      show: false,
      file: ""
    };
  },
  methods: {
    //   文件选择后触发的事件。
    fileChange() {
      this.file = this.$refs.photoFile.files[0];
      //  把文件对象转成临时路径。
      let imgURL = window.URL.createObjectURL(this.file);
      //   console.log(imgURL);
      //   图片预览配置模式
      ImagePreview({
        images: [imgURL],
        // 最好绑定的自己的方法作为她的关闭事件
        // 不要写成this.upload()。写了括号代表立即调用。
        onClose: () => {
          // 箭头函数里面的this，指向上一层的this.
          this.$dialog
            .confirm({
              title: "是否设置该图片为头像"
            })
            .then(async () => {
              let res = await uploadPhoto({
                photo: this.file
              });
              console.log(res);
              this.$parent.userProfile.photo = res.data.photo;
              this.show = false;
            })
            .catch(() => {
              // on cancel
            });
        },
        showIndex: false
      });
    },
    // upload() {
    //   this.$dialog
    //     .confirm({
    //       title: "是否设置该图片为头像"
    //     })
    //     .then(async () => {
    //       let res = await uploadPhoto({
    //         photo: this.file
    //       });
    //       console.log(res);
    //       //   console.log(this.$parent.userProfile);
    //       this.$parent.userProfile.photo = res.data.photo;
    //       this.show = false;
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // },
    choosePhoto() {
      // 找到file元素，调用它的点击事件。
      this.$refs.photoFile.click();
    }
  }
};
</script>

<style lang="less" scoped>
.photo {
  width: 75%;
  border-radius: 8px;
  .van-cell {
    border-bottom: 1px solid #ccc;

    &:last-child {
      border-bottom: none;
    }
    .van-cell__title {
      text-align: center;
    }
  }
}
</style>