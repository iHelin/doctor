let app = getApp();
import request from "../../utils/request";

Page({
    data: {
        hasLogin: false,
    },
    onLoad(options) {},
    onShow() {
        if (wx.getStorageSync("token")) {
            this.setData({
                hasLogin: true,
            });
            this.getUserInfo();
        } else {
            this.setData({
                hasLogin: false,
            });
        }

        let updateInfo = wx.getStorageSync("refresh");
        if (updateInfo) {
            this.getUserInfo();
            wx.removeStorageSync("refresh");
        }
    },
    login() {
        wx.getUserInfo({
            success: (result) => {
                let userInfo = result.userInfo;
                wx.login({
                    success: async (res) => {
                        const result = await request(
                            "proxy/wechat/login",
                            {
                                code: res.code,
                                nickname: userInfo.nickName,
                                avatarUrl: userInfo.avatarUrl,
                            },
                            "POST"
                        );
                        if (result.code === 0) {
                            this.setData({
                                hasLogin: true
                            });
                            wx.setStorageSync("token", result.data.token);
                            this.checkBinding(result.data);
                        }
                    },
                });
            },
        });
    },
    async getUserInfo() {
        const result = await request("proxy/me", {}, "get");
        if (result.code === 0) {
            this.setData({
                id: result.data.id,
                nickname: result.data.nickname,
                avatarUrl: result.data.avatarUrl,
            });
            this.checkBinding(result.data);
        } else {
            wx.removeStorageSync("token");
            this.login();
        }
    },
    checkBinding(data) {
        if (data.binding) {
            wx.setStorageSync("username", data.username);
            wx.setStorageSync("idCard", data.idCard);
            wx.setStorageSync("mobile", data.mobile);
        } else {
            wx.showModal({
                title: "提示",
                content: "尚未绑定身份，请先绑定",
                success: (res) => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: "/pages/binding/binding",
                        });
                    }
                },
            });
        }
    },
});
