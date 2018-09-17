const state = {
    isShow: false,
    userInfo: {},
    giftList: [],
    shareUrl: "",
    test: "",
    inAndOutFriendCursor: 0, //拉取场内场外好友的游标
    position: {},
    friendList: [], //候选人列表
    alreadyFriendList: [], //已经成为好友列表
    friendEvtList: [], //好友事件列表
    dynamicFriendEvt: {}, //好友事件消息框
    alreadyFriendListcursor: 0, //聊天记录游标
    badgeCount: 0, //总未读消息数量
    msg_badgeCount: 0, //未读消息数量
    event_badgeCount: 0, //好友事件未读消息
    staticChatFriendObj: {}, //拉取列表时候的聊天对象信息
    chatFriendObj_id: "", //动态获取聊天对象的id
    LastChatMsg: {}, //聊天列表
    inputValue: "", //聊天输入框内容
    socket: null,
    friendListCursor: 0, //候选人浮标
    activityNoticeList: [], //福利活动中心
    shopSettingInfo: {}, //门店信息
    noCouponsFlag: true, //判断是否还有邀请有礼优惠券分享
}

export default state