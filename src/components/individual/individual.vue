<template>
 <div id="individual" class="individual">
   <!-- <x-header @on-click-back="onClickBack"  class="user_head">个人中心</x-header> -->
   <div class="header_box clearfix">
     <img src="../../assets/image/back_chat.png" alt="" class="back_arrow fl" @click="goBack">
     <h3 class="title fl">编辑资料</h3>
   </div>
   <!-- 上传头像 -->
   <div class="avatar_wrapper clearfix">
       <span class="avatar_name fl">头像</span>
       <img src="../../assets/image/avatar.jpg" alt="" class="pic_avatar fl" ref="avatar">
       <div class="upload fl">
           <span class="changeAvatar">更换头像</span> 
           <input type="file" name="image" accept="image/*" class="input_file" @change="Onchange">
           <img src="../../assets/image/arrow_right.png" alt="" class="arrow_right">
           <!-- <cropper :headerImage="headerImage"  @getHeaderImage="newHeaderImage"></cropper>　 -->
       </div>
   </div>
   <div class="tailor_wrapper" v-if="showTailor">
    <vueCropper
        ref="cropper"
        :img="option.img" 
        :canMove="false"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.width"
        :autoCropHeight="option.height"
        class="cropper"
    ></vueCropper>
      <p @click="stop" class="confirm">确定</p>
      <!-- <p @click="clip" class="clip">点击开始滑动截图</p> -->
   </div>
   <!-- 头像选择 -->
   <div class="select_list_wrapper">
     <h3>候选头像</h3>
       <ul class="avatar_lsit">
           <li><img src="../../assets/image/avatar3.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar2.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar.jpg" alt=""></li>
           <li><img src="../../assets/image/avatar2.jpg" alt=""></li>
       </ul>
   </div>
   <!-- 修改信息 -->
   <div class="userInfo_wrapper">
      <ul class="userInfo_list">
        <li class="item vux-1px-b">
          <span class="item_name">昵称</span>
          <input type="text" class="input_name">
        </li>
        <li class="item vux-1px-b" @click="showPopupPickerSex=true">
          <span class="item_name">性别</span>
          <input type="text" class="input_name" v-model="gender" disabled>
          <img src="../../assets/image/arrow_right.png" alt="" class="arrow_right">
        </li>
        <li class="item vux-1px-b" @click="showPopupPickerC=true">
          <span class="item_name">星座</span>
          <input type="text" class="input_name" v-model="constellation" disabled>
          <img src="../../assets/image/arrow_right.png" alt="" class="arrow_right">
        </li>
         <li class="item vux-1px-b">
          <span class="item_name">标签</span>
          <input type="text" class="input_name" value="逗比、小呆萌、二愣子">
          <img src="../../assets/image/add.png" alt="" class="add">
        </li>
        <li class="item vux-1px-b">
          <span class="item_name">手机</span>
          <input type="text" class="input_name" value="15764271456">
        </li>
         <li class="item_last vux-1px-b">
          <span class="item_name signature">个性签名</span>
          <input type="text" class="signature_area" v-model="signature" placeholder="最多输入15个汉字" maxlength="15" >
          <div class="count">{{length}}/15</div>
        </li>
      </ul>
   </div>
   <!-- 保存按钮 -->
   <div class="btn_wrapper">
       <div class="btn">保存</div>
   </div>


  <!-- 星座选择 -->
  <popup-picker :show="showPopupPickerC" :data="constellationList" v-model="constellationArr"  @on-hide="onHide_C" @on-change="onChange_C"></popup-picker>
   <!-- 性别选择 -->
   <popup-picker :show="showPopupPickerSex" :data="sexList" v-model="sex"  @on-hide="onHide" @on-change="onChange_S"></popup-picker>
 </div>

</template>

