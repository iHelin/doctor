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
        let updateInfo = wx.getStorageSync('refresh');
        if (updateInfo) {
            this.getUserInfo();
            wx.removeStorageSync('refresh');
        }

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
                        wx.showLoading({
                            title: '登录中',
                            mask: true
                        });
                        request('proxy/wechat/login', {
                            code: res.code,
                            nickname: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        }, 'POST').then((result) => {
                            wx.hideLoading();
                            if (result.code === 0) {
                                this.setData({
                                    hasLogin: true,
                                    id: result.data.id,
                                    nickname: userInfo.nickName,
                                    avatarUrl: userInfo.avatarUrl
                                });
                                wx.setStorageSync('token', result.data.token);
                                this.checkBinding(result.data);
                            }
                        }).catch((err) => {
                            wx.hideLoading();
                            console.log(err, "登录失败");
                        })
                    }
                })
            }
        })
    },

    onLoad(options) {
        let hasLogin = !!wx.getStorageSync('token');
        this.setData({
            hasLogin
        })
        if (hasLogin) {
            this.getUserInfo();
        }
    },
    async getUserInfo() {
        await request('proxy/wechat/me', {}, 'get').then((result) => {
            if (result.code === 0) {
                this.setData({
                    id: result.data.id,
                    nickname: result.data.nickname,
                    avatarUrl: result.data.avatarUrl
                });
                this.checkBinding(result.data);
            }
        }).catch((err) => {
            console.log(err, "获取信息失败");
        })
    },
    checkBinding(data) {
        if (data.enabled) {
            wx.setStorageSync('username', data.username);
            wx.setStorageSync('idCard', data.idCard);
            wx.setStorageSync('telephone', data.telephone);
        } else {
            wx.showModal({
                title: '提示',
                content: '尚未绑定身份，请先绑定',
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/binding/binding'
                        })
                    }
                }
            })
        }
    }
})
