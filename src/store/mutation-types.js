
//设置搜索群友带上svip参数
export const SETSEARCHFORSVIP = "SETSEARCHFORSVIP"
//保存供求发布者id
export const SAVEPUBLISHERID = "SAVEPUBLISHERID"
//保存往期照片数据
export const SAVEOLDPHOTOS = "SAVEOLDPHOTOS"
//更新灵魂匹配参数
export const UPDATESOULPARAMS = "UPDATESOULPARAMS"
//存储买单收款码
export const SAVECHECKQRCODE = "SAVECHECKQRCODE"
//存储桌贴号
export const CHANGEENVELOPECONTENT = "CHANGEENVELOPECONTENT"
//存储桌贴号
export const SAVEDESKCODE = "SAVEDESKCODE"
//存储员工送券活动
export const GETSTAFFCOUPONINFO = "GETSTAFFCOUPONINFO"

//累加分身未读消息
export const ADDDIVIDENUM = "ADDDIVIDENUM"
//统计分身未读消息
export const ADDDIVIDEUNREADMSG = "ADDDIVIDEUNREADMSG"
//获得同一个桌贴的游戏信息
export const GETSAMEDESKINFO = "GETSAMEDESKINFO"
//select message at start
export const SELECTMESSAGEFROMQUEUE = "SELECTMESSAGEFROMQUEUE"
//清除消息队列里删除的消息
export const CLEARTOPUPMESSAGE = "CLEARTOPUPMESSAGE"
//add message into queue
export const ADDMESSAGEQUEUE = "ADDMESSAGEQUEUE"
//delete message from queue
export const DELMESSAGEQUEUE = "DELMESSAGEQUEUE"
//清楚所有弹窗data
export const CLEARTOPUPDATA = "CLEARTOPUPDATA"
//切换灵魂匹配模式
export const SWITCHSOULFLAG = "SWITCHSOULFLAG"
//修改未关注用户的约战次数
export const CHANGEUNFOCUSPLAYTIMES = "CHANGEUNFOCUSPLAYTIMES"
//修改关注用户的约战次数
export const CHANGEFOCUSPLAYTIMES = "CHANGEFOCUSPLAYTIMES"
//修改未关注用户的点赞次数
export const CHANGEUNFOCUSTHUMBTIMES = "CHANGEUNFOCUSTHUMBTIMES"
//修改关注用户的点赞次数
export const CHANGEFOCUSTHUMBTIMES = "CHANGEFOCUSTHUMBTIMES"
//修改二维码图片上下文字
export const CHANGEQRCODETEXT = "CHANGEQRCODETEXT"
//保存二维码
export const SAVEQRCODE = "SAVEQRCODE"
//收银消息推送
export const UPDATE_CASHIERMSG = "UPDATE_CASHIERMSG"
//客服消息推送
export const UPDATE_CLIENTMSG = "UPDATE_CLIENTMSG"
//统计客服未读消息数量
export const GETCLIENTUNREADCOUNT = "GETCLIENTUNREADCOUNT"
//统计收银未读消息数量
export const GETCASHIERUNREADCOUNT = "GETCASHIERUNREADCOUNT"
//C端功能控制
export const L98OTHERSETTING = "L98OTHERSETTING"
//回赞成功后更新好友页面图标显示
export const CHANGEFRIENDICON = "CHANGEFRIENDICON"
//更改配对成功标识符
export const CHANGEFRIENDPANELFLAG = "CHANGEFRIENDPANELFLAG"
//修改请求候选人男女标识
export const CHANGESEXTYPE = "CHANGESEXTYPE"
//统计约战，送礼，点赞数量
export const GET_ALLEVENTS_BADGECOUNT = "GET_ALLEVENTS_BADGECOUNT"
//新增送礼弹框内容
export const ADD_GIFTINFO = "ADD_GIFTINFO"
//获取店长推荐列表
export const GET_RECOMMENTLIST = "GET_RECOMMENTLIST"
//获取积分换礼品列表
export const GET_SENDGIFTLIST = "GET_SENDGIFTLIST"
//判断消息类型
export const JUDGE_MESSTYPE = "JUDGE_MESSTYPE"
//获得公众号地址
export const GET_URL = "GET_URL"
//手机验证码弹框
export const CHANGE_VALIDATE = "CHANGE_VALIDATE"

