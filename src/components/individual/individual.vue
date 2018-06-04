<template>
 <div id="individual" class="individual">
   <!-- <div class="header_box clearfix">
     <img src="../../assets/image/back_chat.png" alt="" class="back_arrow fl" @click="goBack">
     <h3 class="title fl">编辑资料</h3>
   </div> -->
   <my-header title="编辑资料" bg="#fff" ></my-header>
   <!-- <scroll> -->
   <div class="scrollBox vux-1px-t">
      <!-- 上传头像 -->
      <div class="avatar_wrapper clearfix">
          <img src="../../assets/image/avatar.jpg" alt="" class="pic_avatar fl" ref="avatar">
          <div class="upload">
              <span class="changeAvatar">更换头像</span> 
              <input type="file" name="image" class="input_file" @change="Onchange">
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
      <!-- <div class="select_list_wrapper">
        <h3>候选头像</h3>
          <ul class="avatar_lsit">
              <li><img src="../../assets/image/avatar3.jpg" alt=""></li>
              <li><img src="../../assets/image/avatar2.jpg" alt=""></li>
              <li><img src="../../assets/image/avatar.jpg" alt=""></li>
              <li><img src="../../assets/image/avatar.jpg" alt=""></li>
              <li><img src="../../assets/image/avatar2.jpg" alt=""></li>
          </ul>
      </div> -->
      <!-- 修改信息 -->
      <div class="userInfo_wrapper">
          <ul class="userInfo_list">
            <li class="item vux-1px-b">
              <span class="item_name">昵称</span>
              <input type="text" class="input_name" v-model="name">
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
              <input type="text" class="input_name" v-model="signatureList">
              <img src="../../assets/image/add.png" alt="" class="add" @click="showTag">
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
   </div>
   <!-- </scroll> -->

  <!-- 标签选择 -->
  <div v-transfer-dom>
      <x-dialog v-model="tagShow" class="dialog-demo">
            <div class="tag_wrapper">
              <h2 class="signatureTitle">个性标签</h2>
              <div class="close_tabBox" @click="closeTag">
                <img src="../../assets/image/close.png" alt="" class="close">
              </div>
              <h3 class="title">最多选五个标签</h3>
              <ul class="tag_list clearfix" ref="tagList">
                <li class="tag fl" v-for="(item,index) in tagList" :data-index="index"  :key="index" @click="selectTag($event,item,index)">
                  {{item}}
                </li>
              </ul>
              <div class="DIY_tag clearfix">
                <h3 class="title">自定义标签</h3>
                <input type="text" class="diy_input fl" maxlength="4" v-model="diyTag">
                <img src="../../assets/image/plus.png" alt="" class="plus fl" @click="plusTag">
              </div>
              <div class="selected_wrapper">
                <h3 class="title">已选择标签</h3>
                <ul class="selected_list clearfix">
                  <li class="item fl" v-for="(item,index) in commonList" :key="index">
                    {{item}}
                  </li>
                </ul>
              </div>
            </div>
      
        <div class="btn_box">
          <!-- <span class="vux-close"></span> -->
          <span class="btn" @click="save">确定</span>
        </div>
      </x-dialog>
  </div>
  <!-- 星座选择 -->
  <popup-picker :show="showPopupPickerC" :data="constellationList" v-model="constellationArr"  @on-hide="onHide_C" @on-change="onChange_C"></popup-picker>
   <!-- 性别选择 -->
   <popup-picker :show="showPopupPickerSex" :data="sexList" v-model="sex"  @on-hide="onHide" @on-change="onChange_S"></popup-picker>
 </div>

</template>

