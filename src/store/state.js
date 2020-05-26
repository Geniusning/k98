const state = {
    focusThumbTimes:30,   //关注的用户点赞次数
    unfocusThumbTimes:10,//未关注用户的点赞次数
    focusPlayTimes:30,  //关注用户的约战次数
    unfocusPlayTimes:10, //未关注用户的约战次数
    qrCodeTextObj:{
        title:"长按关注公众号",
        bottomText:"长按关注享受会员特权：领福利、交朋友"
    },
    qrCode:"",//二维码
    l98Setting:{},//C端功能控制
    baseUrl: "", //公众号地址
    isShow: false, //控住手机验证码弹框
    qrIsShow: false, //控制关注二维码弹框
    lifeImgList: [],
    userInfo: {},
    giftList: [],
    shareUrl: "",
    test: "",
    inAndOutFriendCursor: 0, //拉取场内场外好友的游标
    position: {},
    friendList: [], //候选人列表
    alreadyFriendList: [], //已经成为好友列表
    friendEvtList: [], //好友点赞事件列表
    friendGiftList: [], //好友送礼列表
    captainMessageList: [], //店长信息列表
    challengeGameList: [], //约战信息列表
    dynamicFriendEvt: {}, //好友事件消息框
    alreadyFriendListcursor: 0, //聊天记录游标
    badgeCount: 0, //总未读消息数量
    msg_badgeCount: 0, //未读消息数量
    event_badgeCount: 0, //好友事件未读消息
    gift_badgeCount: 0, //送礼事件未读消息
    game_badgeCount: 0, //约战事件未读消息
    client_badgeCount:0,// 客服未读消息
    divide_badgeCount:0,//分身未读消息
    manualEventsList_badgeCount:0,//约战，送礼，点赞未读消息数量
    staticChatFriendObj: {}, //拉取列表时候的聊天对象信息
    chatFriendObj_id: "", //动态获取聊天对象的id
    LastChatMsg: {}, //聊天列表
    clientLastChatMsg:{},//客服推送消息
    inputValue: "", //聊天输入框内容
    socket: null,
    friendListCursor: 0, //候选人浮标
    activityNoticeList: [], //福利活动中心
    shopSettingInfo: {}, //门店信息
    noCouponsFlag: false, //判断是否还有邀请有礼优惠券分享
    AdvertisingPhoto: [], //首页轮播图
    messType: "", //判断消息类型
    recommentList: [], //店长推荐列表
    sendGiftList:[],//积分兑换礼品列表
    topUpGiftInfo:{}, //送礼弹框
    topUpThumbInfo:{}, //点赞弹框
    topUpGameInfo:{},  //游戏弹框
    allMutatualInfo:{}, //送礼、约战、点赞 结构体
    loadFriendSexType:"", //拉取候选人性别参数
    friendPanelFlag:false, //配对成功弹框
    soulSwitch:false,
    soulFriInfo:{},
    messageQueue:[], //消息队列
    topUpMessage:"",//
    sameDeskInfo:{},
}

export default state