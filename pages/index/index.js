//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
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
    toDetail: function(e) {
        var index = e.currentTarget.dataset.index;
    },
    copy:function(){
        wx.setClipboardData({
            data:'18321558223',
            success:function(){
                wx.showToast({
                    title: '复制成功'
                });
            }
        })
    }
})