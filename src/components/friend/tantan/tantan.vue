<template>
  <ul class="stack" v-show="pages.length">
    <li class="stack-item" v-for="(item, index) in pages" :key="index" :style="[transformIndex(index),transform(index)]" @touchmove.prevent="touchmove" @touchstart.prevent="touchstart" @touchend.prevent="touchend" @mousedown.prevent="touchstart" @mouseup.prevent="touchend"
      @mousemove.prevent="touchmove" @mouseout.prevent="touchend" @webkit-transition-end="onTransitionEnd(index)" @transitionend="onTransitionEnd(index)">
      <div style="height:100%" class="stack_content">
        <div class="big_box" v-if="!soulSwitch">
          <div class="img_content">
            <div class="icon_box" v-if="item.isInDoor">
              <img onclick="return false" src="../../../assets/image/online.png" alt="" class="icon">
              <img onclick="return false" v-if="item.info.onlineL98Server || item.info.onlineDiceServer" src="../../../assets/image/dot_green.png" alt="" class="dot bling">
              <img onclick="return false" v-else src="../../../assets/image/dot_red.png" alt="" class="dot bling">
              <span class="line_word">店内</span>
            </div>
            <div class="icon_box" v-else>
              <img onclick="return false" src="../../../assets/image/outline.png" alt="" class="icon">
              <img onclick="return false" v-if="item.info.onlineL98Server || item.info.onlineDiceServer" src="../../../assets/image/dot_green.png" alt="" class="dot bling">
              <img onclick="return false" v-else src="../../../assets/image/dot_red.png" alt="" class="dot bling">
              <span class="line_word">店外</span>
            </div>
            <!-- <p class="makeFriTips">绿灯闪烁表示好友在线哦，赶紧去找朋友吧...</p> -->
            <span class="time_desc">{{item.visitTime}}</span>
            <div class="avatarList-wrapper clearfix" @touchstart="showAlbum" v-if="item.info.lifePhotoURL.lifePhotoURL &&item.info.lifePhotoURL.lifePhotoURL.length>0">
              <img onclick="return false" src="../../../assets/image/picture.png" alt="" class="avatar fl"><span class="count fl">{{item.info.lifePhotoURL.lifePhotoURL.length}}</span>
            </div>
            <img onclick="return false" v-show="like && currentLikeIndex==index" class='like' src="../../../assets/image/tantan_thumb.png">
            <img onclick="return false" v-show="dislike && currentLikeIndex==index" class='dislike' src="../../../assets/image/tantan_close.png">
            <div class="avatar_box">
              <img onclick="return false" class="avatar" :src="item.info.headimgurl?item.info.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                alt="暂无头像">
              <img onclick="return false" src="../../../assets/image/friend_icon.png" alt="" class="friend_icon" v-show="item.isAlreadyFriend">
              <!-- <img onclick="return false" src="../../../assets/image/like1.png" alt="" class="friend_icon" v-show="alreadySendThumbFlag"> -->
            </div>
            <p class="name">{{item.info.nickname}}</p>
          </div>
          <!-- 个人信息 -->
          <div class="userInfo_wrapper">
            <div class="userBox clearfix">
              <img onclick="return false" src="../../../assets/image/male.png" alt="" class="sex sex_male" v-if="item.info.sex!=2">
              <img onclick="return false" src="../../../assets/image/female.png" alt="" class="sex sex_female" v-else>
              <span class="constellation">{{item.info.constellation?item.info.constellation.slice(0,3):"水瓶座"}}</span>
              <span class="friend">好友 {{item.info.numOfFriends?item.info.numOfFriends:0}}</span>
              <span class="gift">富豪榜 {{item.info.wealthRanking}}</span>
              <span class="thumb">战神榜 {{item.info.gameScoreRanking}}
                            <img onclick="return false" class="battle" v-if="item.info.isQuiet"  src="../../../assets/image/mianZhan.png" alt="">
                            <img onclick="return false" class="battle" v-if="item.info.onlineDiceServer"  src="../../../assets/image/battle.png" alt="">
                          </span>
            </div>
            <div class="tag_wrapper">
              <span v-for="(item,index) in item.info.tags?item.info.tags.split('、'):tempArr.split('、')" :key="index">{{item}}</span>
              <!-- <span>招人爱</span>
                                  <span>大胃王</span> -->
            </div>
            <div class="signature_wrapper">
              <!-- <p class="word">生活不止眼前的苟且，还有诗和远方的田野</p> -->
              <p class="word">{{item.info.signature?item.info.signature:sign}}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
    <div class="souling_wrapper" v-if="soulSwitch">
      <img ref="souling" class="souling" src="../../../assets/image/earth1.gif" alt="">
      <!-- <div class="text_content">
          <p class="text">{{stopSearch === false?"正在地球的某个角落":""}}</p>
          <p ref="dot" class="text dot">{{stopSearch === false?"寻找你的灵魂玩伴":""}}</p>
        </div> -->
      <div class="result_icon">
        <img class="found_result" v-if="searchResult" src="../../../assets/image/no_found.png" alt="">
        <img class="found_result" v-else src="../../../assets/image/finding.png" alt="">
      </div>
      <p ref="dot" class="resultSoulText dot" v-html="resultSoulText"></p>
    </div>
  </ul>
