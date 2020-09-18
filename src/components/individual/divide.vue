<template>
  <div id="individual" class="individual">
    <my-header title="新增分身" bg="#fff"></my-header>
    <!-- <scroll> -->
    <div class="scrollBox vux-1px-t">
      <!-- 上传头像 -->
      <!-- <div class="avatar_wrapper clearfix">
              <img onclick="return false" src="../../assets/image/divide_add_avatar.png" alt="" class="pic_avatar fl" ref="avatar">
              <div @click="updateAvatar" class="upload">
                <p class="upload_title">更换头像、生活照</p>
                <img onclick="return false" src="../../assets/image/arrow_right.png" alt="" class="arrowRight">
              </div>
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
            <img onclick="return false" src="../../assets/image/arrow_right.png" alt="" class="arrow_right">
          </li>
          <li class="item vux-1px-b" @click="showPopupPickerC=true">
            <span class="item_name">星座</span>
            <input type="text" class="input_name" v-model="constellation" disabled>
            <img onclick="return false" src="../../assets/image/arrow_right.png" alt="" class="arrow_right">
          </li>
          <li class="item vux-1px-b">
            <span class="item_name">个性标签</span>
            <input type="text" class="input_name" v-model="signatureList" disabled>
            <img onclick="return false" src="../../assets/image/add.png" alt="" class="add" @click="showTag">
          </li>
          <li class="item vux-1px-b">
            <span class="item_name">职务标签</span>
            <input type="text" class="input_name" disabled v-model="staffTag">
            <img onclick="return false" src="../../assets/image/add.png" alt="" class="add" @click="showStaffTag">
          </li>
          <li class="item vux-1px-b">
            <span class="item_name">手机</span>
            <input type="text" class="input_name" v-model="phone" @blur="blurAdjust">
          </li>
          <li class="item_last vux-1px-b">
            <span class="item_name signature">个性签名</span>
            <input @blur="blurAdjust" type="text" class="signature_area" v-model="signature" placeholder="最多输入15个汉字" maxlength="15">
            <div class="count">{{length}}/15</div>
          </li>
          <li class="item">
            <!-- 通知权限 -->
            <div class="authority_wrapper">
              <ul class="authority_list">
                <li style="font-size: 0.3733rem;" class="authorItem">
                  <group>
                    <x-switch title="挂免战牌" :value-map="[false, true]" @on-change="changeBattle" v-model="isBattle"></x-switch>
                  </group>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <!-- 保存按钮 -->
      <div class="btn_wrapper">
        <div class="btn" @click="saveUserInfo">下一步</div>
      </div>
    </div>
    <!-- </scroll> -->
    <!-- 标签选择 -->
    <div v-transfer-dom>
      <x-dialog v-model="tagShow" class="dialog-demo" style="height:100%">
        <div class="tag_wrapper">
          <h2 class="signatureTitle">个性标签</h2>
          <div class="close_tabBox" @click="closeTag">
            <img onclick="return false" src="../../assets/image/close.png" alt="" class="close">
          </div>
          <h3 class="title">最多选五个标签</h3>
          <ul class="tag_list clearfix" ref="tagList">
            <li class="tag fl" :class="{active:item.checked}" v-for="(item,index) in tagList" :data-index="index" :key="index" @click="selectTag($event,item,index)">
              {{item.name}}
            </li>
          </ul>
          <div class="DIY_tag clearfix">
            <h3 class="title">自定义标签</h3>
            <input type="text" class="diy_input fl" maxlength="4" v-model="diyTag">
            <img onclick="return false" src="../../assets/image/plus.png" alt="" class="plus fl" @click="plusTag">
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
    <!-- 员工标签选择 -->
    <div v-transfer-dom>
      <x-dialog v-model="StaffTagShow" class="dialog-demo" style="height:100%">
        <div class="tag_wrapper">
          <h2 class="signatureTitle">员工标签</h2>
          <div class="close_tabBox" @click="closeStaffTag">
            <img onclick="return false" src="../../assets/image/close.png" alt="" class="close">
          </div>
          <h3 class="title">最多选1个标签</h3>
          <ul class="tag_list clearfix" ref="tagList">
            <li class="tag fl" :class="{active:item.checked}" v-for="(item,index) in StaffTagList" :data-index="index" :key="index" @click="selectStaffTag($event,item,index)">
              {{item.name}}
            </li>
          </ul>
          <div class="DIY_tag clearfix">
            <h3 class="title">自定义标签</h3>
            <input type="text" class="diy_input fl" maxlength="4" v-model="diyStaffTag">
            <img onclick="return false" src="../../assets/image/plus.png" alt="" class="plus fl" @click="plusStaffTag">
          </div>
          <div class="selected_wrapper">
            <h3 class="title">已选择标签</h3>
            <p class="selectedStaffTag" v-show="staffTag">{{staffTag}}</p>
          </div>
        </div>
        <div class="btn_box">
          <!-- <span class="vux-close"></span> -->
          <span class="btn" @click="closeStaffTag">确定</span>
        </div>
      </x-dialog>
    </div>
    <!-- 星座选择 -->
    <popup-picker :show="showPopupPickerC" :data="constellationList" v-model="constellationArr" @on-hide="onHide_C" @on-change="onChange_C"></popup-picker>
    <!-- 性别选择 -->
    <popup-picker :show="showPopupPickerSex" :data="sexList" v-model="sex" @on-hide="onHide" @on-change="onChange_S"></popup-picker>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {
    mapMutations
  } from "vuex";
  import {
    XButton,
    XHeader,
    Previewer,
    PopupPicker,
    XDialog,
    TransferDomDirective as TransferDom,
    Group,
    XSwitch
  } from "vux";
  import axios from "axios";
  import api from "common/api";
  import Scroll from "../../base/scroll/scroll";
  import myHeader from "../../base/myheader/myheader";
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        StaffTagShow: false,
        diyStaffTag: '',
        staffTag: '', //员工标签
        isStealth: null,
        isQuiet: null,
        isBattle: false,
        signatureList: "",
        title: "最多选5个",
        diyTag: "",
        commonList: [], //标签
        checklist003: [],
        tagShow: false,
        name: "",
        showPopupPickerSex: false,
        showPopupPickerC: false,
        gender: "男",
        constellation: "水瓶座",
        phone: "",
        sex: ["男"],
        constellationArr: ["白羊座"],
        signature: "你是我的眼",
        headerImage: "",
        path: "",
        resText: "",
        length: "0",
        onceClick: true,
        userInfoTags: [],
        sexList: [
          ["男", "女"]
        ],
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
        StaffTagList: [{
            name: "店长",
            id: 0,
            checked: false
          },
          {
            name: "经理",
            id: 1,
            checked: false
          },
          {
            name: "客服",
            id: 2,
            checked: false
          },
          {
            name: "营销",
            id: 3,
            checked: false
          },
          {
            name: "小蜜蜂",
            id: 4,
            checked: false
          },
          {
            name: "公主",
            id: 5,
            checked: false
          },
          {
            name: "技师",
            id: 6,
            checked: false
          },
          {
            name: "陪练",
            id: 7,
            checked: false
          },
        ],
        tagList: [{
            name: "小逗比",
            id: 0,
            checked: false
          },
          {
            name: "萌萌哒",
            id: 1,
            checked: false
          },
          {
            name: "幽默",
            id: 2,
            checked: false
          },
          {
            name: "二货",
            id: 3,
            checked: false
          },
          {
            name: "逗比",
            id: 4,
            checked: false
          },
          {
            name: "小萌萌",
            id: 5,
            checked: false
          },
          {
            name: "帅呆了",
            id: 6,
            checked: false
          },
        ],
        height: ""
      };
    },
    updated() {},
    created() {
      this.height = document.body.clientHeight - 50;
      document.body.addEventListener('focusout', () => { //软键盘关闭事件
        window.scrollTo(0, 0); //解决ios键盘留白的bug
      });
    },
    methods: {
      //增加自定义员工标签
      plusStaffTag() {
        this.staffTag = this.diyStaffTag
        this.StaffTagList.forEach((item, i) => {
          item.checked = false
        })
      },
      // 显示员工标签弹框
      showStaffTag() {
        this.StaffTagShow = true
      },
      //关闭员工标签模态框
      closeStaffTag() {
        this.StaffTagShow = false;
        this.diyStaffTag = '';
      },
      //隐身状态 上线不通知好友
      stealth(e) {
        //console.log(e)
        this.isStealth = e
      },
      //安静状态，不接受好友的上线通知
      changeQuiet(e) {
        this.isQuiet = e
      },
      changeBattle(e) {
        this.isBattle = e
      },
      blurAdjust() {
        window.scrollTo(0, 0);
      },
      //进入修改头像页面
      updateAvatar() {
        this.$router.push({
          name: "updateAvatar",
          params: {
            type: "divide"
          }
        });
      },
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
      //选择员工标签
      selectStaffTag(e, item, index) {
        //console.log(index);
        if (this.diyStaffTag) {
          this.$vux.toast.text('已选择自定义标签', 'middle')
          return
        }
        if (e.target.className.indexOf("active") != -1) {
          item.checked = false
          this.staffTag = ''
        } else {
          this.StaffTagList.forEach((item, i) => {
            if (i === index) {
              item.checked = true
              this.staffTag = item.name
            } else {
              item.checked = false
            }
          })
        }
        //console.log("this.staffTag-----",this.staffTag)
      },
      //选择标签
      selectTag(e, item, index) {
        //console.log(index);
        if (e.target.className.indexOf("active") == -1) {
          if (this.commonList.length > 4) {
            this.$vux.toast.show({
              type: "text",
              text: "最多设置5个标签",
              width: "12em"
            });
            return;
          }
          this.commonList.push(item.name);
          item.checked = true
        } else {
          item.checked = false
          let index = this.commonList.indexOf(item.name);
          //console.log("commonList---index", index)
          this.commonList.splice(index, 1);
        }
      },
      //保存自定义标签
      save() {
        this.tagShow = false;
        this.signatureList = this.commonList.join("、");
        this.commonList = [];
        this.diyTag = "";
        //console.log(this.signatureList);
      },
      unique(arr) {
        return Array.from(new Set(arr))
      },
      //关闭个性表情模态框
      closeTag() {
        this.tagShow = false;
        this.tagList.forEach((localUseTag, index) => {
          if (localUseTag.checked) {
            this.commonList.push(localUseTag.name)
          }
        })
        this.userInfoTags = this.unique(this.commonList)
        this.diyTag = "";
      },
      change(val, label) {
        //console.log("change", val);
      },
      // 显示标签弹框
      showTag() {
        this.tagShow = true;
        this.commonList = [];
        //console.log("this.userInfoTags", this.userInfoTags)
        //console.log("this.tagList", this.tagList)
        this.tagList.forEach((localUseTag, index) => {
          this.userInfoTags.forEach(serverUseTag => {
            if (serverUseTag == localUseTag.name) {
              localUseTag.checked = true
              //console.log("localUseTag---", localUseTag)
              this.commonList.push(localUseTag.name)
            }
          })
        })
      },
      //性别选择
      onHide() {
        this.showPopupPickerSex = false;
      },
      onChange_S(val1) {
        //console.log(val1);
        this.gender = val1[0];
        //console.log(this.gender);
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
          //console.log(data);
        });
      },
      //保存修改
      saveUserInfo() {
        if (!this.name) {
          this.$vux.toast.show({
            type: "text",
            text: `请输入名称`,
            width: "12em"
          });
          return
        }
        let userInfoParam = {
          nickName: this.name,
          sex: this.gender === "男" ? 1 : 0,
          constellation: this.constellation,
          tags: this.signatureList,
          phone: this.phone,
          signature: this.signature,
          isBattle: this.isBattle,
          staffTag: this.staffTag,
          // role:"divide"
        };
        //console.log("userInfoParam---------", userInfoParam)
        // let strUserInfoParam = JSON.stringify(userInfoParam);
        // let decc = new TextEncoder("utf-8");
        // let param = decc.encode(strUserInfoParam);
        //保存信息
        api.createIdentity(userInfoParam).then(res => {
          if (res.errCode === 0) {
            console.log("保存分身成功---", res)
            sessionStorage.setItem("identity", res.info.openid)
            this.$router.push({
              name: "updateAvatar",
              params: {
                type: "divide"
              }
            });
          } else if (res.errCode === 1049) {
            this.$vux.toast.show({
              type: "text",
              text: `创建分身已满`,
              width: "12em"
            });
          } else {
            this.$vux.toast.show({
              type: "text",
              text: `失败${res.errorMsg}`,
              width: "12em"
            });
          }
        });
      },
      ...mapMutations({
        getuserInfo: "GET_USERINFO",
        changeQrCodeText: "CHANGEQRCODETEXT",
        showQrcode: "SHOW_QRCODE", //暂时二维码
      })
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
      PopupPicker,
      XDialog,
      Scroll,
      myHeader,
      Group,
      XSwitch
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
        position: relative;
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
          border: 1px solid #f1f1f1; // margin-left: 2.8933rem;
          // margin-right: 1.76rem;
        }
        .upload {
          padding-top: 0.6333rem;
          padding-right: 0.2rem;
          box-sizing: border-box;
          height: 1rem;
          float: right;
          line-height: 1rem;
          line-height: 20px;
          position: relative;
          text-decoration: none;
          color: #666;
          display: flex;
          .upload_title {
            margin-right: 0.1333rem;
            margin-top: -0.08rem;
          }
          .arrowRight {
            width: 0.2267rem;
            height: 0.3733rem; // margin-right: 10rem;
          }
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
        .divideBTn {
          width: .9rem;
          height: .9rem;
          border-radius: 50%;
          overflow: hidden;
          white-space: normal;
          background-color: #FFD800;
          color: #fff;
          position: absolute;
          right: 1rem;
          bottom: -.2rem;
          text-align: center;
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
          flex-wrap: wrap; //   width: 25rem;
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
              height: 0.4rem; // padding-right: 0.2rem;
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
            .authority_wrapper {
              background-color: #fff; // margin: 0.1333rem 0;
              .title {
                // padding: 0 0.4rem;
                .title();
              }
              .authority_list {
                .authorItem {}
              }
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
    width: 8rem;
    display: inline-block;
    background-color: #fff;
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
        height: 0.8rem; // border: none;
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
      text-align: left;
      .title {
        margin-top: 0.3333rem;
      }
      .selectedStaffTag {
        display: inline-block;
        text-align: left;
        font-size: 14px;
        padding: 0.1333rem 0.2667rem;
        background: @baseColor;
        color: #333;
        border-radius: 0.08rem;
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
    display: inline-block;
    width: 8.4rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #fff;
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
