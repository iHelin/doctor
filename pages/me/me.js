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

    onShow() {
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

    login() {
        wx.getUserInfo({
            success: (result) => {
                let userInfo = result.userInfo;
                wx.login({
                    success: async (res) => {
                        const result = await request('proxy/wechat/login', {
                            code: res.code,
                            nickname: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        }, 'POST');
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
        const result = await request('proxy/me', {}, 'get');
        if (result.code === 0) {
            this.setData({
                id: result.data.id,
                nickname: result.data.nickname,
                avatarUrl: result.data.avatarUrl
            });
            this.checkBinding(result.data);
        } else {
            wx.removeStorageSync('token');
            this.login();
        }
    },
    checkBinding(data) {
        if (data.binding) {
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
