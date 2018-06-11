const state = {
    isShow: false,
    userInfo: {},
    test: "",
    position: {},
    friendList: [],//候选人列表
    alreadyFriendList: [],//已经成为好友列表
    friendEvtList: [],//好友事件列表
    cursor: 0,
    badgeCount: 0,
    staticChatFriendObj: {},//拉取列表时候的聊天对象信息
    chatFriendObj_id: "",//动态获取聊天对象的id
    LastChatMsg: {},//聊天列表
    inputValue: "",   //聊天输入框内容
    socket: null,
}

export default state