</template>
<script>
  import detectPrefixes from "./tantan.js";
  import api from "common/api";
  import util from 'common/util'
  import Bus from 'common/bus'
  import {
    mapGetters,
    mapState,
    mapMutations
  } from "vuex";
  export default {
    props: {
      searchResult:{
        type:Boolean,
        default:false
      },
      resultSoulText: {
        type: String,
        default: "",
      },
      stopSearch: {
        type: Boolean,
        default: false
      },
      stackinit: {
        type: Object,
        default: []
      },
      visible: {
        type: Number,
        default: 3
      },
      currentIndex: {
        type: Number,
        default: 0
      },
      pages: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        limitFlag: true,
        like: false,
        dislike: false,
        currentLikeIndex: 0,
        // propData: this.pages,
        // isFriend:false,
        // intervalNumber: 8,
        tempArr: "二傻子、聪明、有远见",
        sign: "生活不止眼前的苟且，还有诗和远方的田野",
        basicdata: {
          start: {},
          end: {}
        },
        //: {
        prefixes: detectPrefixes(),
        offsetY: "",
        poswidth: 0,
        posheight: 0,
        lastPosWidth: "",
        lastPosHeight: "",
        lastZindex: "",
        rotate: 0,
        lastRotate: 0,
        visible: this.visible,
        tracking: false,
        animation: false,
        currentPage: this.currentIndex || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10,
        alreadySendThumbFlag: null,
        // },
      };
    },
    watch: {
      stopSearch(newValue){
        console.log("newValue----------",newValue)
        if(newValue){
          // this.$refs.souling.className = "souling_noRotate"
          this.$refs.dot.className = "resultSoulText"
        }
      },
      currentIndex(val) {
        this.currentPage = 0 //条件筛选群友后重置群友第一个游标
        this.currentLikeIndex = 0 //条件筛选群友后重置喜欢图标显示index
      },
      pages(newValue) {
        console.log('子组件候选人数据----------------------------------------', newValue)
        let data = newValue[0];
        this.backToParentData = data
        if (newValue.length <= 10) { //粗暴解决多次触发监听导致给父组件传递数据
          this.$emit("firstData", data);
        }
      }
    },
    computed: {
      // ...mapGetters(["friendList"]),
      ...mapState(["friendListCursor", "userInfo", "tampSexFlag", "focusThumbTimes", "unfocusThumbTimes", "soulSwitch"]),
      // 划出面积比例
      offsetRatio() {
        let width = this.$el.offsetWidth;
        let height = this.$el.offsetHeight;
        let offsetWidth = width - Math.abs(this.poswidth);
        let offsetHeight = height - Math.abs(this.posheight);
        let ratio = 1 - offsetWidth * offsetHeight / (width * height) || 0;
        return ratio > 1 ? 1 : ratio;
      },
      // 划出宽度比例
      offsetWidthRatio() {
        let width = this.$el.offsetWidth;
        let offsetWidth = width - Math.abs(this.poswidth);
        let ratio = 1 - offsetWidth / width || 0;
        return ratio;
      },
    },
    methods: {
      //点赞
      giveThumb(position) {
        //每天限制30次
        //从本地缓存读取当日约战点赞次数，数据格式 {unfocusThumbTimes:0,focusThumbLimitTimes:0,unfocusPlayTimes:0,focusPlayTimes:0,date:new Date().getDate()}
        let thumbTimes = localStorage.getItem("thumbTimes") ?
          localStorage.getItem("thumbTimes") : {
            unfocusThumbTimes: this.unfocusThumbTimes,
            focusThumbTimes: this.focusThumbTimes,
            date: new Date().getDate()
          }
        let todayDate = new Date().getDate()
        if (typeof thumbTimes === "string") {
          thumbTimes = JSON.parse(thumbTimes)
        }
        console.log("thumbTimes---------", thumbTimes)
        // 判断未关注用户今天点赞次数是否达到10次，达到10次弹框提醒关注
        if (!this.userInfo.isSubscribe) { //判断是否关注公众号
          this.changeUnfocusThumbTimes(-1)
          if (thumbTimes.date == todayDate && Number(thumbTimes.unfocusThumbTimes) < 1) {
            // 当未关注用户点赞次数达到10次，存入缓存
            thumbTimes["date"] = new Date().getDate()
            let unfocusThumbNum = Number(thumbTimes.unfocusThumbTimes)
            unfocusThumbNum--
            thumbTimes["unfocusThumbTimes"] = this.unfocusThumbTimes
            localStorage.setItem("thumbTimes", JSON.stringify(thumbTimes))
            this.changeQrCodeText({
              title: "游客仅限10次交友机会，长按关注获取更多特权",
              bottomText: "会员特权:交朋友、领福利、打比赛"
            })
            this.showQrcode(true)
            return
          } else {
            thumbTimes["date"] = new Date().getDate()
            thumbTimes["unfocusThumbTimes"] = this.unfocusThumbTimes
            localStorage.setItem("thumbTimes", JSON.stringify(thumbTimes))
          }
        } else {
          this.changeFocusThumbTimes(-1)
          // 当已关注用户点赞次数达到30次，存入缓存
          // 判断已关注用户今天点赞此时是否达到30，达到30次弹框提醒今日点赞次数已用完
          if (thumbTimes.date == todayDate && Number(thumbTimes.focusThumbTimes) < 1) {
            thumbTimes["date"] = new Date().getDate()
            let focusThumbNum = Number(thumbTimes.focusThumbTimes)
            focusThumbNum--
            thumbTimes["focusThumbTimes"] = focusThumbNum
            localStorage.setItem("thumbTimes", JSON.stringify(thumbTimes))
            if (this.limitFlag) {
              this.limitFlag = !this.limitFlag;
              this.$vux.toast.text('每天限30次点赞交友机会。当天已用完，明天再来', 'middle')
            }
          } else {
            thumbTimes["date"] = new Date().getDate()
            thumbTimes["focusThumbTimes"] = this.focusThumbTimes
            localStorage.setItem("thumbTimes", JSON.stringify(thumbTimes))
          }
        }
        let xid = this.friendData.info.openid
        api.makeFriend(xid).then(res => {
          console.log("api.makeFriend(xid)-----------", res);
          if (res.errCode === 0) {
            this.$emit("heartBeat", this.friendData);
          } else if (res.errCode === 1023) {
            // this.showQrcode(true);
          } else if (res.errCode == 1001) { //已经点赞过了
            // this.alreadySendThumbFlag = true
          } else if (res.errCode == 1002) { //已经是朋友了
            // this.alreadySendThumbFlag = false
          }
        });
      },
      //点击相册
      showAlbum() {
        const num = 1
        this.$emit('showAblum', this.backToParentData ? this.backToParentData : this.pages[0]);
      },
      touchstart(e) {
        if (this.tracking) {
          return;
        }
        // 是否为touch
        if (e.type === "touchstart") {
          this.startX = e.touches[0].clientX;
          if (e.touches.length > 1) {
            this.tracking = false;
            return;
          } else {
            // 记录起始位置
            this.basicdata.start.t = new Date().getTime();
            this.basicdata.start.x = e.targetTouches[0].clientX;
            this.basicdata.start.y = e.targetTouches[0].clientY;
            this.basicdata.end.x = e.targetTouches[0].clientX;
            this.basicdata.end.y = e.targetTouches[0].clientY;
            // offsetY在touch事件中没有，只能自己计算
            this.offsetY =
              e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop;
          }
          // pc操作
        } else {
          this.basicdata.start.t = new Date().getTime();
          this.basicdata.start.x = e.clientX;
          this.basicdata.start.y = e.clientY;
          this.basicdata.end.x = e.clientX;
          this.basicdata.end.y = e.clientY;
          this.offsetY = e.offsetY;
        }
        this.tracking = true;
        this.animation = false;
        this.startDistant = e.targetTouches[0].screenX
      },
      touchmove(e) {
        // 记录滑动位置
        this.endX = e.touches[0].clientX;
        this.distant = this.endX - this.startX;
        if (this.tracking && !this.animation) {
          if (e.type === "touchmove") {
            this.basicdata.end.x = e.targetTouches[0].clientX;
            this.basicdata.end.y = e.targetTouches[0].clientY;
          } else {
            // e.preventDefault();
            this.basicdata.end.x = e.clientX;
            this.basicdata.end.y = e.clientY;
          }
          // 计算滑动值
          this.poswidth = this.basicdata.end.x - this.basicdata.start.x;
          this.posheight = this.basicdata.end.y - this.basicdata.start.y;
          let rotateDirection = this.rotateDirection();
          let angleRatio = this.angleRatio();
          this.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio;
        }
        this.movingDistant = e.targetTouches[0].screenX
        if (this.movingDistant - this.startDistant > 0) {
          this.like = true
          this.dislike = false
        } else {
          this.dislike = true
          this.like = false
        }
      },
      touchend(e) {
        this.tracking = false;
        this.animation = true;
        // 滑动结束，触发判断
        // 判断划出面积是否大于0.01
        if (this.offsetRatio >= 0.15) {
          // 计算划出后最终位置
          let ratio = Math.abs(
            this.posheight / this.poswidth
          );
          this.poswidth = this.poswidth >= 0 ? this.poswidth + 200 : this.poswidth - 200;
          this.posheight = this.posheight >= 0 ? Math.abs(this.poswidth * ratio) : -Math.abs(this.poswidth * ratio);
          this.opacity = 0;
          this.swipe = true;
          this.nextTick();
          // 不满足条件则滑入
        } else {
          this.poswidth = 0;
          this.posheight = 0;
          this.swipe = false;
          this.rotate = 0;
        }
        this.like = false;
        this.dislike = false;
      },
      nextTick() {
        // 记录最终滑动距离
        this.lastPosWidth = this.poswidth;
        this.lastPosHeight = this.posheight;
        this.lastRotate = this.rotate;
        this.lastZindex = 20;
        // 循环currentPage
        // console.log('this.currentPage：', this.currentPage)
        if (this.currentPage == this.pages.length - 3 && this.friendListCursor != 0) {
          // if (this.currentPage == this.pages.length - 3 && this.tampSexFlag) {
          this.$emit('getMoreFriend');
        }
        if (this.currentPage + 1 == this.pages.length) {
          this.currentLikeIndex = -1
        }
        this.friendData = this.pages[this.currentPage];
        console.log("friendData-------------------", this.friendData)
        this.currentPage = this.currentPage === this.pages.length - 1 ? 0 : this.currentPage + 1;
        this.backToParentData = this.pages[this.currentPage];
        // console.log("this.friendData----------",this.friendData)
        // console.log("this.backToParentData----------",this.backToParentData)
        this.$emit("firstData", this.backToParentData);
        let signList = [
          "努力吧,别把自己的青春铺张在爱情上",
          "兄弟虽然我们是在网络中相遇",
          "多年后你和她情深似海，会不会想到欠我一个未来",
          "生活不止眼前的苟且，还有诗和远方的田野"
        ];
        let index = Math.floor(Math.random() * 4);
        this.sign = signList[index];
        // console.log("currentLikeIndex---------", this.currentLikeIndex)
        this.currentLikeIndex++
          // console.log("this pages.length--------", this.pages.length)
          if (this.distant > 0) {
            // console.log("往右划朋友信息-------",this.friendData)
            if (!this.friendData.isAlreadyFriend) { //不是朋友才右滑点赞
              this.giveThumb()
              this.like = true;
            } else {
              // this.alreadySendThumbFlag = false
            }
          } else {
            console.log("往左滑")
            this.dislike = true;
            // this.alreadySendThumbFlag = false
          }
        // console.log(this.currentPage);
        // let index = this.currentPage;
        // if (this.distant > 0) {
        //   this.currentPage =
        //     this.currentPage === this.pages.length - 1
        //       ? 0
        //       : this.currentPage + 1;
        //   let friendData_right = this.pages[this.currentPage];
        //   this.$emit("firstData", friendData_right);
        // } else {
        //   // currentPage切x 换，整体dom进行变化，把第一层滑动置最低
        //   this.currentPage =
        //     this.currentPage === 0
        //       ? this.pages.length - 1
        //       : this.currentPage - 1;
        //   let friendData_left = this.pages[this.currentPage];
        //   this.$emit("firstData", friendData_left);
        // }
        this.$nextTick(() => {
          this.poswidth = 0;
          this.posheight = 0;
          this.opacity = 1;
          this.rotate = 0;
        });
      },
      prevTick() {
        // 记录最终滑动距离
        this.lastPosWidth = this.poswidth;
        this.lastPosHeight = this.posheight;
        this.lastRotate = this.rotate;
        this.lastZindex = 20;
        // 循环currentPage
        console.log(this.currentPage);
        this.currentPage = this.currentPage === this.pages.length - 1 ? 0 : this.currentPage - 1;
        // currentPage切换，整体dom进行变化，把第一层滑动置最低
        this.$nextTick(() => {
          this.poswidth = 0;
          this.posheight = 0;
          this.opacity = 1;
          this.rotate = 0;
        });
      },
      // prev() {
      //   this.tracking = false;
      //   this.animation = true;
      //   // 计算划出后最终位置
      //   let width = this.$el.offsetWidth;
      //   this.poswidth = -width;
      //   this.posheight = 0;
      //   this.opacity = 0;
      //   this.rotate = "-3";
      //   this.swipe = true;
      //   this.nextTick();
      // },
      // next() {
      //   this.tracking = false;
      //   this.animation = true;
      //   // 计算划出后最终位置
      //   let width = this.$el.offsetWidth;
      //   this.poswidth = width;
      //   this.posheight = 0;
      //   this.opacity = 0;
      //   this.rotate = "3";
      //   this.swipe = true;
      //   this.nextTick();
      // },
      onTransitionEnd(index) {
        let lastPage =
          this.currentPage === 0 ? this.pages.length - 1 : this.currentPage - 1;
        // dom发生变化正在执行的动画滑动序列已经变为上一层
        if (this.swipe && index === lastPage) {
          this.animation = true;
          this.lastPosWidth = 0;
          this.lastPosHeight = 0;
          this.lastOpacity = 0;
          this.lastRotate = 0;
          this.swipe = false;
          this.lastZindex = -1;
        }
      },
      rotateDirection() {
        if (this.poswidth <= 0) {
          return -1;
        } else {
          return 1;
        }
      },
      angleRatio() {
        let height = this.$el.offsetHeight;
        let offsetY = this.offsetY;
        let ratio = -1 * (2 * offsetY / height - 1);
        return ratio || 0;
      },
      inStack(index, currentPage) {
        let stack = [];
        let visible = this.visible;
        let length = this.pages.length;
        for (let i = 0; i < visible; i++) {
          if (currentPage + i < length) {
            stack.push(currentPage + i);
          } else {
            stack.push(currentPage + i - length);
          }
        }
        return stack.indexOf(index) >= 0;
      },
      // 非首页样式切换
      transform(index) {
        let currentPage = this.currentPage;
        let length = this.pages.length;
        let lastPage =
          currentPage === 0 ? this.pages.length - 1 : currentPage - 1;
        let style = {};
        let visible = this.visible;
        if (index === this.currentPage) {
          return;
        }
        if (this.inStack(index, currentPage)) {
          let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length;
          style["opacity"] = "1";
          style["transform"] = "translate3D(0,0," + -1 * 60 * (perIndex - this.offsetRatio) + "px" + ")";
          style["zIndex"] = visible - perIndex;
          if (!this.tracking) {
            style[this.prefixes.transition + "TimingFunction"] = "ease";
            style[this.prefixes.transition + "Duration"] = 400 + "ms";
          }
        } else if (index === lastPage) {
          style["transform"] = "translate3D(" + this.lastPosWidth + "px" + "," + this.lastPosHeight + "px" + ",0px) " + "rotate(" + this.lastRotate + "deg)";
          style["opacity"] = this.lastOpacity;
          style["zIndex"] = this.lastZindex;
          style[this.prefixes.transition + "TimingFunction"] = "ease";
          style[this.prefixes.transition + "Duration"] = 400 + "ms";
        } else {
          style["zIndex"] = "-1";
          style["transform"] = "translate3D(0,0," + -1 * visible * 60 + "px" + ")";
        }
        return style;
      },
      // 首页样式切换
      transformIndex(index) {
        if (index === this.currentPage) {
          let style = {};
          style["transform"] = "translate3D(" + this.poswidth + "px" + "," + this.posheight + "px" + ",0px) " + "rotate(" + this.rotate + "deg)";
          style["opacity"] = this.opacity;
          style["zIndex"] = 10;
          if (this.animation) {
            style[this.prefixes.transition + "TimingFunction"] =
              "ease";
            style[this.prefixes.transition + "Duration"] =
              (this.animation ? 100 : 0) + "ms";
          }
          return style;
        }
      },
      ...mapMutations({
        changeUnfocusThumbTimes: "CHANGEUNFOCUSTHUMBTIMES", //未关注用户点赞次数
        changeFocusThumbTimes: "CHANGEFOCUSTHUMBTIMES", //关注用户点赞次数
        changeQrCodeText: "CHANGEQRCODETEXT",
        showQrcode: "SHOW_QRCODE", //暂时二维码
      })
    },
  };
