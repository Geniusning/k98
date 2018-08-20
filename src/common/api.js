/*
 * @Author: liu 
 * @Date: 2018-05-04 15:49:52 
 * @Last Modified by: nicky
 * @Last Modified time: 2018-08-17 17:49:10
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
                console.log(res.data)
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
api.createOrder = function() {
        return new Promise((resolve, reject) => {
            axios.get(Url.commonUrl + `/api/createOrder`)
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
    // 获取游戏房间ID
api.createRoom = function(gamePath, token) {
        return new Promise((resolve, reject) => {
            axios.get(`http://llwant.test.qianz.com:3002/createRoom?gamePath=${gamePath}&arenaID=dc1dc692-0abf-4754-b856-806d4e3bc3c2&tk=${token}`)
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