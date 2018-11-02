/*
 * @Author: liu 
 * @Date: 2018-05-04 15:49:52 
 * @Last Modified by: nicky
 * @Last Modified time: 2018-10-30 17:51:27
 */

import axios from 'axios'
import Url from './url'

let api = {};
//获取用户信息
api.getUserInfo = function(path) {
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + path).then(res => {
            if (res.status == 200) {
                // console.log(res.data)
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取jssdk签名
api.getJssdkInfo = function(path) {
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + path).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//搜索朋友
api.getFriendList = function(cursor) {
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + '/api/searchCandidates?cursor=' + cursor).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//请求加好友
api.makeFriend = function(xid) {
    return new Promise((resolve, reject) => {
        axios.post(Url.commonUrl + "/api/makeFriend?xid=" + xid).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//拉取好友事件
api.loadFriendEvts = function(cursor) {
    return new Promise((resolve, reject) => {
        axios.post(Url.commonUrl + "/api/loadFriendEvts?cursor=" + cursor).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//回赞事件
api.giveBackThumb = function(type, flag) {
    return new Promise((resolve, reject) => {
        axios.post(Url.commonUrl + `/api/auditFriend?evtID=${type}&agree=${flag}`).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//获取好友列表
api.loadFriends = function(cursor) {
    return new Promise((resolve, reject) => {
        axios.post(Url.commonUrl + `/api/loadFriends?cursor=${cursor}`).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//发送聊天消息
api.postFriendMess = function(param) {
        return new Promise((resolve, reject) => {
            // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
            axios.post(Url.commonUrl + "/api/sendChatMsg", param).then((res) => {
                console.log(res)
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
    //发送聊天图片
api.postFriendPic = function(openId, fileName, param) {
        return new Promise((resolve, reject) => {
            // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
            axios.post(Url.commonUrl + `/api/sendImage?to=${openId}&fileName=${fileName}`, param).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
    //根据websocket返回来的信息拉取个人的聊天信息列表
api.getFriendMessList = function(cursor, who) {
    return new Promise((resolve, reject) => {
        // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
        axios.get(Url.commonUrl + `/api/loadChatMsg?cursor=${cursor}&who=${who}`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//标记用户已读
api.sendMsgReaded = function(who) {
        return new Promise((resolve, reject) => {
            // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
            axios.get(Url.commonUrl + `/api/setMsgRead?who=${who}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //修改个人信息头像
api.updateAvatar = function(fileName, param) {
        // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
        return new Promise((resolve, reject) => {
            axios.post(Url.commonUrl + `/api/updatePortrait?fileName=${fileName}`, param)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //上传生活照
api.updateLifePic = function(param) {
        return new Promise((resolve, reject) => {
            axios.post(Url.commonUrl + `/api/photoUpload`, param)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //保存个人信息修改
api.savePersonalInfo = function(param) {
    // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    return new Promise((resolve, reject) => {
        axios.post(Url.commonUrl + `/api/updateUserInfo`, param)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//获取场内场外人数
api.getInOutNum = function() {
    // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + `/api/loadInOutFieldNumber`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//拉取场内候选人
api.getLoadInsideCandidates = function(cursor) {
    // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + `/api/loadInsideCandidates?cursor=${cursor}`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//拉取场外候选人
api.getLoadOutsideCandidates = function(cursor) {
    // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + `/api/loadOutsideCandidates?cursor=${cursor}`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//用户拉取Ai优惠券
api.loadUserCoupons = function(channel) {
        return new Promise((resolve, reject) => {
            axios.get(Url.commonUrl + `/api/loadUserCoupons?channel=${channel}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取未领取的优惠券（登录公众号弹出优惠券，目前只有AI发送才有）
api.acquireWaitGetCoupons = function(channel) {
        return new Promise((resolve, reject) => {
            axios.get(Url.commonUrl + `/api/acquireWaitGetCoupons?channel=${channel}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取所有优惠券
api.loadUserAllCoupon = function() {
        return new Promise((resolve, reject) => {
            axios.get(Url.commonUrl + `/api/loadUserAllCoupon`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //微信支付
api.createOrder = function(goodsID) {
        return new Promise((resolve, reject) => {
            axios.get(Url.commonUrl + `/api/createOrder?goodsID=${goodsID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //标识已进入过公众号
api.clearFirstLoadTag = function() {
        return new Promise((resolve, reject) => {
            axios.get(Url.commonUrl + `/api/clearFirstLoadTag`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    // 获取比赛游戏房间ID
api.createRoom = function(tk, arenaID) {
        return new Promise((resolve, reject) => {
            axios.get(`http://llwant.test.qianz.com:3002/createRoom?tk=${tk}&gamePath=game2&arenaID=${arenaID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取游戏比赛场
api.loadArenas = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadArenas`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取已经发布的比赛场
api.loadPublishArenas = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadPublishArenas`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取比赛场排名
api.loadArenaRank = function(arenaID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadArenaRank?arenaID=${arenaID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取礼物
api.loadAllGift = function(arenaID) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/loadAllGift`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//发送礼物
api.sendGift = function(params) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/sendGift`, params)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取待领取的邀请有礼优惠券
api.loadInviteWaitGetCoupon = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadInviteWaitGetCoupon`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //分享出去后领取者调用的拉取优惠券
api.acquireInviteWaitGetCoupons = function(params) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/acquireInviteWaitGetCoupons`, params)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取单个优惠券信息
api.loadUserCouponByID = function(couponId) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/loadUserCouponByID?userCouponID=${couponId}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //C端主动发起核销发起
api.launchSetOffUserCoupon = function(couponId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/launchSetOffUserCoupon?userCouponID=${couponId}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取店长推荐
api.loadRecommends = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadRecommends`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取活动通知
api.loadActivityInfo = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadActivityInfo`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取门店信息
api.loadStoreSetting = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadStoreSetting`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取首页轮播图
api.loadAdvertisingPhoto = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadAdvertisingPhoto`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取礼物详情
api.loadWealthDetail = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadWealthDetail`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取游戏详情
api.LoadGameScoreDetail = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/LoadGameScoreDetail`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //加载活动详情
api.loadActivityDetail = function(activityID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadActivityDetail?activityID=${activityID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //签到
api.checkIn = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/checkIn`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取比赛按照结束时间重新排名
api.loadAllArenaInfo = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadAllArenaInfo`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    // 拉取每场比赛的前十名选手信息， 以及对应的奖品
api.loadArenaTopRank = function(arenaID, topNumber) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadArenaTopRank?arenaID=${arenaID}&topNumber=${topNumber}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //记录打电话
api.statCalls = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/statCalls`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //店长推荐预定
api.bookingRecommend = function(recommendID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/bookingRecommend?recommendID=${recommendID}`)
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //验证员工
api.verifyPhoneNumber = function(phone) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/verifyPhoneNumber?phone=${phone}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取每场比赛的前十名选手信息
api.loadArenaRanking = function(arenaID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadArenaRanking?arenaID=${arenaID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //赠送礼物申请成为好友  拉取收礼记录
api.loadGiftsRecord = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadGiftsRecord`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //感谢好友送礼  
api.thanksForGit = function(giftGiverID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/thanksForGit?targetID=${giftGiverID}&agree=yes`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取店长留言信息
api.loadManagerNoticeInfo = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadManagerNoticeInfo`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //约战
api.sentPlayGameMsg = function(toUserID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/sentPlayGameMsg?toUserID=${toUserID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拉取约战列表
api.loadInviteCombat = function() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/loadInviteCombat`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //拒绝约战
api.deleteInviteCombat = function(combatID) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/deleteInviteCombat?combatID=${combatID}`)
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    //创建二维码
api.createQrcode = function() {
    // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    return new Promise((resolve, reject) => {
        axios.get(Url.commonUrl + `/api/createQrcode`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

//拉取已经创建过的二维码
api.loadAllQrcode = function() {
    return new Promise((resolve, reject) => {
        // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
        axios.get(Url.commonUrl + `/api/loadAllQrcode`)
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
    })
}

export default api