//关注二维码弹框
export const SHOW_QRCODE = "SHOW_QRCODE"
//获得用户生活照
export const GET_LIFEIMG = "GET_LIFEIMG"
//更改用户生活照
export const CHANGE_LIFEIMG = "CHANGE_LIFEIMG"

//删除生活照
export const DELETE_LIFEIMG = "DELETE_LIFEIMG"

//获取用户信息
export const GET_USERINFO = "GET_USERINFO"

// 地理位置
export const GET_POSITION = "GET_POSITION"

//获取候选人数据
export const GET_FRIENDlIST = "GET_FRIENDlIST"

//获取更多候选人数据
export const GET_MOREFRIENDlIST = "GET_MOREFRIENDlIST"

//获取不足10个候选人数据
export const GET_LESSTHAN10FRIENDLIST = "GET_LESSTHAN10FRIENDLIST"

//获取好友点赞列表
export const GET_FRIENDEVTLIST = "GET_FRIENDEVTLIST"

//获取好友送礼列表
//export const GET_FRIENDGIFTLIST = "GET_FRIENDGIFTLIST"

//获取约战列表
//export const GET_CHALLENGEGAMELIST = "GET_CHALLENGEGAMELIST"

//清空约战列表
export const CLEAR_CHALLENGEGAMELIST = "CLEAR_CHALLENGEGAMELIST"

//获取店长消息列表
export const GET_CAPTAINMESSAGELIST = "GET_CAPTAINMESSAGELIST"

//获取已经成为好友事件
export const GET_ALREADYFRIENDEVTLIST = "GET_ALREADYFRIENDEVTLIST"

//获取聊天对方的信息
export const SET_CHAT_FRIEND = "SET_CHAT_FRIEND"

//更新聊天列表
export const UPDATE_CHATLIST = "UPDATE_CHATLIST"

//更新聊天输入框内容
export const UPDATE_INPUTVALUE = "UPDATE_INPUTVALUE"

//初始化长连接
export const CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET"

//游标的变化
export const CHANGE_CURSOR = "CHANGE_CURSOR"

//推送最后一个消息跟已有好友消息列表对比
export const COMPARE_LASTMESS = "COMPARE_LASTMESS"

//新增推送好友事件列表
export const ADD_FRIENDEVTLIST = "ADD_FRIENDEVTLIST"

//发送好友事件消息框
export const UPDATE_DYNAMICMESSAGE = "UPDATE_DYNAMICMESSAGE"

//更改场内场外好友的游标
export const UPDATE_INANDOUT_FRIEND_CURSOR = "UPDATE_INANDOUT_FRIEND_CURSOR"

//获取新消息时重新排列消息列表，把最新的一项放到顶部
export const TO_TOP_MESSAGE = "TO_TOP_MESSAGE"

//更改分享链接
export const UPDATE_SHAREURL = "UPDATE_SHAREURL"

//获取活动通知
export const GET_ACTIVITY_NOTICE = "GET_ACTIVITY_NOTICE"

//判断邀请有礼是否还有
export const JUDGE_INVITE_COUPON = "JUDGE_INVITE_COUPON"

//获取门店信息
export const GET_SHOPINFO = "GET_SHOPINFO"

//更改候选人浮标
export const CHANGE_FRIENDlISTCURSOR = "CHANGE_FRIENDlISTCURSOR"
//动态获取聊天对象
// export const GET_DYNAMICFRIENDOBJ = "GET_DYNAMICFRIENDOBJ"
//获取礼物
export const GET_GIFTLIST = "GET_GIFTLIST"

//获取首页轮播图
export const GET_ADVERTISINGIMG = "GET_ADVERTISINGIMG"

//所有未读消息badge自增
export const ADD_BADGE = "ADD_BADGE"

export const TEST = "TEST"