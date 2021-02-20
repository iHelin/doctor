let dateUtil = require('../../utils/util.js')
let app = getApp()
import request from '../../utils/request'


Page({
    data: {
        id: '',
        username: '',
        nickname: '',
        idCard: '',
        avatarUrl: '',
        hasLogin: false
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
            success: (result) => {
                let userInfo = result.userInfo;
                wx.login({
                    success: (res) => {
                        request('http://localhost:8888/wechat/login', {
                            code: res.code,
                            nickname: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        }, 'POST').then((result) => {
                            if (result.code === 0) {
                                this.setData({
                                    hasLogin: true,
                                    id: result.data.user.id,
                                    nickname: userInfo.nickName,
                                    avatarUrl: userInfo.avatarUrl
                                });
                                wx.setStorageSync('token', result.data.token);
                            }
                        }).catch((err) => {
                            console.log(err, "登录失败");
                        })
                    }
                })
            }
        })
    },

    onLoad() {
        let hasLogin = !!wx.getStorageSync('token');
        this.setData({
            hasLogin
        })
        if (hasLogin) {
            request('http://localhost:8888/wechat/me', {}, 'get').then((result) => {
                if (result.code === 0) {
                    this.setData({
                        id: result.data.id,
                        nickname: result.data.nickname,
                        avatarUrl: result.data.avatarUrl
                    });
                }
            }).catch((err) => {
                console.log(err, "获取信息失败");
            })
        } else {
            console.log('未登录');
        }
    },

    goto: function (id) {

    },

})
