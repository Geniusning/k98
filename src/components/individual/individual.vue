<template>
  <div
    id="individual"
    class="individual"
  >
    <my-header
      title="编辑资料"
      bg="#fff"
    ></my-header>
    <!-- <scroll> -->
    <div class="scrollBox vux-1px-t">
      <!-- 上传头像 -->
      <div class="avatar_wrapper clearfix">
        <img
          onclick="return false"
          :src="userInfo.headimgurl?userInfo.headimgurl:tempPic"
          alt
          class="pic_avatar fl"
          ref="avatar"
        />
        <div
          @click="updateAvatar"
          class="upload"
        >
          <p class="upload_title">更换头像、生活照</p>
          <img
            onclick="return false"
            src="../../assets/image/arrow_right.png"
            alt
            class="arrowRight"
          />
        </div>
        <div
          class="divideBTn"
          @click="goToDivide"
          v-if="userInfo.role !=''&& !(userInfo.openid.indexOf('master')>-1)"
        >
          <span>新增</span>
          <span>分身</span>
        </div>
      </div>
      <!-- <div class="tailor_wrapper" v-if="showTailor">
            <vueCropper ref="cropper" :img="option.img" :canMove="false" :autoCrop="option.autoCrop" :autoCropWidth="option.width" :autoCropHeight="option.height" class="cropper"></vueCropper>
            <p @click="stop" class="confirm">确定</p>
            </div>-->
      <!-- 修改信息 -->
      <div class="userInfo_wrapper">
        <ul class="userInfo_list">
          <li class="item vux-1px-b">
            <span class="item_name">昵称</span>
            <input
              type="text"
              class="input_name"
              v-model="name"
            />
          </li>
          <li
            class="item vux-1px-b"
            @click="showPopupPickerSex=true"
          >
            <span class="item_name">性别</span>
            <input
              type="text"
              class="input_name"
              v-model="gender"
              disabled
            />
            <img
              onclick="return false"
              src="../../assets/image/arrow_right.png"
              alt
              class="arrow_right"
            />
          </li>
          <li
            class="item vux-1px-b"
            @click="showPopupPickerC=true"
          >
            <span class="item_name">星座</span>
            <input
              type="text"
              class="input_name"
              v-model="constellation"
              disabled
            />
            <img
              onclick="return false"
              src="../../assets/image/arrow_right.png"
              alt
              class="arrow_right"
            />
          </li>
          <li
            class="item vux-1px-b"
            @click="showPopupPickerPos=true"
          >
            <span class="item_name">所属行业</span>
            <input
              type="text"
              class="input_name"
              v-model="position"
              disabled
            />
            <img
              onclick="return false"
              src="../../assets/image/arrow_right.png"
              alt
              class="arrow_right"
            />
          </li>
          <li class="item vux-1px-b">
            <span class="item_name">籍贯</span>
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedHomeTownOptions"
              @change="handleChangeHomeTown"
            ></el-cascader>
          </li>
          <li class="item vux-1px-b">
            <span class="item_name">个人标签</span>
            <input
              type="text"
              class="input_name"
              v-model="signatureList"
              disabled
            />
            <img
              onclick="return false"
              src="../../assets/image/add.png"
              alt
              class="add"
              @click="showTag"
            />
          </li>
          <li
            class="item vux-1px-b"
            v-if="userInfo.role"
          >
            <span class="item_name">职务标签</span>
            <input
              type="text"
              class="input_name"
              disabled
              v-model="staffTag"
            />
            <img
              onclick="return false"
              src="../../assets/image/add.png"
              alt
              class="add"
              @click="showStaffTag"
            />
          </li>
          <li class="item vux-1px-b">
            <span class="item_name">手机</span>
            <input
              type="number"
              class="input_name"
              v-model="phone"
              @blur="blurAdjust"
            />
          </li>
          <li class="item_last vux-1px-b">
            <span class="item_name signature">个性签名</span>
            <input
              @blur="blurAdjust"
              type="text"
              class="signature_area"
              v-model="signature"
              placeholder="最多输入15个汉字"
              maxlength="15"
            />
            <div class="count">{{length}}/15</div>
          </li>
          <li class="item">
            <!-- 通知权限 -->
            <div class="authority_wrapper">
              <ul class="authority_list">
                <li
                  style="font-size: 0.3733rem;"
                  class="authorItem"
                >
                  <group style="padding:0">
                    <x-switch
                      title="我要隐身，上线不通知好友"
                      :value-map="[false, true]"
                      @on-change="stealth"
                      v-model="isStealth"
                    ></x-switch>
                  </group>
                </li>
                <li
                  style="font-size: 0.3733rem;"
                  class="authorItem"
                >
                  <group>
                    <x-switch
                      title="我要静静，好友上线不通知我"
                      :value-map="[false, true]"
                      @on-change="changeQuiet"
                      v-model="isQuiet"
                    ></x-switch>
                  </group>
                </li>
                <li
                  style="font-size: 0.3733rem;"
                  class="authorItem"
                >
                  <group>
                    <x-switch
                      title="挂免战牌,不接受大话骰挑战"
                      :value-map="[false, true]"
                      @on-change="changeBattle"
                      v-model="isBattle"
                    ></x-switch>
                  </group>
                </li>
                <li
                  style="font-size: 0.3733rem;"
                  class="authorItem"
                >
                  <group>
                    <x-switch
                      title="关闭评论/留言"
                      :value-map="[false, true]"
                      @on-change="changeComment"
                      v-model="isComment"
                    ></x-switch>
                  </group>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- <router-view></router-view> -->
      <!-- 保存按钮 -->
      <div class="btn_wrapper">
        <div
          class="btn"
          @click="saveUserInfo"
        >保存</div>
      </div>
    </div>
    <!-- </scroll> -->
    <Popup
      @close="closePopUp"
      :show="showComfirmPwd"
      :top="25"
      :height="5"
    >
      <group title="请输入此手机号B端登录密码(纯数字)">
        <input
          type="number"
          v-model="password"
          style="display:block;height:.7rem;line-height:.7rem;margin:30px auto;text-indent: 4px;"
        />
      </group>
      <x-button
        @click.native="checkPass"
        style="width:300px;background-color:#FFD800;color:#fff;"
        type="default"
      >提交</x-button>
    </Popup>
    <!-- 个性标签选择 -->
    <div v-transfer-dom>
      <x-dialog
        v-model="tagShow"
        class="dialog-demo"
        style="height:100%;z-index:-1"
      >
        <div class="tag_wrapper">
          <h2 class="signatureTitle">个性标签</h2>
          <div
            class="close_tabBox"
            @click="closeTag"
          >
            <img
              onclick="return false"
              src="../../assets/image/close.png"
              alt
              class="close"
            />
          </div>
          <h3 class="title">最多选3个标签</h3>
          <ul
            class="tag_list clearfix"
            ref="tagList"
          >
            <li
              class="tag fl"
              :class="{active:item.checked}"
              v-for="(item,index) in tagList"
              :data-index="index"
              :key="index"
              @click="selectTag($event,item,index)"
            >{{item.name}}</li>
          </ul>
          <div class="DIY_tag clearfix">
            <h3 class="title">自定义标签</h3>
            <input
              type="text"
              class="diy_input fl"
              maxlength="4"
              v-model="diyTag"
            />
            <img
              onclick="return false"
              src="../../assets/image/plus.png"
              alt
              class="plus fl"
              @click="plusTag"
            />
          </div>
          <div class="selected_wrapper">
            <h3 class="title">已选择标签</h3>
            <ul class="selected_list clearfix">
              <li
                class="item fl"
                v-for="(item,index) in commonList"
                :key="index"
              >{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="btn_box">
          <!-- <span class="vux-close"></span> -->
          <span
            class="btn"
            @click="save"
          >确定</span>
        </div>
      </x-dialog>
    </div>
    <!-- 员工标签选择 -->
    <div v-transfer-dom>
      <x-dialog
        v-model="StaffTagShow"
        class="dialog-demo"
        style="height:100%"
      >
        <div class="tag_wrapper">
          <h2 class="signatureTitle">员工标签</h2>
          <div
            class="close_tabBox"
            @click="closeStaffTag"
          >
            <img
              onclick="return false"
              src="../../assets/image/close.png"
              alt
              class="close"
            />
          </div>
          <h3 class="title">最多选1个标签</h3>
          <ul
            class="tag_list clearfix"
            ref="tagList"
          >
            <li
              class="tag fl"
              :class="{active:item.checked}"
              v-for="(item,index) in StaffTagList"
              :data-index="index"
              :key="index"
              @click="selectStaffTag($event,item,index)"
            >{{item.name}}</li>
          </ul>
          <div class="DIY_tag clearfix">
            <h3 class="title">自定义标签</h3>
            <input
              type="text"
              class="diy_input fl"
              maxlength="4"
              v-model="diyStaffTag"
            />
            <img
              onclick="return false"
              src="../../assets/image/plus.png"
              alt
              class="plus fl"
              @click="plusStaffTag"
            />
          </div>
          <div class="selected_wrapper">
            <h3 class="title">已选择标签</h3>
            <p
              class="selectedStaffTag"
              v-show="staffTag"
            >{{staffTag}}</p>
          </div>
        </div>
        <div class="btn_box">
          <!-- <span class="vux-close"></span> -->
          <span
            class="btn"
            @click="closeStaffTag"
          >确定</span>
        </div>
      </x-dialog>
    </div>
    <!-- 星座选择 -->
    <popup-picker
      :show="showPopupPickerC"
      :data="constellationList"
      v-model="constellationArr"
      @on-hide="onHide_C"
      @on-change="onChange_C"
    ></popup-picker>
    <!-- 性别选择 -->
    <popup-picker
      :show="showPopupPickerSex"
      :data="sexList"
      v-model="sex"
      @on-hide="onHide"
      @on-change="onChange_S"
    ></popup-picker>
    <!--  -->
    <popup-picker
      :show="showPopupPickerPos"
      :data="positionList"
      v-model="positionArr"
      @on-hide="onHide_P"
      @on-change="onChange_P"
    ></popup-picker>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState, mapMutations } from "vuex";
