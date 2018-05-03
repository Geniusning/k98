/*
 * @Author: nicky 
 * @Date: 2018-04-12 15:44:17 
 * @Last Modified by: nicky
 * @Last Modified time: 2018-04-26 15:48:09
 */
let util = {};
//路由跳转
util.routerTo = function (route, vm,param) {
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
            console.log(this.responseText);
            console.log('loginbackbakckckckckckckckckkc')
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
            console.log(this.responseText);
            console.log('backbakckckckckckckckckkc')
            var res = JSON.parse(this.responseText)
            localStorage.setItem('trOpenId', res.data.openId)
            WcLogin(res.data.openId)
        }
    });
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data = "code=" + code + "&appId=wx2684abab04c7017d";
    xhr.send(data);
}
export default util