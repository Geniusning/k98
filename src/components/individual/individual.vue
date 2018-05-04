<template>
 <div id="individual" class="individual">
   <x-header @on-click-back="onClickBack"  class="user_head">个人中心</x-header>
   <!-- 上传头像 -->
   <div class="avatar_wrapper">
       <img src="../../assets/image/avatar.jpg" alt="" class="pic_avatar" ref="avatar">
       <div class="upload">
           <span class="changeAvatar">更换头像</span> 
           <input type="file" name="image" accept="image/*" class="input_file" @change="Onchange">
           <!-- <cropper :headerImage="headerImage"  @getHeaderImage="newHeaderImage"></cropper>　 -->
        <!-- <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
        ></vueCropper> -->
        <!-- <p>更换头像</p> -->
       </div>
   </div>
   <!-- 头像选择 -->
   <div class="select_list_wrapper">
       <ul class="avatar_lsit">
           <li><img src="../../assets/image/avatar3.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar2.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar2.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar3.jpg" alt=""></li>
       </ul>
   </div>
   <!-- 修改名称 -->
   <div class="name_wrapper">
       <div class="nickname">
           <span>昵称</span>
       </div>
       <div class="inputArea"> 
           <input type="text" @click="changeName" ref="inputArea">
       </div>
   </div>
   <!-- 保存按钮 -->
   <div class="btn_wrapper">
       <x-button type="primary">保存</x-button>
   </div>
  <input type="text" v-model="path">
  <button @click="getUserInfo">发起请求</button>
  <textarea name="" id="" cols="30" rows="10" v-model="resText" style="margin-top:10px;"></textarea>
 </div>

</template>

<script type='text/ecmascript-6'>
import { XButton, XHeader, Previewer } from "vux";
// import VueCropper from "vue-cropper";
import axios from "axios";
export default {
  data() {
    return {
      headerImage: "",
      path: "",
      resText: "",
      option: {
        img: "http://i1.bvimg.com/643118/dad8867b08eb2933.jpg"
      }
    };
  },
  created() {},
  methods: {
    //测试
    getUserInfo() {
      let _this = this;
      axios
        .get("http://llwant.test.qianz.com" + _this.path)
        .then(res => {
          _this.resText = JSON.stringify(res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 图片上传
    Onchange(e) {
      var maxsize = 100 * 1024;
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      var files = Array.prototype.slice.call(this.files); //转化成数组
      console.log(files);
      if (files.length > 2) {
        // console.log("最多同时只可上传2张图片");
        return;
      }
      //遍历文件
      files.forEach((file, i) => {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
        var reader = new FileReader();
        reader.readAsDataURL(file); //读取文件
        var _this = this;
        reader.onload = function() {
          var result = this.result;
          var img = new Image();
          img.src = result;
          _this.$refs.avatar.src = result;
        };
        if (result.length <= maxsize) {
          img = null;
          return;
        }
        //图片加载完毕之后进行压缩，然后上传
        if (img.complete) {
          callback();
        } else {
          img.onload = callback;
        }
      });
    },
    // 使用canvas对大图片进行压缩
    compress(img) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      //    瓦片canvas
      var tCanvas = document.createElement("canvas");
      var tctx = tCanvas.getContext("2d");
      var initSize = img.src.length;
      var width = img.width;
      var height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      var ratio;
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      var count;
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
          for (var j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //进行最小压缩
      var ndata = canvas.toDataURL("image/jpeg", 0.1);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    onClickBack() {},
    changeName() {
      setTimeout(() => {
        console.log(111);
        let panel = this.$refs.inputArea;
        panel.scrollIntoView(true);
      }, 200);
    }
  },
  components: {
    XHeader,
    Previewer,
    XButton,
    // VueCropper
  }
};
</script>

<style scoped lang='less'>
.individual {
  .avatar_wrapper {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0.2667rem;
    height: 1.75rem;
    .pic_avatar {
      width: 1.75rem;
      height: 1.75rem;
    }
    .upload {
      // padding: 1.25rem 0.625rem;
      padding-right: 0.4rem;
      padding-top: 0.5333rem;
      height: 1rem;
      width: 2rem;
      line-height: 1rem;
      line-height: 20px;
      position: relative;
      text-decoration: none;
      color: #666;
      .changeAvatar {
        margin-top: -0.4rem;
      }
      .input_file {
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 1.25rem;
        opacity: 0;
      }
    }
  }
  .select_list_wrapper {
    //   margin: 0 2.5rem;
    background: #fff;
    .avatar_lsit {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      //   width: 25rem;
      li {
        img {
          width: 1.125rem;
          height: 1.125rem;
        }
      }
    }
  }
  .name_wrapper {
    display: flex;
    margin-top: 0.1333rem;
    padding: 0.25rem 0.25rem;
    // border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: #fff;
    .nickname {
      margin-right: 10px;
    }
    .inputArea {
      // padding-top: 0.1875rem;
      input {
        border: none;
      }
    }
  }
  .btn_wrapper {
    margin-top: 1.25rem;
    padding: 0 1.6rem;
  }
}
</style>