import {
  XButton,
  XHeader,
  Previewer,
  PopupPicker,
  XDialog,
  TransferDomDirective as TransferDom,
  XSwitch,
  Group
} from "vux";
import {
  provinceAndCityData,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import Popup from "base/popUp/popUp";
import VueCropper from "vue-cropper";
import axios from "axios";
import api from "common/api";
import util from "common/util";
import Scroll from "../../base/scroll/scroll";
import myHeader from "../../base/myheader/myheader";
import { userInfo } from "os";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      options: provinceAndCityData,
      selectedHomeTownOptions: [],
      city: "",
      password: "",
      tempPic: require("../../assets/image/divide_add_avatar.png"),
      isStealth: false,
      isQuiet: false,
      isComment: false, //是否打开评价
      isBattle: false,
      signatureList: "",
      title: "最多选5个",
      diyTag: "",
      diyStaffTag: "",
      commonList: [], //个性标签
      staffTag: "", //员工标签
      checklist003: [],
      tagShow: false,
      StaffTagShow: false,
      name: "",
      showPopupPickerSex: false, //性别picker
      showPopupPickerC: false, //星座picker
      showPopupPickerPos: false, // 职位picker
      gender: "男",
      sex: ["男"],
      constellation: "水瓶座",
      constellationArr: ["白羊座"],
      phone: "",
      position: "自由职业",
      positionArr: ["自由职业"],
      signature: "你是我的眼",
      headerImage: "",
      path: "",
      resText: "",
      length: "0",
      onceClick: true,
      showComfirmPwd: false,
      userInfoTags: [],
      positionCode: 0, //行业代码
      homeTown: "", //籍贯
      hometownCode: "",
      sexList: [["男", "女"]],
      positionList: [
        [
          "自由职业",
          "全职在家",
          "贸易/商业",
          "生产/制造",
          "房地产/建筑",
          "银行/金融",
          "IT/互联网",
          "电子商务",
          "通信电子",
          "政府机关",
          "文化/艺术",
          "医疗/健康",
          "传媒影视",
          "设计/创意",
          "娱乐/休闲",
          "美容/保健",
          "零售/商场",
          "健身/体育",
          "学生",
          "其他"
        ]
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
      StaffTagList: [
        {
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
        }
      ],
      tagList: [
        {
          name: "开放",
          id: 0,
          checked: false
        },
        {
          name: "内向",
          id: 1,
          checked: false
        },
        {
          name: "爽",
          id: 2,
          checked: false
        },
        {
          name: "二师兄",
          id: 3,
          checked: false
        },
        {
          name: "旅游",
          id: 4,
          checked: false
        },
        {
          name: "游戏",
          id: 5,
          checked: false
        },
        {
          name: "泡吧",
          id: 6,
          checked: false
        },
        {
          name: "求撩",
          id: 7,
          checked: false
        },
        {
          name: "别烦我",
          id: 8,
          checked: false
        }
      ],
      height: "",
      oldPhone: ""
    };
  },
  created() {
    this.height = document.body.clientHeight - 50;
    document.body.addEventListener("focusout", () => {
      //软键盘关闭事件
      window.scrollTo(0, 0); //解决ios键盘留白的bug
    });
    setTimeout(() => {
      this.homeTown = "beijing";
    }, 500);
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    util.addVisitRecord(this.$route.name);
    this.position = this.positionList[0][Number(this.userInfo.industry)];
    this.positionCode = String(this.positionList[0].indexOf(this.position));
    this.selectedHomeTownOptions = [
      this.userInfo.hometownCode.slice(0, 2) + "0000",
      this.userInfo.hometownCode
    ];

    this.hometownCode = this.userInfo.hometownCode;
    this.name = this.userInfo.nickname;
    this.gender = this.userInfo.sex;
    this.constellation = this.userInfo.constellation;
    this.signatureList = this.userInfo.tags;
    this.staffTag = this.userInfo.staffTag;
    this.phone = this.userInfo.phone;
    this.oldPhone = this.userInfo.phone;
    this.isStealth = this.userInfo.isStealth;
    this.isQuiet = this.userInfo.isQuiet;
    this.isComment = this.userInfo.isComment;
    this.isBattle = this.userInfo.isBattle;
    this.signature = this.userInfo.signature
      ? this.userInfo.signature
      : this.signature;
    this.userInfoTags = this.userInfo.tags.split("、");
    this.tagList.forEach((localUseTag, index) => {
      this.userInfoTags.forEach(serverUseTag => {
        if (serverUseTag == localUseTag.name) {
          localUseTag.checked = true;
          this.commonList.push(localUseTag.name);
        }
      });
    });
  },
  methods: {
    handleChangeHomeTown(value) {
      this.homeTown = CodeToText[value[0]] + CodeToText[value[1]];
      this.hometownCode = value[1];
    },
    checkPass() {
      let data = {
        password: String(this.password),
        phone: String(this.phone)
      };
      api.verifyPassword(data).then(res => {
        console.log("验证密码结果---", res);
        if (res.errCode === 0) {
          this.showComfirmPwd = false;
          this.password = "";
          this.$vux.toast.text("验证成功", "top");
          api.getUserInfo().then(res => {
            this.getuserInfo(res);
            console.log("res---", res);
          });
        } else if (res.errCode === 1031) {
          this.$vux.toast.text("密码错误", "top");
        }
      });
    },
    closePopUp(flag) {
      this.showComfirmPwd = flag;
    },
    //隐身状态 上线不通知好友
    stealth(e) {
      //console.log(e)
      this.isStealth = e;
    },
    //安静状态，不接受好友的上线通知
    changeQuiet(e) {
      this.isQuiet = e;
    },
    changeBattle(e) {
      this.isBattle = e;
    },
    changeComment(e) {
      this.isComment = e;
      console.log("this.isComment---", this.isComment);
    },
    blurAdjust() {
      window.scrollTo(0, 0);
    },
    //进入分身页面
    goToDivide() {
      this.$router.push({
        name: `divide`
      });
    },
    //进入修改头像页面
    updateAvatar() {
      this.$router.push({
        name: `updateAvatar`,
        params: {
          type: "individual"
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
    //增加自定义员工标签
    plusStaffTag() {
      this.staffTag = this.diyStaffTag;
      this.StaffTagList.forEach((item, i) => {
        item.checked = false;
      });
    },
    //选择标签
    selectTag(e, item, index) {
      //console.log(index);
      if (e.target.className.indexOf("active") == -1) {
        if (this.commonList.length > 2) {
          this.$vux.toast.show({
            type: "text",
            text: "最多设置3个标签",
            width: "12em"
          });
          return;
        }
        this.commonList.push(item.name);
        item.checked = true;
      } else {
        item.checked = false;
        let index = this.commonList.indexOf(item.name);
        //console.log("commonList---index", index)
        this.commonList.splice(index, 1);
      }
    },
    //选择员工标签
    selectStaffTag(e, item, index) {
      //console.log(index);
      if (this.diyStaffTag) {
        this.$vux.toast.text("已选择自定义标签", "middle");
        return;
      }
      if (e.target.className.indexOf("active") != -1) {
        item.checked = false;
        this.staffTag = "";
      } else {
        this.StaffTagList.forEach((item, i) => {
          if (i === index) {
            item.checked = true;
            this.staffTag = item.name;
          } else {
            item.checked = false;
          }
        });
      }
      //console.log("this.staffTag-----",this.staffTag)
    },
    //保存自定义标签
    save() {
      this.tagShow = false;
      this.StaffTagShow = false;
      this.signatureList = this.commonList.join("、");
      this.commonList = [];
      this.diyTag = "";
      this.diyStaffTag = "";
      //console.log(this.signatureList);
    },
    unique(arr) {
      return Array.from(new Set(arr));
    },
    //关闭个性表情模态框
    closeTag() {
      this.tagShow = false;
      this.tagList.forEach((localUseTag, index) => {
        if (localUseTag.checked) {
          this.commonList.push(localUseTag.name);
        }
      });
      this.userInfoTags = this.unique(this.commonList);
      this.diyTag = "";
    },
    //关闭员工标签模态框
    closeStaffTag() {
      this.StaffTagShow = false;
      this.diyStaffTag = "";
    },
    change(val, label) {
      //console.log("change", val);
    },
    // 显示个性标签弹框
    showTag() {
      this.tagShow = true;
      this.commonList = [];
      this.tagList.forEach((localUseTag, index) => {
        this.userInfoTags.forEach(serverUseTag => {
          if (serverUseTag == localUseTag.name) {
            localUseTag.checked = true;

            this.commonList.push(localUseTag.name);
          }
        });
      });
    },
    // 显示员工标签弹框
    showStaffTag() {
      this.StaffTagShow = true;
    },
    //性别选择
    onHide() {
      this.showPopupPickerSex = false;
    },
    onChange_S(val1) {
      this.gender = val1[0];
    },
    //星座选择
    onHide_C() {
      this.showPopupPickerC = false;
    },
    onChange_C(val) {
      this.constellation = val[0];
    },
    //职位选择
    onHide_P() {
      this.showPopupPickerPos = false;
    },
    onChange_P(val) {
      this.position = val[0];
      console.log("val---", this.positionList[0].indexOf(this.position));
      this.positionCode = String(this.positionList[0].indexOf(this.position));
    },
    //back
    goBack() {
      this.$router.go(-1);
    },
    //保存修改
    saveUserInfo() {
      let userInfoParam = {
        nickName: this.name,
        sex: this.gender === "男" ? 1 : 0,
        constellation: this.constellation,
        tags: this.signatureList,
        phone: this.phone,
        signature: this.signature,
        isStealth: this.isStealth,
        isQuiet: this.isQuiet,
        isBattle: this.isBattle,
        staffTag: this.staffTag,
        industry: String(this.positionCode),
        hometownCode: this.hometownCode,
        hometown: this.homeTown,
        isComment: this.isComment
      };
      // if (this.phone.length != 11) {
      //   this.$vux.toast.text("请输入正确手机号", "top");
      //   return;
      // }
      let strUserInfoParam = JSON.stringify(userInfoParam);
      let decc = new TextEncoder("utf-8");
      let param = decc.encode(strUserInfoParam);
      //保存信息
      if (this.userInfo.role != "" && this.phone === "") {
        this.$vux.toast.text("员工手机号必填", "top");
        return;
      }
      api.savePersonalInfo(param).then(res => {
        console.log("res---", res);
        if (res.errCode === 0) {
          api
            .getUserInfo()
            .then(userInfo => {
              this.$vux.toast.text("保存成功", "top");
              //核对员工电话
              if (this.oldPhone != this.phone && this.phone != "") {
                api.verifyPhoneNumber(
                    this.phone,
                    this.userInfo.headimgurl,
                    this.userInfo.phone
                  )
                  .then(res => {
                    console.log("核对员工电话结果---------", res);
                    if (res.errCode === 0) {
                      this.showComfirmPwd = true;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });

                this.getuserInfo(userInfo);
              } else {
                this.getuserInfo(userInfo);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$vux.toast.text("此手机号已验证", "top");
        }
      });
    },
    ...mapMutations({
      getuserInfo: "GET_USERINFO",
      changeQrCodeText: "CHANGEQRCODETEXT",
      showQrcode: "SHOW_QRCODE" //暂时二维码
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
    VueCropper,
    PopupPicker,
    XDialog,
    Scroll,
    myHeader,
    Group,
    XSwitch,
    Popup
  }
};
</script>

<style scoped lang='less'>
@import "~vux/src/styles/close";
@import "../../assets/less/variable.less";
@import "../../assets/less/mine.less";
input .el-input__inner {
  border: none !important;
}
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
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background-color: #ffd800;
        color: #fff;
        position: absolute;
        left: 1.8rem;
        bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
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
            height: 0.7rem;
            line-height: 0.7rem;
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
              .authorItem {
              }
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
  padding-bottom: 0.2667rem;
  display: inline-block;
  background-color: #fff;
  box-sizing: border-box;
  .signatureTitle {
    width: 100%;
    color: #fff;
    font-size: 0.4533rem;
    padding-top: 0.4533rem;
    margin-bottom: 0.4667rem;
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
    margin-bottom: 0.2667rem;
    margin-top: 0.6333rem;
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
  .position_wrapper {
    text-align: left;
    .title {
      margin-bottom: 0.2667rem;
      margin-top: 0.5333rem;
    }
    .position {
      padding: 0.08rem 0.1067rem;
      display: inline-block;
      background: #ccc;
      color: #fff;
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
        font-size: 0.3467rem;
      }
    }
  }
}
.btn_box {
  display: inline-block;
  width: 8rem;
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
