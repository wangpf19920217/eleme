// pages/wode/index.js
var appInstance = getApp()
console.log(appInstance.globalData) //全局属性
//不同的文件中可以声明相同名字的变量和函数，不会互相影响


// 可以使用第三方js   调用全局库 用require  另一边用modoul.expret 抛出
var commonJs = require('../common/common.js');
commonJs.log('我是全局js的方法  这里最先执行了')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexdata:{
      title:'首页'
    },
    scrollTop: 100,
    headertxt:'我是头部',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  globalData:'首页',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1页面加载onLoad');
      wx.login({
        success: function (res) {
          /*
          用户允许登录后，回调内容会带上 code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，使用code 换取 session_key api，将 code 换成 openid 和 session_key
          */ 
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
              data: {
                code: res.code
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('3dom加载完成onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('2生命周期函数--监听页面显示onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('生命周期函数--监听页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('监听页面关闭')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('页面相关事件处理函数--监听用户下拉动作')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('用户转发')
  },
  route: function () {
    console.log('当前的路径')
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: 'asdasdasdas',
      path: '/page/index', //当前页面 path ，必须是以 / 开头的完整路径
      success:function(res){
         console.log('转发成功')
      },
      fail: function (res) {
        // 转发失败
      }
    }
    /*
      只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
      用户点击转发按钮的时候会调用
      此事件需要 return 一个 Object，用于自定义转发内容
    */
  },
  defined: function () {
    //以下都是自定义事件  对应页面元素绑定的事件名
    console.log('开发者可以添加任意的函数或数据到 object 参数中，在页面的函数中用 this 可以访问')
  },
  viewTap: function () {
    this.setData({ headertxt: '替换头部' })
  },
  titleclick: function (event){
    console.log(event.currentTarget.dataset.info)
  }
})


//直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致
//单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
 

