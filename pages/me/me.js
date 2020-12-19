var dateUtil = require('../../utils/util.js')
var app = getApp()

Page({
    data: {
        accountID: Math.ceil(Math.random() * 100),
        nickName: '',
        msg: ''
    },
    onShow: function () {
        this.setData({
            nickName: wx.getStorageSync('nickName') || '随机用户'
        })
    },
    handleMsgChange(e) {
        this.setData({
            msg: e.detail.detail.value
        })
    },
    handleClick() {
        if (this.data.msg && this.data.nickName) {
            let headImgUrl = '';
            if (wx.getStorageSync('avatarUrl')) {
                headImgUrl = wx.getStorageSync('avatarUrl');
            } else {
                headImgUrl = 'http://iph.href.lu/100x100';
            }
            wx.request({
                url: app.globalData.request + '/msg/submit',
                method: 'post',
                data: {
                    nickName: this.data.nickName,
                    accountID: this.data.accountID,
                    headImgUrl: headImgUrl,
                    msg: this.data.msg
                },
                success: res => {
                    wx.showToast({
                        title: '提交成功',
                    })
                }
            })
        } else {

        }
    },

    onLoad: function () {

    },

    goto: function (id) {

    },

})
