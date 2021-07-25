/*
 * @Author: nicky
 * @Date: 2018-04-12 15:44:17
 * @Last Modified by: liuning
 * @Last Modified time: 2021-01-27 17:55:25
 */
import api from 'common/api'
import Config from 'common/config.js'
let util = {};
//路由跳转
util.routerTo = function (route, vm, param) {
  vm.$router.push({
    name: route,
    params: param
  });
}
//匹配微信的网页授权的code
util.requesturl = function (attr) {
  var reg = new RegExp("(^|&)" + attr + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2].toString());
  return null;
}

//微信登陆，把openid传给后端
util.WcLogin = function (openId) {
  xhr = new XMLHttpRequest()
  xhr.open('POST', "http://m.tairunmh.com/mobile/user/app/login", true)
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      //console.log(this.responseText);
      //console.log('loginbackbakckckckckckckckckkc')
      var result = JSON.parse(this.responseText)
      if (result.status == 1) {
        sessionStorage.setItem('loginStatus', 1)
      } else {
        sessionStorage.setItem('loginStatus', 0)

      }
    }
  });
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  var data = "openId=" + openId + "&type=weixin"
  xhr.send(data);
  var img = document.createElement('img')
}

//微信code 获取 openid
util.GetOpenIdByCode = function (code) {
  xhr = new XMLHttpRequest()
  xhr.open('POST', "http://m.tairunmh.com/mobile/mooncake/queryOpenIdByCode", true)
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      //console.log(this.responseText);
      //console.log('backbakckckckckckckckckkc')
      var res = JSON.parse(this.responseText)
      localStorage.setItem('trOpenId', res.data.openId)
      WcLogin(res.data.openId)
    }
  });
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  var data = "code=" + code + "&appId=wx2684abab04c7017d";
  xhr.send(data);
}
//比较日期前后
util.compareDate = (beginDate, endDate) => {
  // //console.log(beginDate, endDate)
  let d1 = new Date(beginDate.replace(/\-/g, "\/"))
  let d2 = new Date(endDate.replace(/\-/g, "\/"))
  if (beginDate != "" && endDate != "" && d1 > d2) {
    return false
  }
  return true
}
//时间戳转化成地址  格式xxxx-xx-xx xx-xx-xx
util.timestampToTime = function (timestamp) {
  // //console.log("timestamp----------------",timestamp)
  if (timestamp == 0) {
    return null
  }
  if (typeof timestamp == "string") {
    return timestamp
  }
  timestamp = Number(timestamp);
  // //console.log(timestamp.toString().length)
  if (timestamp.toString().length > 11) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10) ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + ":" : date.getMinutes() + ':';
    var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    // //console.log("处理后的时间----------",Y + M + D + h + m + s)
    return Y + M + D + h + m + s;
  } else {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10) ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + ":" : date.getMinutes() + ':';
    var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    // //console.log("处理后的时间----------",Y + M + D + h + m + s)
    return Y + M + D + h + m + s;

  }
}
util.timestampToTimeNoLine = function (timestamp) {
  if (typeof timestamp != "number") { //如果传入的不是整型就提示
    // console.error('传入的数据不是Number类型')
    return timestamp;
  }
  timestamp = Number(timestamp);
  if (timestamp.toString().length > 11) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = (date.getDate() < 10) ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + ":" : date.getMinutes() + ':';
    var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  } else {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + ''; //+''转字符串
    var M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var D = (date.getDate() < 10) ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + ":" : date.getMinutes() + ':';
    var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;

  }
}
//时间格式 07-12 10:00
util.timestampToTimeNoYear = function (timestamp) {
  if (typeof timestamp != "number") { //如果传入的不是整型就提示
    // console.error('传入的数据不是Number类型')
    return timestamp;
  }
  timestamp = Number(timestamp);
  if (timestamp.toString().length > 11) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10) ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + "" : date.getMinutes();
    return M + D + h + m;
  } else {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10) ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    return M + D + h + m;
  }
}
//计算上线时间
util.calcOnlineTime = function (visitime) {
  let day = Math.floor(visitime / 86400);
  if (visitime > 60 && visitime < 3600) {
    return Math.floor(visitime / 60) + "分钟前上线"
  } else if (visitime > 3600 && visitime < 86400) {
    return Math.floor(visitime / 3600) + "小时前上线"
  } else if (day <= 366 && day >= 1) {
    return Math.ceil(day) + "天前上线"
  } else {
    return "刚刚上线"
  }
}
util.returnDiscountType = (discountTypeNumber) => {
  if (parseInt(discountTypeNumber) === 0) {
    return "现金券"
  } else if (parseInt(discountTypeNumber) === 1) {
    return "实物券"
  } else if (parseInt(discountTypeNumber) === 2) {
    return "折扣券"
  } else if (parseInt(discountTypeNumber) === 3) {
    return "兑换券"
  } else if (parseInt(discountTypeNumber) === 4) {
    return "满减券"
  } else if (parseInt(discountTypeNumber) === 5) {
    return "月卡券"
  } else if (parseInt(discountTypeNumber) === 6) {
    return "次卡券"
  } else if (parseInt(discountTypeNumber) === 7) {
    return "团购券"
  }
}
//添加页面访问轨迹
util.addVisitRecord = function (pageName) {
  api.addVisitRecord(pageName).then(res => {
    console.log("访问轨迹收集结果---", res)
  })
}
//分享获得积分
util.shareGetJifen = function (amount, shareType) {
    api.shareToGetIntegral(amount, shareType).then(res => {
      if (res.errCode == 1030) {
        alert("分享已上限，每天最多分享5次获得积分");
      }
    });
  },
  //判断当前时间是否在某一时间段
  util.isDuringTime = function (beginTime, endTime, isNextDay) {
    var dealBeginTime //处理后的开始时间
    var dealEndTime //处理后的结束时间
    var todayYear
    var todayMon
    var todayDate
    var tomorrowTimeStamp
    todayYear = new Date().getFullYear()
    todayMon = new Date().getMonth() + 1
    todayDate = new Date().getDate()
    if (isNextDay === 1) {
      let today0Time = new Date().setHours(0, 0, 0) //设置当天凌晨零时零分
      tomorrowTimeStamp = today0Time + 86400000 //设置第二天零点零分
      tomorrowYear = new Date(tomorrowTimeStamp).getFullYear()
      tomorrowMonth = new Date(tomorrowTimeStamp).getMonth() + 1
      tomorrowDate = new Date(tomorrowTimeStamp).getDate()
      dealEndTime = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDate + " " + endTime
    } else {
      dealEndTime = todayYear + "-" + todayMon + "-" + todayDate + " " + endTime
    }
    dealBeginTime = todayYear + "-" + todayMon + "-" + todayDate + " " + beginTime
    if (new Date().getTime() >= new Date(dealBeginTime) && new Date().getTime() <= new Date(dealEndTime)) {
      return true
    } else {
      return false
    }
  },
  //时间增加5分钟
  util.addMin = function (srcTime, sec = 300) {
    var todayYear
    var todayMon
    var todayDate
    var srcTimeStamp
    todayYear = new Date().getFullYear()
    todayMon = new Date().getMonth() + 1
    todayDate = new Date().getDate()
    srcTime = todayYear + "-" + todayMon + "-" + todayDate + " " + srcTime
    srcTimeStamp = new Date(srcTime).getTime() + sec * 1000
    return new Date(srcTimeStamp).getHours() + ":" + (new Date(srcTimeStamp).getMinutes() > 10 ? new Date(srcTimeStamp).getMinutes() : "0" + new Date(srcTimeStamp).getMinutes()) +
      ":" + (new Date(srcTimeStamp).getSeconds() > 10 ? new Date(srcTimeStamp).getSeconds() : "0" + new Date(srcTimeStamp).getSeconds())
  },
  // jssdk签名
  util._getJssdkConfig = function (url) {
    // let windowUrL = `https://${window.location.host}${window.location.pathname}`
    api.getJssdkInfo(`/api/loadJSSDKParams?url=` + encodeURIComponent(url))
      .then(res => {
        console.log("获取微信jssdk---------", res)
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["openLocation", "getLocation", "onMenuShareAppMessage",
            "chooseImage", "onMenuShareTimeline",
            "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice",
            "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"
          ]
        });
        wx.error(function (res) {
          console.log("wx.error 验证失败", res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      })
  }
//分享配置
util.setShareInfo = function (shareObj, amount, shareType, fn) {
  shareType = shareType || "activity"
  if (util.isAndroid()) {
    console.log("是安卓")
    let url = window.location.href.split("#")[0]
    // let windowUrL = `https://${window.location.host}${window.location.pathname}`
    api.getJssdkInfo(`/api/loadJSSDKParams?url=` + encodeURIComponent(url))
      .then(res => {
        console.log("获取微信jssdk---------", res)
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["openLocation", "getLocation", "onMenuShareAppMessage",
            "chooseImage", "onMenuShareTimeline",
            "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice",
            "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"
          ]
        });
        wx.ready(() => {
          wx.onMenuShareAppMessage({ //分享好友
            title: shareObj.title,
            desc: shareObj.desc,
            link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareObj.imgUrl,
            success: () => {
              //分享朋友记录
              //console.log("分享好友")
              api.createShareDaylog("friend")
              //分享获得积分
              fn(amount, shareType)

            }
          });
          wx.onMenuShareTimeline({ //朋友圈
            title: shareObj.title, // 分享标题
            desc: shareObj.desc,
            link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareObj.imgUrl, // 分享图标
            success: () => {
              // 用户点击了分享后执行的回调函数
              //分享朋友圈记录
              //console.log("分享朋友圈")
              fn(amount, shareType)
              api.createShareDaylog("timeLine")
            }
          })
        })
        wx.error(function (res) {
          console.log(res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      })
  } else {
    // console.log("apple 进来了")
    wx.onMenuShareAppMessage({ //分享好友
      title: shareObj.title,
      desc: shareObj.desc,
      link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareObj.imgUrl,
      success: () => {
        //分享朋友记录
        //console.log("分享好友")
        if (shareType !== "groupShop") {
          api.createShareDaylog("friend")
          //分享获得积分
          fn(amount, shareType)
          console.log("apple 进来了 success friend")
        }
      }
    });
    wx.onMenuShareTimeline({ //朋友圈
      title: shareObj.title, // 分享标题
      link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareObj.imgUrl, // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
        //分享朋友圈记录
        //console.log("分享朋友圈")
        if (shareType !== "groupShop") {
          fn(amount, shareType)
          api.createShareDaylog("timeLine")
          console.log("apple 进来了 success timeLine")
        }
      }
    })

    //---------------------------------  新分享
    // wx.updateAppMessageShareData({
    //   title: shareObj.title, // 分享标题
    //   desc: shareObj.desc, // 分享描述
    //   link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: shareObj.imgUrl, // 分享图标
    //   success: function () {
    //     // 设置成功
    //   }
    // })

    // wx.updateTimelineShareData({
    //   title: shareObj.title, // 分享标题
    //   link: shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: shareObj.imgUrl, // 分享图标
    //   success: function () {
    //     // 设置成功
    //   }
    // })
  }
}
//获取cookie
util.getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//获取url参数
util.GetQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return "";
};
//判断安卓或者苹果
util.isAndroid = function () {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return true;
  }
  if (isiOS) {
    return false;
  }
}
util.isIphonex = () => {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }
  return false;
}
util.sortByKey = function (key) {
  return function (obj1, obj2) {
    var v1 = obj1[key]
    var v2 = obj2[key]
    return v2 - v1
  }
}
util.sortByKeyS2L = function (key) {
  return function (obj1, obj2) {
    var v1 = obj1[key]
    var v2 = obj2[key]
    return v1 - v2
  }
}
util.prefixZero = function (num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}
util.returnDiscountContent = function (coupon) {
  if (parseInt(coupon.type) === 0) {
    return coupon.value + "元"
  } else if (parseInt(coupon.type) === 1) {
    return coupon.content
  } else if (parseInt(coupon.type) === 2) {
    return coupon.value + "折"
  } else if (parseInt(coupon.type) === 3) {
    return coupon.content
  } else if (parseInt(coupon.type) === 4) {
    return coupon.content
  } else if (parseInt(coupon.type) === 5) {
    return coupon.content
  } else if (parseInt(coupon.type) === 6) {
    return coupon.content
  } else if (parseInt(coupon.type) === 7) {
    return coupon.content
  }
}
util.hasClass = (element, className) => {
  var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
  return element.className.match(reg);
}
util.addClass = (element, className) => {
    if (!util.hasClass(element, className)) {
      element.className += " " + className;
    }
  },
  util.removeClass = (element, className) => {
    if (util.hasClass(element, className)) {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      element.className = element.className.replace(reg, " ");
    }
  }
util.getShortDistance = (lon1, lat1, lon2, lat2) => {
  var DEF_PI = 3.14159265359; // PI
  var DEF_2PI = 6.28318530712; // 2*PI
  var DEF_PI180 = 0.01745329252; // PI/180.0
  var DEF_R = 6370693.5; // radius of earth
  var ew1, ns1, ew2, ns2;
  var dx, dy, dew;
  var distance;
  // 角度转换为弧度
  ew1 = lon1 * DEF_PI180;
  ns1 = lat1 * DEF_PI180;
  ew2 = lon2 * DEF_PI180;
  ns2 = lat2 * DEF_PI180;
  // 经度差
  dew = ew1 - ew2;
  // 若跨东经和西经180 度，进行调整
  if (dew > DEF_PI)
    dew = DEF_2PI - dew;
  else if (dew < -DEF_PI)
    dew = DEF_2PI + dew;
  dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
  dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
  // 勾股定理求斜边长
  distance = Math.sqrt(dx * dx + dy * dy).toFixed(0);
  console.log(distance)
  return distance;
}
export default util
