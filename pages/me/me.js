let dateUtil = require('../../utils/util.js')
let app = getApp()
import request from '../../utils/request'


Page({
    data: {
        username: '',
        idCard: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        accountID: Math.ceil(Math.random() * 100),
        nickName: '',
        msg: ''
    },
    onShow: function () {
        let username = wx.getStorageSync('username');
        let idCard = wx.getStorageSync('idCard');
        this.setData({
            username,
            idCard
        })
    },

    bindGetUserInfo() {
        wx.getUserInfo({
            success(result) {
                let userInfo = result.userInfo
                wx.login({
                    success: (res) => {
                        request('http://localhost:8080/users/login', {
                            code: res.code,
                            wxNickname: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        }, 'POST').then((res) => {
                            console.log(res, "登录成功");
                        }).catch((err) => {
                            console.log(err, "登录失败");
                        })
                    }
                })
            }
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

    onLoad() {

    },

    goto: function (id) {

    },

})
