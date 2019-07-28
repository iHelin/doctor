//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
          
        ],
        indicatorDots: true,
        autoplay: true,
        proList: [{
                logo: '/images/history_1.png',
                title: 'dwed',
                desc: 'sdcsav'
            },
            {
                logo: '/images/history_1.png',
                title: 'dwed',
                desc: 'sdcsav'
            }
        ]
    },
    onLoad: function() {

    },

    onShow: function() {

    },
    copy: function() {
        wx.setClipboardData({
            data: '18321558223',
            success: function() {
                wx.showToast({
                    title: '复制成功'
                });
            }
        })
    },
    login: function() {
        wx.login({
            success: res => {
                var code = res.code;
                console.log(code);
                if (code) {
                    wx.request({
                        url: app.globalData.request + '/wechat/login',
                        data: {
                            code: code
                        },
                        success: function(res) {
                            wx.showToast({
                                title: '登录成功'
                            });
                            wx.setStorageSync('loginKey', res.data);
                        },
                        fail: function(e) {
                            console.log(e);
                            wx.showToast({
                                title: '登录失败'
                            });
                        }
                    })
                } else {
                    wx.showToast({
                        title: '获取code失败'
                    });
                }
            }
        })
    },
    onGotUserInfo: function(res) {
        var userInfo = res.detail.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        wx.setStorageSync("nickName", nickName);
        wx.setStorageSync("avatarUrl", avatarUrl);
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
    },
    playMusic:function(){
        wx.playBackgroundAudio({
            dataUrl: 'https://www.ianhe.me/static/ShapeofYou.mp3',
            title: 'Shape of You',
            coverImgUrl: 'http://r1.ykimg.com/050E0000576B75F667BC3C136B06E4E7'
        })
    }
})