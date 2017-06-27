//app.js
/*
      App() 必须在 app.js 中注册，且不能注册多个。
      不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
      不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
      通过 getApp() 获取实例之后，不要私自调用生命周期函数。
*/

App({
  onLaunch: function (options) {
    //在启动时做一些初始的事情。
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getUserInfo();
  },
  onshow: function (options){
      //做某事时。
  },
  onHide: function () {
    //做某事时隐藏
  },
  onError: function (msg) {
    //做某事时。
  },
  globalData: 'getApp() 获取app()方法',
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
});

if (wx.openBluetoothAdapter) {
  //对于新增的 API，可以用以下代码来判断是否支持用户的手机。
  wx.openBluetoothAdapter();
} else {
  // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
  wx.showModal({
    title: '提示',
    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
    success:function(res){
      console.log(res);
      if (wx.canIUse('showModal.cancel')) {
        console.log(res.cancel);//取消和确定
      }
    }
  })
}