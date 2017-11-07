//app.js
var wxCache = require('./utils/wxCache.js')
var wxRequest = require('./utils/wxRequest.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    //console.log(wxCache.getCache('token'))

    var wxUserInfo = function () {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                setWxUserInfo(res.userInfo)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    }

    var login = function (){
      wx.login({
        success: res => {
          if (res.code) {
            wxRequest.get(
              '/api/login',
              {code: res.code},
              function(data){
                console.log(data);
              },
              function() {
                console.log('登录异常！')
              }
            )
          } else {
            console.log('获取用户登录态失败！');
          }
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    }

    var setWxUserInfo = function(userInfo) {
      console.log(userInfo);
      //var token = wxCache.getCache('token');
      // wxRequest.get()
      // wxRequest.post(userInfo)
    }
    
    var token = wxCache.getCache('token');
    if (token) {
      wx.checkSession({
        success: function(res) {

        },
        fail: function() {

        }
      })
    } else {
      login()
    }

    

    wx.checkSession({
      success: function(res){
        // console.log(res);
        // wx.getUserInfo({
        //   success: res => {
        //     console.log(res);
        //   }
        // });
      },
      fail: function(){
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'https://yqplan.com/api/login',
                data: { code: res.code },
                method: 'GET',
                dataType: 'json',
                success: function (res) {
                  console.log(res);
                },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              console.log('获取用户登录态失败！');
            }
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      }
    })
    
    // 获取用户信息
  },
  globalData: {
    userInfo: null
  }
})