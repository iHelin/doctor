let app = getApp();
import request from "../../utils/request";

Page({
    data: {
        hasLogin: false,
        userId: null,
        binding: false,
    },
    onLoad(options) {
        userId: wx.getStorageSync("userId");
    },
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
    },
    login() {
        wx.getUserInfo({
            success: (result) => {
                let userInfo = result.userInfo;
                wx.login({
                    success: async (res) => {
                        const result = await request(
                            "/wechat/login",
                            {
                                code: res.code,
                                nickname: userInfo.nickName,
                                avatarUrl: userInfo.avatarUrl,
                            },
                            "POST"
                        );
                        if (result.code === 0) {
                            this.setData({
                                hasLogin: true,
                            });
                            wx.setStorageSync("token", result.data.token);
                            wx.setStorageSync("userId", result.data.id);
                            this.checkBinding(result.data);
                        }
                    },
                });
            },
        });
    },
    async getUserInfo() {
        const result = await request("/wechat/me", {}, "get");
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
            const userId = data.id;
            wx.setStorageSync("userId", userId);
            wx.setStorageSync("username", data.username);
            wx.setStorageSync("idCard", data.idCard);
            wx.setStorageSync("mobile", data.mobile);
            this.setData({
                userId,
                binding: true,
            });
        } else {
            this.setData({
                binding: false,
            });
            wx.showModal({
                title: "提示",
                content: "尚未绑定身份，请先绑定",
                success: (res) => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: "/pages/binding/index",
                        });
                    }
                },
            });
        }
    },
});