</script>
<style scoped lang='less'>
  @import "../../../assets/less/variable.less";
  @import "../../../assets/less/tantan.less";
  .stack {
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 1500px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 1500px;
    -webkit-perspective-origin: 50% 150%;
    margin: 0;
    padding: 0;
    .souling_wrapper {
      position: absolute;
      left: 50%;
      top: 1rem;
      width: 10rem;
      height: 7rem;
      margin-left: -5rem;
      z-index: 99;
      text-align: center;
      .resultSoulText {
        text-align: center;
        margin-top: 1rem;
        line-height: 2;
        color: #BFBEBE;
        font-size: .4rem;
        font-weight: 700;
      }
      @keyframes rotating {
        20% {
          transform: rotate(72deg);
        }
        40% {
          transform: rotate(144deg);
        }
        60% {
          transform: rotate(216deg);
        }
        80% {
          transform: rotate(288deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .souling {
        margin-left: .5rem;
        width: 4.5rem;
        height: 4.5rem; 
        // animation: rotating 3s infinite linear;
      }
      .result_icon{
        position: absolute;
        top: 4.2rem;
        right: 1.2rem;
        .found_result{
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      .souling_noRotate {
        width: 100%;
        height: 100%;
      }
      .dot {
        font-size: .433rem;
        color: #BFBEBE;
        font-weight: 700;
      }
      .dot:after {
        content: ".";
        display: inline-block;
        width: 2em;
        text-indent: -0.5em;
        overflow: hidden;
        vertical-align: bottom;
        -webkit-animation: dotting 5s infinite;
        -o-animation: dotting 5s infinite;
        -moz-animation: dotting 5s infinite;
        animation: dotting 5s infinite;
        text-align: left;
      }
      @keyframes dotting {
        0% {
          text-shadow: 0em 0 0 currentColor;
        }
        25% {
          text-shadow: 0.7em 0 0 currentColor;
        }
        50% {
          text-shadow: 0.7em 0 0 currentColor, 1.3em 0 0 currentColor;
        }
        75% {
          text-shadow: 0.7em 0 0 currentColor, 1.3em 0 0 currentColor, 1.9em 0 0 currentColor;
        }
        100% {
          text-shadow: 0em 0 0 currentColor;
        }
      }
    }
  }
  .stack-item {
    background: rgba(255, 255, 255, 1);
    height: 100%;
    width: 100%;
    border-radius: 8px;
    text-align: center; // overflow: hidden;
    position: absolute;
    opacity: 0;
    display: -webkit-flex;
    display: flex;
    box-shadow: 0px 0px 0.4667rem 1px #c1c1c1;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
  }
  .stack_content {
    .big_box {
      background: #fff;
      border-radius: 10px;
    }
    .img_content {
      width: 100%;
      height: 7.1733rem;
      position: relative;
      text-align: center;
      .time_desc {
        position: absolute;
        top: 0.4rem;
        left: 1.7rem;
        color: #a8a8a8;
        font-size: 0.32rem;
        padding: 0.1rem;
        border-radius: 0.3067rem;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        padding: 0.1rem;
        z-index: 10000;
      }
      .like {
        width: 1.5667rem;
        height: 1.5667rem;
        position: absolute;
        top: 1.2rem;
        left: .3rem;
      }
      .dislike {
        width: 1.5667rem;
        height: 1.5667rem;
        position: absolute;
        top: 1.2rem;
        right: .3rem;
      }
      .avatarList-wrapper {
        position: absolute;
        z-index: 10000;
        top: 0.5rem;
        right: 0.5rem;
        background-color: #dfdfdf;
        padding: 0.066rem 0.1667rem;
        color: #fff;
        box-sizing: border-box;
        .avatar {
          width: 0.4rem;
          height: 0.3967rem;
          margin-right: 0.1333rem;
        }
        .count {
          margin-top: -0.0267rem;
          font-size: 14px;
        }
      }
      .icon_box {
        position: absolute;
        width: 1.6933rem;
        height: 0.9067rem;
        top: 0.4033rem;
        left: -0.15rem;
        z-index: 10000;
        .icon {
          width: 100%;
          height: 100%;
        }
        .dot {
          width: 0.3467rem;
          height: 0.3467rem;
          position: absolute;
          top: 0.2333rem;
          left: 0.3rem;
        }
        .bling {
          animation: bling 1000ms linear infinite normal;
          @keyframes bling {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
        .line_word {
          font-size: 0.3467rem;
          color: #fff;
          position: absolute;
          left: 0.7rem;
          top: 0.13rem;
        }
      }
      .name {
        position: absolute;
        width: 100%;
        text-align: center;
        height: 0.6133rem;
        top: 6.5rem; // left: 3.4167rem;
        z-index: 10000;
        font-size: 0.4533rem;
        font-weight: 700;
        color: #232323;
      }
      .blur_avatar {
        width: 100%;
        height: 100%; // filter: blur(0.9rem);
        background: rgba(255, 255, 255, 0.5);
        -webkit-backdrop-filter: blur(0.9rem);
      }
      .avatar_box {
        box-sizing: border-box;
        width: 5rem;
        height: 5rem;
        border-radius: 50%; // padding: 0.1rem;
        border: 0.1067rem solid #f1f1f1;
        position: absolute;
        margin: 1.2rem auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .avatar {
          display: block;
          position: absolute;
          top: 0.15rem;
          left: 0.15rem;
          width: 4.5333rem;
          height: 4.5333rem;
          border-radius: 50%;
        }
        .friend_icon {
          width: 0.84rem;
          height: 0.84rem;
          position: absolute;
          bottom: 0;
          right: 0.8rem;
        }
      }
    }
    .userInfo_wrapper {
      margin-top: 0.3rem;
      padding-left: 0.4533rem;
      .userBox {
        position: relative;
        .username {
          text-align: left;
          text-indent: 0.375rem;
          font-size: 0.4rem;
          float: left;
          font-weight: 700;
          color: #ff7900;
          margin-right: 0.2rem;
        }
        .sex {
          float: left;
          display: inline-block;
          text-align: center;
          border-radius: 2px;
          color: #fff;
          margin-top: 0.04rem;
          margin-right: 0.2333rem;
        }
        .sex_male {
          width: 0.5233rem;
          height: 0.5033rem;
          margin-top: 0.12rem;
        }
        .sex_female {
          width: 0.5333rem;
          height: 0.5333rem;
        }
        .constellation {
          .userInfo(#c579ff);
        }
        .thumb {
          box-sizing: border-box;
          padding-top: 0.03rem;
          display: inline-block;
          position: relative;
          .battle {
            width: 0.7733rem;
            height: 0.7867rem;
            position: absolute;
            top: -0.6rem;
            right: -0.5rem;
            z-index: 2;
          }
          .userInfo(#61d78b);
          .thumb_samll {
            width: 0.2933rem;
            height: 0.2933rem;
            position: absolute;
            top: 0.12rem;
            left: 0.15rem;
          }
        }
        .friend {
          box-sizing: border-box;
          padding-top: 0.03rem;
          .userInfo(#ffd800);
          .friend_samll {
            width: 0.3733rem;
            height: 0.3733rem;
            vertical-align: -0.0267rem;
          }
        }
        .gift {
          box-sizing: border-box;
          padding-top: 0.04rem;
          .userInfo(#ee8232);
          .gift_small {
            width: 0.2833rem;
            height: 0.2833rem;
            position: absolute;
            top: 0.12rem;
            left: 0.2rem;
          }
        }
      }
      .tag_wrapper {
        text-align: left;
        color: #666;
        font-family: "PingFang-SC-Medium";
        margin-top: 0.24rem;
        span {
          display: inline-block;
          padding: 0.0533rem 0.09rem;
          border: 1px solid #bebebe;
          border-radius: 0.0533rem;
          color: #a5a5a5;
          font-size: 0.32rem;
          margin-right: 0.1333rem;
        }
      }
      .signature_wrapper {
        margin-top: 0.16rem;
        .word {
          color: #808080;
          text-align: left;
          font-size: 0.3467rem;
        }
      }
    }
  }
  .stack-container li.move-back {
    /* http://matthewlein.com/ceaser/ */
    -webkit-transition-timing-function: cubic-bezier( 0.175, 0.885, 0.47, 1);
    /* older webkit */
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.47, 1.515);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.47, 1.515);
  }
</style>