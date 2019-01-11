<template>
  <div id="home" class="home">
    <div class="guideBg" v-if="isFirstLoad" @click="isFirstLoad=false"></div>
    <div class="homeTop_wrapper">
      <div class="barLogo_wrapper">
        <div class="logo_wrapper">
          <img class="logo" :src="shopSettingInfo.image" alt>
          <!-- <p class="bar_name">{{shopSettingInfo.name}}</p> -->
          <p class="bar_name">{{shopInfo.name}}</p>
          <p class="bar_name" v-if="shopInfo.name1">{{shopInfo.name1}}</p>
        </div>
      </div>
      <swiper :auto="true" class="slider" :loop="true" :list="demo01_list" v-model="demo01_index"></swiper>
      <div class="shadowLeft"></div>
      <div class="shadowRight"></div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="adr_wrapper">
          <div class="adr clearfix" @click="getMapPosition">
            <img src="../../assets/image/position.png" alt class="position">
            <p class="adr_desc">{{shopSettingInfo.address}}</p>
          </div>
          <div class="tel">
            <a href="javascript:void(0);">
              <img src="../../assets/image/call.png" alt @click="callPhone">
            </a>
          </div>
        </div>
        <!-- 望眼镜背景 -->
        <div class="telescope_wrapper">
          <div v-show="isFirstLoad" @click="isFirstLoad=false">
            <img src="../../assets/image/finger.png" alt class="leftguideFinger">
            <p class="leftguideText">点击找朋友</p>
          </div>
          <div v-show="isFirstLoad" @click="isFirstLoad=false">
            <img src="../../assets/image/finger.png" alt class="rightguideFinger">
            <p class="rightguideText">去玩大话骰</p>
          </div>
          <img src="../../assets/image/telescope_bg.png" alt class="telescope_img">
          <div class="left_radius_box" ref="leftRadiusBox" @click="gotoFriend">
            <div class="online_person">{{outFriendNum+inFriendNum}}人在线 &gt;</div>
            <div class="leftCircle" v-if="hiddenTelescope">
              <div class="leftCirclePart" ref="leftCirclePart"></div>
              <div class="rightCirclePart"></div>
            </div>
            <!-- <div v-for="item in circleList" class="left_radius" :style="item"></div> -->
            <img src="../../assets/image/findFriend.png" alt class="findFriend_text" v-if="hiddenTelescope">
          </div>
          <div class="right_radius_box" ref="rightRadiusBox" @click="gotoPlay">
            <div class="online_player">5人在玩 &gt;</div>
            <!-- <div v-for="item in circleList" class="right_radius" :style="item"></div> -->
            <div class="rightCircle" v-if="hiddenTelescope">
              <div class="leftCirclePart"></div>
              <div class="rightCirclePart"></div>
            </div>
            <img src="../../assets/image/dahuashai.png" alt class="dahuashai_text" v-if="hiddenTelescope">
          </div>
          <!-- 更多好友 -->
          <div class="more">
            <ul class="fri_list" v-show="friendList.length>3">
              <li class="item" v-for="(item,index) in friendIconList" :key="index">
                <img :src="item.headimgurl?item.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                  class="min_avatar" onclick="return false">
              </li>
              <li class="item dotItem" @click="gotoFriend">
                <span class="dot">...</span>
                <span class="rightArrow">&gt;</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 游戏 -->
        <!-- <div class="game_wrapper">
                          <div class="title clearfix ">
                            <div class="fl">
                              <img src="../../assets/image/game_icon.png" alt="" class="icon animations fl" ref="iconAnimation">
                              <h2 class="dice_title">大话骰</h2>
                              <span class="desc">排名赛进行中，不服来战...</span>
                            </div>
                            <div class="fr challengeGameBox">
                              <span class="arrowRight" :class="{active:arrowIndex ==0}" >&gt;</span>
                              <span class="arrowRight" :class="{active:arrowIndex ==1}" >&gt;</span>
                              <span class="arrowRight" :class="{active:arrowIndex ==2}" >&gt;</span>
                              <span class="arrowRight" :class="{active:arrowIndex ==3}" >&gt;</span>
                              <span class="arrowRight" :class="{active:arrowIndex ==4}" >&gt;</span>
                              <img src="../../assets/image/huangguan.png" class="huangguan" alt="" @click="playGame_rank">
                            </div>
                          </div>
                          <ul class="game_list ">
                            <li @click="playGame_friend">
                              <img src="../../assets/image/haoyou.png" alt="" class="pic_game" onclick="return false">
                              <img src="../../assets/image/nvlang.png" alt="" class="nvlang">
                            </li>
                            <li @click="playGame_challenge">
                              <img src="../../assets/image/lingzhuo.png" alt="" class="pic_game" onclick="return false">
                            </li>
                          </ul>
                </div>-->
        <!-- 好友 -->
        <!-- <div class="friend_wrapper">
                          <div class="title_content_fri clearfix">
                            <div class="title clearfix">
                              <img src="../../assets/image/footPrint.png" alt="" class="icon fl" onclick="return false">
                              <h2 class="friend_title">找朋友</h2>
                              <span class="desc">瞅瞅老友在干哈......</span>
                            </div>
                            <div class="more">
                              <ul class="fri_list" v-show="friendList.length>3">
                                <li class="item" v-for="(item,index) in friendIconList" :key="index">
                                  <img :src="item.headimgurl?item.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                                    class="min_avatar" onclick="return false">
                                </li>
                                <li class="item dotItem">
                                  <span class="dot">...</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="pic_content">
                            <ul class="pic_list">
                              <li @click="outFriend" class="out_fri">
                                <span class="out_onlinePerson">{{outFriendNum}}人在线 ></span>
                                <img src="../../assets/image/dianwai.png" alt="" class="friend_avatar_out" onclick="return false">
                              </li>
                                <li @click="intoFriend" class="inner_fri">
                                <span class="inner_onlinePerson">{{inFriendNum}}人在线 ></span>
                                <img src="../../assets/image/diannei.png" alt="" class="friend_avatar_inner" onclick="return false">
                              </li>
                            </ul>
                          </div>
                </div>-->
        <!-- 福利 -->
        <div class="welfare_wrapper">
          <div class="title_content_wel">
            <div class="title clearfix">
              <img src="../../assets/image/recomment.png" onclick="return false" alt class="icon fl">
              <h2 class="shop_title">店长推荐</h2>
              <span class="desc">预订享优惠</span>
            </div>
            <div class="more fr">
              <img src="../../assets/image/letter.gif" alt class="letter" @click="inToLetter">
            </div>
          </div>
          <div class="advertise_wrapper" v-if="show_advertise">
            <img src="../../assets/image/advertise.png" alt class="advertise" onclick="return false">
            <!-- <img src="http://llwant.test.qianz.com/download/file/5007c55f109d0ad7f840d3b2e4c5263c.png" alt="" class="advertise" > -->
            <img src="../../assets/image/close_ad.png" alt class="close" @click="close_adtise">
          </div>
          <div class="welfare_content">
            <ul class="welfare_list" v-if="recommendList.length">
              <li class="item clearfix" v-for="(item,index) in recommendList" :key="index">
                <div class="left">
                  <img :src="item.goods.image" alt class="shopPic">
                </div>
                <div class="center">
                  <p class="title">{{item.goods.name}}</p>
                  <p class="desc">{{item.goods.subtopic}}</p>
                  <p class="limit">{{item.goods.limit}}</p>
                  <p class="price">
                    <!-- <span class="discount_p">消耗积分：{{item.goods.discountPrice}}</span> -->
                    <span class="discount_p">特惠￥{{item.goods.discountPrice}}</span>
                    <span class="origin_p">积分换 ${{item.goods.integral}}</span>
                  </p>
                </div>
                <div class="right">
                  <div class="thunb_box">
                    <!-- <span class="count fl">已订：{{item.convert.convertNumber}}</span> -->
                    <div class="booking_btn" @click="freeBook(item.goods.ID,index)">积分兑换</div>
                  </div>
                  <!-- <div class="show_detail_btn">积分兑换</div> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 友商互推 -->
        <!-- <div class="welfare_wrapper">
                          <div class="title_content_wel">
                            <div class="title clearfix">
                              <img src="../../assets/image/hutui.png" onclick="return false" alt="" class="icon fl">
                              <h2 class="shop_title">友好商家</h2>
                              <span class="desc">享会员优惠,交更多朋友</span>
                            </div>
                          </div>
                          <div class="welfare_content">
                            <ul class="welfare_list" v-if="recommendList.length">
                              <li class="item clearfix" v-for="(item,index) in recommendList" :key="index" >
                                <div class="left" >
                                  <img src="../../assets/image/hutuishop1.png" alt="" class="shopPic">
                                </div>
                                <div class="center">
                                  <p class="title">爱尚KTV</p>
                                  <p class="desc">{{item.recommend.subtopic}}</p>
                                  <p class="limit">{{item.recommend.limit}}</p>
                                  <p class="price">
                                    <span class="discount_p" style="font-size:.3rem">优惠券内容摘要：100元现金券</span>
                                  </p>
                                </div>
                                <div class="right">
                                  <div class="thunb_box clearfix">
                                    <p class="count fl">&lt;.5km</p>
                                  </div>
                                  <div style="margin-left:.3rem" class="show_detail" @click="freeBook(item.recommend.recommendID)">
                                    领取
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                </div>-->
      </div>
    </div>
    <div class="fuli" @click="toWelfare" v-show="noCouponsFlag">
      <img src="../../assets/image/fuli.png" alt class="pic_fuli">
    </div>
    <!-- 游戏框框 -->
    <div v-transfer-dom>
      <x-dialog v-model="gameShow" class="dialog-gameBegin">
        <div class="game-box">
          <img src="../../assets/image/gameBegin.jpg" alt class="gameBegin" @click="intoReadyGame">
        </div>
        <div @click="closeGame">
          <img src="../../assets/image/gameClose.png" alt class="close">
        </div>
      </x-dialog>
    </div>
    <!-- <img style="visibility:hidden" :src="shopSettingInfo.image" alt=""> -->
    <topUp :convertType="convertType" v-if="isGiftPanel" @closeIntegralPanel="closeIntegralPanel" :giftInfo="recommendItemIndo" :fatherPanelIndex="fatherPanelIndex"></topUp>
    <transition name="appear">
      <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Scroll from "../../base/scroll/scroll";
  import util from "common/util";
  import api from "common/api";
  import topUp from 'base/topUp/topUp';
  import {
    TransferDom,
    Swiper,
    Toast,
    XDialog
  } from "vux";
  import axios from "axios";
  import Config from "common/url";
  import {
    mapMutations,
    mapActions,
    mapState,
    mapGetters
  } from "vuex";
  // import { Carousel3d, Slide } from 'vue-carousel-3d';
  import envelope from 'base/envelope/envelope'
  import mySwiper from '../../libs/swiper/swiper-4.3.3.min.js'
  import {
    setInterval,
    clearInterval
  } from 'timers';
  export default {
    name: "home",
    directives: {
      TransferDom
    },
    data() {
      return {
        recommendItemIndo: {
          convert: {},
          coupInfo: {},
          recommend: {
            couponID: '',
            discountPrice: '',
            image: '',
            limit: '',
            name: '',
            originalPrice: '',
            recommendID: '',
            subtopic: '',
          },
        },
        convertType:0,
        fatherPanelIndex: 2,
        showTelescopeFlag: true,
        circleList: [],
        friendIconList: [],
        dicountList: [],
        gameShow: false,
        discountShow: false, //AI优惠券
        showDialogStyle: false,
        show_advertise: true,
        isShowEnvelope: false,
        envelopeText: "",
        demo01_list: [],
        test1: "123",
        demo01_index: 0,
        data: [1, 2, 3],
        distance: "",
        recommendList: [],
        inFriendNum: 0,
        outFriendNum: 0,
        arrowIndex: 0,
        isGiftPanel: false,
        hiddenTelescope: true,
        isFirstLoad: false,
        shopInfo: {
          name: "深圳市乐乐湾"
        }
      };
    },
    created() {
      setTimeout(() => {
        console.log('门店logo--------------------', this.shopSettingInfo.image)
        let _url = window.location.href;
        this.myShareUrl = _url.split('#')[0];
        if (util.isAndroid()) {
          let shareObj = {
            title: "发现一个好玩的地方",
            desc: "可以认识许多新朋友，打比赛。老板还特傻X，见人就发红包",
            link: `${Config.shareUrl}#/home`,
            imgUrl: `${this.shopSettingInfo.image}`
          };
          util._getJssdkInfo(shareObj, this.myShareUrl);
        } else {
          let shareObj = {
            title: "发现一个好玩的地方",
            desc: "可以认识许多新朋友，打比赛。老板还特傻X，见人就发红包",
            link: Config.shareUrl + "#/home",
            imgUrl: `${this.shopSettingInfo.image}`
          };
          util._getJssdkInfo(shareObj, this.myShareUrl,20);
        }
      }, 1000);
      // this.arrowTimer = setInterval(() => {
      //   this.arrowIndex++;
      //   if (this.arrowIndex == 5) {
      //     this.arrowIndex = 0;
      //   }
      // }, 100)
    },
    computed: {
      ...mapState(["baseUrl", "friendList", "inAndOutFriendCursor", "userInfo", "shareUrl", "shopSettingInfo", "noCouponsFlag"]),
    },
    mounted() {
      if (this.userInfo.firstLoad) {
        this.isFirstLoad = true;
      } else {
        this.isFirstLoad = false;
      }
      this.getFriendList(); //获取候选人
      this._loadPublishArenas(); //拉取已经发布的比赛场
      this._loadFriendEvts(); //获取好友事件列表
      this.getFriendGift(); //获取好友送礼列表
      this.getAlreadyFriend(); //获取已经成为好友列表
      this._getInOutNum();
      //this._loadUserCoupons(); //用户获取优惠券
      //this._acquireWaitGetCoupons();//用户获取优惠券
      this._loadRecommends(); //店长推荐数据
      this._loadAdvertisingPhoto(); //拉取首页轮播图
      this._loadInviteWaitGetCoupon(); //判断是否已经分享过邀请有礼优惠券
      this._loadInviteCombat(); //拉取约战列表
      //监听摇色蛊动画
      // setInterval(() => {
      //   this.$refs.iconAnimation.className = "icon animations fl"
      // }, 5000)
      // this.$refs.iconAnimation.addEventListener('webkitAnimationEnd', () => {
      //   this.$refs.iconAnimation.className = "icon fl"
      //   console.log('动画结束啦')
      // }, false);
      //监听望眼镜动画leftCirclePart
      this.$refs.leftCirclePart.addEventListener('webkitAnimationEnd', () => {
        this.hiddenTelescope = false; //隐藏望眼镜扇形动画
      }, false);
      // 圆圈动画
      // this.renderCircle();
      // setTimeout(() => {
      //   this.openCircle();
      // }, 1000);
    },
    activated() {},
    deactivated() {},
    methods: {
      //监听充值面板状态
      closeIntegralPanel(flag) {
        console.log('面板状态-----------', flag);
        this.isGiftPanel = flag;
      },
      //去游戏
      gotoPlay() {
        window.location.href = `${Config.shareUrl}game`;
      },
      gotoFriend() {
        util.routerTo("friend", this, {
          routeParamNum: 0 //路由参数2为进入了场外
        });
      },
      //打电话
      callPhone() {
        // this.set(this.shopInfo, "name1", "hahaha")
        window.location.href = `tel://${this.shopSettingInfo.phone}`;
        api.statCalls().then(res => {
          console.log('打电话记录------------------', res);
        })
      },
      //判断是否已经分享过优惠券 (福利优惠券)
      _loadInviteWaitGetCoupon() {
        api.loadInviteWaitGetCoupon().then(res => {
          console.log('优惠券----------------------------------:', res)
          if (res.errCode === 0 && res.coupons === null) {
            this.judgeInviteCoupon(false);
          }
        })
      },
      //进入游戏初始页面
      intoReadyGame() {
        // this.$router.push({ name: "gameCompetion" });
        this.gameShow = false;
        window.location.href = `${Config.shareUrl}game/?gamePath=game2`;
      },
      // 关闭游戏
      closeGame() {
        this.gameShow = false;
      },
      // 随机场
      playGame_challenge() {
        let token = util.getCookie("tk");
        window.location.href = `${Config.shareUrl}game/?gamePath=game1`;
      },
      // 比赛场
      playGame_rank() {
        this.$router.push({
          name: "gameCompetion"
        })
      },
      // 好友场
      playGame_friend() {
        let token = util.getCookie("tk");
        window.location.href = `${Config.shareUrl}game/?gamePath=game3`;
      },
      //拉取已经发布的比赛场
      _loadPublishArenas() {
        api.loadPublishArenas().then(res => {
          var reverseArr = res.arenaInfos.reverse();
          if (reverseArr.length > 0) {
            this.gameShow = true;
          }
          console.log('拉取已经发布的比赛场:', res)
        })
      },
      //获取店长推荐
      _loadRecommends() {
        api.loadRecommends().then(res => {
          console.log('店长推荐数据---------------------', res)
          this.recommendList = res.slice(0, 4);
          let recomment = res.slice(0, 4)
          this.getRecommentList(recomment);
        })
      },
      //拉取首页轮播图
      _loadAdvertisingPhoto() {
        api.loadAdvertisingPhoto().then(res => {
          console.log('轮播图-------------------------：', res)
          this.getAdvertisingImg(res.adPhotoURL);
          this.$nextTick(() => {
            let swiperList = [];
            res.adPhotoURL.forEach((item, index) => {
              swiperList.push({
                url: "javascript:",
                img: item,
                title: ""
              })
            })
            this.demo01_list = swiperList
          })
        })
      },
      //拉取约战列表
      _loadInviteCombat() {
        api.loadInviteCombat().then(res => {
          console.log('约战列表--------------', res);
          if (res.errCode == 0) {
            res.inviteCombatInfo.forEach(item => {
              let content = {
                extMsg: {
                  combatID: item.combatID,
                  headImgURL: item.headImgURL,
                  inviterID: item.inviterID,
                  nickName: item.nickName,
                  url: item.url,
                  time: util.timestampToTimeNoLine(item.score)
                }
              }
              this.getChallengeGamelist(content);
              this.addBandge();
            })
          }
        })
      },
      //获取好友事件
      _loadFriendEvts() {
        let cursor = 0;
        this.getFriendEvt(cursor);
      },
      //关闭广告
      close_adtise() {
        this.show_advertise = false;
      },
      //免费预定
      freeBook(recommendID, index) {
        console.log('recommendID----------', recommendID)
        console.log('index----------', index)
        this.isGiftPanel = true;
        this.fatherPanelIndex = 2,
          console.log(this.fatherPanelIndex)
        this.recommendItemIndo = this.recommendList[index];
        // api.convertRecommend(recommendID).then(res => {
        //   console.log('预定结果--------------', res);
        //   couponId = res.userCouponID;
        //   if (res.errCode && res.errCode == 1021) {
        //     this.isShowEnvelope = true;
        //     this.envelopeText = "您己成功兑换,无需重复兑换"
        //     setTimeout(() => {
        //       this.isShowEnvelope = false;
        //     }, 2000);
        //   } else {
        //     this.isShowEnvelope = true;
        //     this.envelopeText = "成功兑换，到店请先到收银台扫码确认"
        //     setTimeout(() => {
        //       this.isShowEnvelope = false;
        //     }, 2000);
        //     this._loadRecommends(); //重新拉取店长推荐
        //   }
        //   //发起预订券核销
        //   return api.launchSetOffUserCoupon(couponId);
        // }).then(res => {
        //   console.log('发起预定券核销结果-------------', res);
        // }).catch(err => {
        //   console.log(err)
        // });
      },
      //关闭详情
      closeDialog() {
        this.showDialogStyle = false;
      },
      //获取地图位置
      getMapPosition() {
        //获取地理位置
        console.log('获取地理位置');
        let _this = this;
        wx.getLocation({
          // type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function(res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            //window.location.href="http://apis.map.qq.com/uri/v1/marker?marker=coord:22.547986,113.988039;title:深圳魅力四射酒吧;addr:好吃好玩的地方&referer=myapp"
            window.location.href = `http://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${latitude},${longitude}&to=${_this.shopSettingInfo.address}&tocoord=${_this.shopSettingInfo.lat},${_this.shopSettingInfo.lng}&policy=1&referer=myapp`;
          }
        });
      },
      //获取场内场外人数
      _getInOutNum() {
        api.getInOutNum().then(res => {
          this.inFriendNum = res.inFieldNumber;
          this.outFriendNum = res.outFiledNumber;
        });
      },
      //进入福利页面
      toWelfare() {
        this.$router.push({
          name: "shareNew"
        });
      },
      //进入场内交友界面
      intoFriend() {
        if (this.inFriendNum === 0) {
          this.$vux.toast.show({
            type: "text",
            text: "场内暂时没有朋友",
            width: "12em"
          });
          return;
        }
        util.routerTo("friend", this, {
          routeParamNum: 1 //路由参数1为进入了场内
        });
      },
      //进入场外交友界面
      outFriend() {
        util.routerTo("friend", this, {
          routeParamNum: 2 //路由参数2为进入了场外
        });
      },
      //进入店长信箱
      inToLetter() {
        util.routerTo("message", this, {
          routeParamNum: 1 //路由参数2表示从店长信箱进入店长留言
        });
      },
      // 更多福利
      showMoreWelfare() {
        util.routerTo("welfare", this);
      },
      // //获取门店信息
      // _loadStoreSetting() {
      //   api.loadStoreSetting().then(res => {
      //     console.log('门店信息---------------------------------：', res)
      //     this.getShopSetting(res)
      //   })
      // },
      ...mapMutations({
        //getShopSetting: "GET_SHOPINFO",                         //获取门店信息
        getPosition: "GET_POSITION",
        getFriend: "GET_FRIENDlIST",
        updateShareUrl: "UPDATE_SHAREURL",
        getFriend: "GET_FRIENDlIST", //获取候选人,
        judgeInviteCoupon: "JUDGE_INVITE_COUPON", //判断是否还有邀请有礼
        getAdvertisingImg: "GET_ADVERTISINGIMG", //获取首页轮播图
        getChallengeGamelist: "GET_CHALLENGEGAMELIST", //更新新增约战列表
        addBandge: "ADD_BADGE",
        getRecommentList: "GET_RECOMMENTLIST"
      }),
      ...mapActions({
        getFriendEvt: "get_FriendEvt", //获取好友事件
        getAlreadyFriend: "get_alreadyFriendList", //获取已经成为好友事件
        getFriendList: "get_Friendlist",
        getFriendGift: "get_FriendGift" //获取好友送礼事件
      })
    },
    watch: {
      friendList: function(newValue) {
        let tempArr = this.friendList.map((item, index) => {
          return item.info;
        });
        this.friendIconList = tempArr.slice(0, 5);
      }
    },
    components: {
      Swiper,
      Toast,
      XDialog,
      Scroll,
      envelope,
      topUp,
      // Carousel3d,
      // Slide
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/home_common.less";
  @import "../../assets/less/mixin.less";
  @import "~vux/src/styles/close";
  @import "../../libs/swiper/swiper-4.3.3.min.css"; // 优惠券开始
  .weui-dialog {
    background: none;
  }
  .dialog-discount {
    .discount-box {
      padding: 0.2333rem 0 0.1rem;
      background-color: #ffd700;
      overflow: hidden;
      .discountScroll {
        height: 3.8rem;
        box-sizing: border-box;
        .discountList {
          .item {
            margin: 0 auto 0.2667rem;
            width: 7.0533rem;
            height: 1.68rem;
            display: flex;
            justify-content: space-between; // border: 1px solid #FFAE00;
            // border-left: 2px solid #FFAE00;
            .bg("../../assets/image/discount_bg1.png");
            box-sizing: border-box;
            .itemLeft {
              box-sizing: border-box;
              padding-top: 0.4rem;
              .itemName {
                font-size: 0.3467rem;
                color: #4b4b4b;
                margin-bottom: 0.22rem;
                padding-left: 0.4533rem;
              }
              .itemTime {
                padding-left: 0.4533rem;
                font-size: 0.2933rem;
                color: #999;
              }
            }
            .itemRight {
              box-sizing: border-box;
              padding: 0.2667rem;
              padding-top: 0.6rem;
              font-size: 0.3733rem;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff;
  } // 优惠券结束
  // 弹框游戏开始
  .dialog-gameBegin {
    .game-box {
      .gameBegin {
        width: 8.1867rem;
        height: 7.2rem;
      }
    }
    .close {
      margin-top: 0.72rem;
      width: 1.0667rem;
      height: 1.0667rem;
    }
  } // 弹框游戏结束
  .home {
    .guideBg {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 8;
      background-color: rgba(0, 0, 0, 0.3);
    }
    background: rgba(242, 242, 242, 1);
    .fuli {
      position: fixed;
      bottom: 80px;
      right: 1px;
      animation: jump 1500ms linear 500ms infinite normal;
      @keyframes jump {
        10% {
          bottom: 80px;
        }
        50% {
          bottom: 75px;
        }
        100% {
          bottom: 80px;
        }
      }
      .pic_fuli {
        width: 60px;
        height: 73px;
      }
    }
  }
  .dialog_wrapper {
    width: 7.8667rem;
    height: 10.3467rem;
    background: #ffd700;
    margin: 0 auto;
    border-radius: 10px;
    .banner_content {
      width: 100%;
      height: 3.4933rem;
      margin-bottom: 0.2667rem;
      .picBanner {
        width: 100%;
        height: 100%;
      }
    }
    .info_content {
      width: 7.0667rem;
      height: 6.2933rem;
      margin: 0 auto;
      background-image: url("../../assets/image/dialog_bg.png");
      background-repeat: no-repeat;
      background-size: 100%;
      padding-top: 0.5867rem;
      box-sizing: border-box;
      h2 {
        font-size: 0.4rem;
        color: #ff3131;
        font-weight: bold;
        text-align: center;
        font-family: "PingFang SC";
      }
      .introduce_box {
        margin-top: 0.16rem;
        .title {
          .dialogTitle;
        }
        p {
          .dialogP;
        }
      }
      .endTime_box {
        margin-top: 0.3333rem;
        .title {
          .dialogTitle;
        }
        p {
          .dialogP;
        }
      }
      .consume_box {
        margin-top: 0.2933rem;
        .title {
          .dialogTitle;
        }
        p {
          .dialogP;
        }
      }
      .btn_box {
        button {
          outline: none;
          background: #fff;
          border: none;
          color: #ffd700;
          padding: 0.1333rem;
        }
      }
    }
  }
  .content {}
  .telescope_wrapper {
    @keyframes bigAndSmall {
      0% {
        transform: scale(1); //  opacity: 1;
      }
      50% {
        transform: scale(.7);
      }
      100% {
        transform: rotate(.8);
      }
    }
    width: 100%;
    height: 7rem;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    .leftguideFinger {
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: 2.5rem;
      left: 1.5667rem;
      z-index: 9;
      animation: bigAndSmall 1s linear infinite;
    }
    .rightguideFinger{
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: 2.5rem;
      z-index: 9;
      animation: bigAndSmall 1s linear infinite;
      right: .7rem;
    }
    .leftguideText{
      position: absolute;
      top: 4.5rem;
      left: 1.4667rem;
      z-index: 9;
      font-size: 0.4rem;
      color: #fff;
      padding: 0.1333rem;
      font-weight: 800;
      border: 1px solid #fff;
      border-radius: 0.3333rem;
    }
    .rightguideText{
       position: absolute;
      top: 4.5rem;
      z-index: 9;
      font-size: 0.4rem;
      color: #fff;
      right: .4rem;
      padding: 0.1333rem;
       font-weight: 800;
      border: 1px solid #fff;
      border-radius: 0.3333rem;
    }
    
    @keyframes rotateAn {
      0% {
        transform: rotate(0deg); 
          opacity: 1;
      }
      99% {
        transform: rotate(180deg);
         opacity: 1;
      }
      100% {
        transform: rotate(180deg);
        opacity: 0;
      }
    }
    .left_radius_box {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
      top: 1.6rem;
      left: 0.57rem;
      overflow: hidden;
      .leftCircle {
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
        position: absolute;
        .leftCirclePart,
        .rightCirclePart {
          position: absolute;
          width: 50%;
          height: 100%;
          top: 0;
        }
        .leftCirclePart {
          left: -0.0167rem;
          border-radius: 50% 0 0 50%;
          overflow: hidden;
        }
        .leftCirclePart::after {
          background: linear-gradient(bottom, #9BCCF7, #2785f0);
          opacity: 1;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          transform-origin: right center;
          animation: rotateAn 2s 5s linear forwards;
        }
        .rightCirclePart {
          right: 2px;
          border-radius: 0 50% 50% 0;
          overflow: hidden;
        }
        .rightCirclePart::after {
          background: linear-gradient(bottom, #9BCCF7, #2785f0);
          opacity: 1;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          transform-origin: left center;
          animation: rotateAn 2s 3s linear forwards;
        }
      }
      .findFriend_text {
        position: absolute;
        width: 2.6rem;
        top: 1.2rem;
        left: 0.4rem;
      }
      .online_person {
        width: 1.7rem;
        box-sizing: border-box;
        text-align: center;
        background-color: #fff;
        border-radius: 0.2667rem;
        position: absolute;
        bottom: 0.2667rem;
        left: 0.8067rem;
        padding: 0.05rem 0.1rem;
        font-size: 0.28rem;
      } // .left_radius {
      //   width: 0.04rem;
      //   height: 1.6rem;
        // background: linear-gradient(top, #9BCCF7, #2785f0);
      //   position: absolute;
      //   left: 50%;
      //   margin-left: -0.02rem;
      //   transform-origin: bottom;
      // }
    }
    .right_radius_box {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
      top: 1.56rem;
      right: 0.54rem;
      overflow: hidden;
      .rightCircle {
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
        position: absolute;
        overflow: hidden;
        left: 0.0133rem;
        .leftCirclePart,
        .rightCirclePart {
          position: absolute;
          width: 50%;
          height: 100%;
          top: 0;
        }
        .leftCirclePart {
          left: -0.0067rem;
          border-radius: 50% 0 0 50%;
          overflow: hidden;
        }
        .leftCirclePart::after {
          background: linear-gradient(bottom, #9BCCF7, #2785f0);
          opacity: 1;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          transform-origin: right center;
          animation: rotateAn 2s 5s linear forwards;
        }
        .rightCirclePart {
          right: 0.0367rem;
          border-radius: 0 50% 50% 0;
          overflow: hidden;
        }
        .rightCirclePart::after {
          background: linear-gradient(bottom, #9BCCF7, #2785f0);
          opacity: 1;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          transform-origin: left center;
          animation: rotateAn 2s 3s linear forwards;
        }
      }
      .dahuashai_text {
        position: absolute;
        width: 2.6rem;
        top: 1.2rem;
        left: 0.4rem;
      }
      .online_player {
        width: 1.7rem;
        box-sizing: border-box;
        text-align: center;
        background-color: #fff;
        border-radius: 0.2667rem;
        position: absolute;
        bottom: 0.2667rem;
        left: 0.8167rem;
        padding: 0.05rem 0.1rem;
        font-size: 0.28rem;
      }
      .right_radius {
        width: 0.04rem;
        height: 1.6rem;
        position: absolute;
        right: 50%;
        margin-right: -0.02rem;
        transform-origin: bottom;
      }
    }
    .telescope_img {
      position: absolute; // top: -0.2333rem;
      width: 100%;
      height: 100%;
    }
    .more {
      position: absolute;
      bottom: 0rem;
      right: 0rem;
      padding: 0.1rem 0.1333rem;
      padding-top: 0.3rem;
      padding-right: 0.4333rem;
      .fri_list {
        .item {
          float: left;
          margin-left: -0.25rem;
          .dot {
            font-size: 0.5533rem;
            display: inline-block;
            line-height: 0.3rem;
            color: #d1d1d1;
          }
          .min_avatar {
            width: 0.6667rem;
            height: 0.6667rem;
            border-radius: 50%;
          }
        }
        .dotItem {
          margin-left: 0.1rem;
          padding-top: 0.0667rem;
          .rightArrow {
            position: absolute;
            right: 0.0933rem;
            top: 0.3rem;
            font-size: 0.5533rem;
            display: inline-block;
            color: #d1d1d1;
          }
        }
      }
    }
  }
  .homeTop_wrapper {
    position: relative;
    height: 4.2667rem;
    padding-top: 0.2rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    background: -webkit-linear-gradient(left, #fff800, #fef200, #fccc00, #fbbc00);
    margin-bottom: 0.4rem; // padding: 0.1667rem;
    // .bg('../../assets/image/welfare_bg.png');
    // background: #ffe200;
    .barLogo_wrapper {
      width: 100%;
      position: absolute;
      z-index: 999;
      top: 0.96rem;
      left: 0.4rem;
      .logo_wrapper {
        display: inline-block;
        height: 0.5rem;
        background-color: rgba(0, 0, 0, 0.1);
        line-height: 0.5rem;
        margin: 0 0.5rem;
        border-radius: 10px;
        .logo {
          width: 0.6733rem;
          height: 0.6733rem;
          float: left;
          margin-top: -2px;
          border-radius: 50%;
          margin-right: 0.1367rem;
        }
        .bar_name {
          color: #f4f4f4;
          float: left;
          font-family: "PingFang-SC-Regular";
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .slider {
      height: 100%;
      position: relative;
      top: 0.4rem;
    }
    .shadowLeft {
      position: absolute;
      width: 0.45rem;
      height: 3.8rem;
      background: #fff;
      border-radius: 0 10px 10px 0px;
      top: 1.2rem;
      left: 0;
      transform: skewY(-30deg);
    }
    .shadowRight {
      position: absolute;
      width: 0.45rem;
      height: 3.8rem;
      background: #fff;
      border-radius: 10px 0px 0px 10px;
      top: 1.2rem;
      right: 0;
      transform: skewY(30deg);
    }
  }
  .pic {
    width: 100%;
    height: 100%;
  } // 地址
  .adr_wrapper {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 0rem 0.5rem 0rem;
    height: 0.8733rem;
    box-sizing: border-box;
    margin-bottom: 0.2667rem;
    .adr {
      font-family: "Times New Roman", Times, serif;
      height: 15px;
      line-height: 15px;
      flex-grow: 1;
      display: flex;
      padding-top: 0.19rem;
      .position {
        width: 0.4067rem;
        height: 0.5133rem;
        margin-right: 0.1333rem;
        margin-top: -0.0167rem;
      }
      .adr_desc {
        font-size: 0.3733rem;
        font-family: "PingFang-SC-Regular";
        color: #9f9f9f;
        flex-grow: 1;
        padding-top: 0.07rem; // text-align: center;
      }
    }
    .navigator {
      position: relative;
      margin-top: -0.125rem;
      .distant {
        font-size: 12px;
        font-family: "PingFang-SC-Regular";
      }
      .pic_map {
        width: 0.9375rem;
        height: 0.9375rem;
        vertical-align: -0.1875rem;
      }
    }
    .tel {
      // padding-top: 2px;
      a {
        color: #ccc;
      }
      img {
        width: 0.8267rem;
        height: 0.8267rem;
        position: relative;
        z-index: 10;
      }
    }
  } // 好友
  .friend_wrapper {
    overflow: hidden;
    .icon {
      width: 0.7733rem;
      height: 0.88rem;
      margin-right: 0.16rem;
    }
    .titleWrapper;
    .title {
      padding-bottom: 0.1333rem;
      padding-top: 0.1rem;
      float: left;
      display: inline-block;
      .title;
      .friend_title {
        .homeTitle;
        padding-top: 0.25rem;
      }
      .desc {
        .titleDesc;
        padding-top: 0.22rem;
      }
    }
    .more {
      padding: 0.1rem 0.1333rem;
      padding-top: 0.3rem;
      float: right;
      .fri_list {
        .item {
          float: left;
          margin-left: -0.25rem;
          .dot {
            font-size: 0.5533rem;
            display: inline-block;
            line-height: 0.3rem;
            color: #d1d1d1;
          }
          .min_avatar {
            width: 0.6667rem;
            height: 0.6667rem;
            border-radius: 50%;
          }
        }
        .dotItem {
          margin-left: 0.1rem;
        }
      }
    }
    .pic_content {
      .pic_list {
        padding: 0 0.4667rem;
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.167rem;
        li {
          &.out_fri {
            // padding-top: 0.1633rem;
          }
          position: relative;
          .inner_onlinePerson {
            .online;
          }
          .out_onlinePerson {
            .online;
            right: 0.6867rem;
          }
          .friend_avatar_inner {
            width: 4.2933rem;
            height: 2.2533rem;
          }
          .friend_avatar_out {
            width: 4.2933rem;
            height: 2.2533rem;
          }
        }
      }
    }
  } // 游戏
  .game_wrapper {
    // width: 100%;
    overflow-y: hidden;
    .icon {
      width: 0.6rem;
      height: 0.7067rem;
      margin-right: 0.16rem;
      transform: rotate(0deg);
    }
    .animations {
      animation: rock 1000ms linear 1 normal;
      @keyframes rock {
        10% {
          transform: rotate(-45deg);
        }
        30% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(-45deg);
        }
        70% {
          transform: rotate(0deg);
        }
        90% {
          transform: rotate(-45deg);
        }
      }
    }
    .titleWrapper;
    .title {
      padding-bottom: 0.1333rem;
      padding-top: 0.2667rem;
      .title();
      .dice_title {
        .homeTitle;
        padding-top: 0.0967rem;
      }
      .desc {
        .titleDesc;
        padding-top: 0.0967rem;
      }
      .challengeGameBox {
        margin-right: 0.2667rem;
        padding-top: 0.1033rem;
        width: 2.6667rem;
        display: flex;
        justify-content: space-between;
        .arrowRight {
          font-size: 0.4rem;
          font-weight: 700;
          color: #ffdd44;
          &.active {
            color: red;
            font-weight: 700;
          }
        }
        .huangguan {
          width: 0.5333rem;
          height: 0.3333rem;
          padding: 0.1067rem;
        }
      }
    }
    .game_list {
      // overflow-x: auto;
      // overflow-y: hidden;
      height: 2.3333rem;
      margin: 0 0.4667rem;
      padding-bottom: 0.17rem;
      display: flex;
      justify-content: space-between;
      position: relative;
      li {
        // display: table-cell;
        box-sizing: border-box;
        .pic_game {
          float: left;
          width: 4.2933rem;
          height: 2.2533rem;
        }
        &:nth-child(2) {
          margin-left: 0.2667rem;
        }
        .nvlang {
          position: absolute;
          z-index: 4;
          width: 1.44rem;
          height: 2.33rem;
          top: -0.2rem;
          left: 0.2rem;
        }
      }
    }
  } // 福利
  .welfare_wrapper {
    .titleWrapper;
    .title_content_wel {
      display: flex;
      justify-content: space-between;
      .title {
        padding-bottom: 0.2333rem;
        padding-top: 0.2667rem;
        .icon {
          width: 0.9333rem;
          height: 0.9333rem;
          margin-right: 0.16rem;
        }
        .title();
        .shop_title {
          .homeTitle;
          padding-top: 0.25rem;
        }
        .desc {
          .titleDesc;
          padding-top: 0.22rem;
        }
      }
      .more {
        .letter {
          margin-right: 0.45rem;
          margin-top: 0.3rem;
          width: 0.8333rem;
          height: 0.6667rem;
        }
      }
    }
    .advertise_wrapper {
      position: relative;
      .close {
        width: 0.32rem;
        height: 0.3467rem;
        position: absolute;
        top: 1.4667rem;
        right: 0.4267rem;
      }
      .advertise {
        height: 3.1467rem;
      }
    }
    .welfare_content {
      margin-top: 0.1rem;
      .welfare_list {
        padding: 0 0.2667rem;
        .item {
          height: 2.6667rem;
          .left {
            float: left;
            width: 2.8533rem;
            height: 2.1333rem;
            .shopPic {
              width: 100%;
              height: 100%;
            }
          }
          .center {
            float: left;
            margin-left: 0.2667rem;
            .title {
              font-size: 0.3733rem;
              color: #333;
              font-weight: bold;
            }
            .desc {
              margin-top: 0.1rem;
              color: #8f8f8f;
              font-size: 0.32rem;
            }
            .limit {
              margin-top: 0.16rem;
              color: #8f8f8f;
              font-size: 0.2667rem;
            }
            .price {
              margin-top: 0.1rem;
              .discount_p {
                color: #ff3131;
                font-size: 0.3467rem;
                margin-right: 0.4267rem;
              }
              .origin_p {
                color: #8f8f8f;
                font-size: 0.3467rem;
              }
            }
          }
          .right {
            margin-top: 1.4rem;
            position: relative;
            .thunb_box {
              .thumb {
                width: 0.4rem;
                height: 0.4rem;
                float: left;
                margin-right: 0.1333rem;
              }
              .count {
                width: 100%;
                text-align: center;
                color: #8f8f8f;
                font-size: 0.3467rem;
                position: absolute;
                top: -1.5rem;
                right: 0.0333rem;
              }
              .booking_btn {
                width: 1.4667rem;
                padding: 0.1067rem 0;
                text-align: center;
                line-height: 0.5067rem;
                background: -webkit-linear-gradient( left, #fff800, #fef200, #fccc00, #fbbc00);
                color: #1d1d1d;
                border-radius: 0.08rem;
              }
            }
            .show_detail_btn {
              width: 1.4667rem;
              padding: 0.1067rem 0;
              text-align: center;
              line-height: 0.5067rem; // background: @baseColor;
              background: -webkit-linear-gradient( left, #fff800, #fef200, #fccc00, #fbbc00);
              color: #1d1d1d;
              border-radius: 0.08rem;
            }
          }
        }
      }
    }
  }
</style>