<script type='text/ecmascript-6'>
import { XButton, XHeader, Previewer, PopupPicker } from "vux";
import VueCropper from "vue-cropper";
import axios from "axios";
export default {
  data() {
    return {
      showTailor: false,
      showPopupPickerSex: false,
      showPopupPickerC: false,
      gender: "男",
      constellation: "水瓶座",
      sex: ["男"],
      constellationArr: ["白羊座"],
      signature: "",
      headerImage: "",
      path: "",
      resText: "",
      length: "0",
      sexList: [["男", "女"]],
      constellationList: [
        [
          "白羊座",
          "金牛座",
          "双子座",
          "巨蟹座",
          "狮子座",
          "处女座",
          "天秤座",
          "天蝎座",
          "射手座",
          "摩羯座",
          "水瓶座",
          "双鱼座"
        ]
      ],
      option: {
        img: "",
        width: 300,
        height: 250,
        autoCrop: true
      }
    };
  },
  created() {},
  methods: {
    //性别选择
    onHide() {
      this.showPopupPickerSex = false;
    },
    onChange_S(val1) {
      console.log(val1);
      this.gender = val1[0];
    },
    //星座选择
    onHide_C() {
      this.showPopupPickerC = false;
    },
    onChange_C(val) {
      this.constellation = val[0];
    },
    //back
    goBack() {
      this.$router.go(-1);
    },
    clip() {
      this.$refs.cropper.startCrop();
      console.log(111);
    },
    stop() {
      this.$refs.cropper.getCropData(data => {
        // do something
        this.$refs.avatar.src = data;
        this.showTailor = false;
        console.log(data);
      });
    },
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
      if (files.length > 1) {
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
          _this.showTailor = true;
          _this.option.img = result;
        };
        // if (result.length <= maxsize) {
        //   img = null;
        //   return;
        // }
        //图片加载完毕之后进行压缩，然后上传
        // if (img.complete) {
        //   callback();
        // } else {
        //   img.onload = callback;
        // }
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
  watch: {
    signature(newValue) {
      this.length = newValue.length;
    }
  },
  components: {
    XHeader,
    Previewer,
    XButton,
    VueCropper,
    PopupPicker
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/mine.less";
.individual {
  height: 100%;
  .header_box {
    padding: 0.32rem 0.4rem;
    background: #ddd;
    .back_arrow {
      width: 0.32rem;
      height: 0.5333rem;
    }
    .title {
      margin-left: 3.4133rem;
      color: #333;
      font-size: 0.4267rem;
    }
  }
  .avatar_wrapper {
    background: #fff;
    margin: 0.2667rem 0.4rem;
    height: 1.7333rem;
    .avatar_name {
      color: #666;
      font-size: 0.3733rem;
      box-sizing: border-box;
      padding-top: 0.5rem;
    }
    .pic_avatar {
      width: 1.7333rem;
      height: 1.7333rem;
      border-radius: 50%;
      margin-left: 2.8933rem;
      margin-right: 1.76rem;
    }
    .upload {
      padding-top: 0.5333rem;
      box-sizing: border-box;
      height: 1rem;
      line-height: 1rem;
      line-height: 20px;
      position: relative;
      text-decoration: none;
      color: #666;
      .changeAvatar {
        margin-top: -0.4rem;
        font-size: 0.3733rem;
        color: #666;
        padding-right: 0.2rem;
      }
      .input_file {
        position: absolute;
        overflow: hidden;
        width: 1.4667rem;
        right: 0;
        top: 0.48rem;
        opacity: 0;
      }
      .arrow_right {
        .arrow(-0.3rem);
      }
    }
  }
  .tailor_wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    .cropper {
      position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translateX(-50%);
      // transform: translateY(-50%)
    }
    .clip {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 9999;
      color: #fff;
    }
    .confirm {
      position: absolute;
      z-index: 9999;
      color: #fff;
      top: 20px;
      right: 20px;
    }
  }
  .select_list_wrapper {
    //   margin: 0 2.5rem;
    padding: 0 0.4rem;
    background: #fff;
    font-size: 0.3733rem;
    color: #666;
    h3 {
      margin-bottom: 0.4rem;
    }
    .avatar_lsit {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      //   width: 25rem;
      li {
        img {
          width: 1.6267rem;
          height: 1.6267rem;
          border-radius: 50%;
        }
      }
    }
  }
  .userInfo_wrapper {
    .userInfo_list {
      padding: 0.1333rem 0 0.1333rem 0.4rem;
      .item {
        padding: 0.28rem 0;
        box-sizing: border-box;
        position: relative;
        .add {
          .arrow(0.45rem);
          width: 0.4rem;
          height: 0.4rem;
          // padding-right: 0.2rem;
        }
        .item_name {
          margin-right: 0.6867rem;
          color: #666;
          font-size: 0.3733rem;
          font-weight: 500;
        }
        .signature {
          display: block;
        }
        .input_name {
          padding: 0.2667rem;
          width: 6.6667rem;
          font-size: 0.4rem;
          color: #333;
          border: none;
        }

        .arrow_right {
          .arrow(0.5rem);
        }
      }
      .item_last {
        padding-top: 0.4rem;
        position: relative;
        .item_name {
          margin-right: 0.6867rem;
          color: #666;
          font-size: 0.3733rem;
          font-weight: 500;
        }
        .signature_area {
          padding-top: 0.5rem;
          padding-bottom: 0.2rem;
          width: 95%;
          height: 100%;
          box-sizing: border-box;
          font-size: 0.3733rem;
          border: none;
          text-indent: 0.1333rem;
        }
        .count {
          position: absolute;
          right: 0.5rem;
          bottom: 0.1rem;
          font-size: 0.32rem;
          color: #666;
        }
      }
    }
  }
  .btn_wrapper {
    .btn {
      width: 9.2rem;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.4267rem;
      color: #4b4b4b;
      border-radius: 0.6133rem;
      background: @baseColor;
      margin: 0.8rem auto 0.7467rem;
    }
  }
  input:disabled {
    background: #fff;
  }
}
.vux-cell-box{
  visibility:hidden;
  width: 1.3333rem;
}
</style>