<script type='text/ecmascript-6'>
import {
  XButton,
  XHeader,
  Previewer,
  PopupPicker,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";
import VueCropper from "vue-cropper";
import axios from "axios";
import Scroll from "../../base/scroll/scroll";
import myHeader from "../../base/myheader/myheader";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      signatureList: "",
      title: "最多选5个",
      diyTag: "",
      commonList: [],
      checklist003: [],
      tagShow: false,
      name: "nicky",
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
          "白羊座(3.21-4.19)",
          "金牛座(4.20-5.20)",
          "双子座(5.21-6.21)",
          "巨蟹座(6.22-7.22)",
          "狮子座(7.23-8.22)",
          "处女座(8.23-9.22)",
          "天秤座(9.23-10.23)",
          "天蝎座(10.24-11.22)",
          "射手座(11.23-12.21)",
          "摩羯座(12.22-1.19)",
          "水瓶座(1.20-2.18)",
          "双鱼座(2.19-3.20)"
        ]
      ],
      tagList: [
        "小逗比",
        "萌萌哒",
        "幽默",
        "二货",
        "逗比",
        "二货",
        "小萌萌",
        "帅呆了"
      ],
      option: {
        img: "",
        width: 300,
        height: 250,
        autoCrop: true
      },
      height: ""
    };
  },
  created() {
    this.height = document.body.clientHeight - 50;
  },
  methods: {
    //增加自定义标签
    plusTag() {
      if (this.diyTag.length > 0) {
        if (this.commonList.length > 4) {
          this.$vux.toast.show({
            type: "text",
            text: "最多设置5个标签",
            width: "12em"
          });
          return;
        }
        this.commonList.push(this.diyTag);
        this.diyTag = "";
      }
    },
    //选择自定义属性
    selectTag(e, item, index) {
      console.log(index);
      if (e.target.className.indexOf("active") == -1) {
        if (this.commonList.length > 4) {
          this.$vux.toast.show({
            type: "text",
            text: "最多设置5个标签",
            width: "12em"
          });
          return;
        }
        this.commonList.push(item);
        e.target.className = "tag fl active";
      } else {
        e.target.className = "tag fl";
        let index = this.commonList.indexOf(item);
        console.log(index);
        this.commonList.splice(index, 1);
      }
    },
    //保存自定义标签
    save() {
      this.tagShow = false;
      this.signatureList = this.commonList.join("、");
      this.commonList = [];
      this.diyTag = "";
    },
    //关闭个性表情模态框
    closeTag() {
      this.tagShow = false;
      this.commonList = [];
      this.diyTag = "";
      let elObj = this.$refs.tagList.childNodes;
      for (const key in elObj) {
        if (elObj[key].tagName == "LI") {
          elObj[key].className = "tag fl";
        }
      }
    },
    change(val, label) {
      console.log("change", val);
    },
    // 标签选择
    showTag() {
      // let elObj = this.$refs.tagList.childNodes;
      // for (const key in elObj) {
      //   if(elObj[key].tagName=='LI'){
      //     elObj[key].className = "tag fl active"
      //   }
      // }
      this.tagShow = true;
    },
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
    PopupPicker,
    XDialog,
    Scroll,
    myHeader
  }
};
</script>

<style scoped lang='less'>
@import "~vux/src/styles/close";
@import "../../assets/less/variable.less";
@import "../../assets/less/mine.less";
.individual {
  // height: 100%;
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
  .scrollBox {
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
    .avatar_wrapper {
      background: #fff;
      padding: 0.2667rem 0.4rem;
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
        // margin-left: 2.8933rem;
        // margin-right: 1.76rem;
      }
      .upload {
        padding-top: 0.5333rem;
        box-sizing: border-box;
        height: 1rem;
        width: 1.7rem;
        float: right;
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
        margin: 0.4rem auto 0;
      }
    }
    input:disabled {
      background: #fff;
    }
  }
}
.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
.tag_wrapper {
  position: relative;
  background-image: url("../../assets/image/bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding-left: 0.4rem;
  .signatureTitle {
    width: 100%;
    color: #fff;
    font-size: 0.4533rem;
    padding-top: 0.4533rem;
  }
  .close_tabBox {
    position: absolute;
    top: 0.2667rem;
    right: 0.2667rem;
    .close {
      width: 0.4267rem;
      height: 0.4267rem;
      margin-left: 0.32rem;
    }
  }
  .title {
    font-size: 0.3733rem;
    color: #4b4b4b;
    text-align: left;
    margin-top: 1.2467rem;
  }
  .tag_list {
    .tag {
      padding: 0.1867rem 0.3467rem;
      background: #eee;
      border-radius: 0.08rem;
      margin-right: 0.2933rem;
      margin-top: 0.4rem;
      font-size: 0.3467rem;
      color: #333;
      &.active {
        background: @baseColor;
        color: #333;
      }
    }
  }
  .DIY_tag {
    margin-top: 0.5333rem;
    .title {
      margin-bottom: 0.2667rem;
      margin-top: 0.5333rem;
    }
    .diy_input {
      height: 0.8rem;
      // border: none;
      outline: none;
      -webkit-appearance: none;
      background: #eee;
      text-indent: 0.1333rem;
      border: 1px solid #ccc;
    }
    .plus {
      margin-top: 0.1333rem;
      margin-left: 0.1333rem;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .selected_wrapper {
    .title {
      margin-top: 0.3333rem;
    }
    .selected_list {
      .item {
        padding: 0.1333rem 0.2667rem;
        background: @baseColor;
        color: #333;
        border-radius: 0.08rem;
        margin-right: 0.2933rem;
        margin-top: 0.4rem;
        font-size: 0.3467rem;
      }
    }
  }
}
.btn_box {
  // width: 100%;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.4667rem;
  .btn {
    display: inline-block;
    font-size: 0.4267rem;
    color: @baseColor;
  }
}
.vux-cell-box {
  visibility: hidden;
  width: 1.3333rem;
}
</style>
