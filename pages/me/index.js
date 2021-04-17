let app = getApp();
import request from "../../utils/request";

Page({
    data: {
        hasLogin: false,
        vip: false,
        binding: false,
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
    },
    login(e) {
        wx.getUserProfile({
            desc: "用于完善用户信息",
            success: (e) => {
                let userInfo = e.userInfo;
                wx.login({
                    success: async (res) => {
                        const result = await request(
                            "/wechat/login",
                            {
                                code: res.code,
                                nickname: userInfo.nickName,
                                avatarUrl: userInfo.avatarUrl,
                                // 0 未知 1 男性 2 女性
                                gender: userInfo.gender,
                                country: userInfo.country,
                                province: userInfo.province,
                                city: userInfo.city,
                                language: userInfo.language,
                            },
                            "POST"
                        );
                        if (result.code === 0) {
                            this.setData({
                                hasLogin: true,
                            });
                            wx.setStorageSync("token", result.data.token);
                            this.getUserInfo(result.data);
                        }
                    },
                });
            },
        });
    },
    async getUserInfo() {
        const result = await request("/wechat/me", {}, "get");
        if (result.code === 0) {
            wx.setStorageSync("userId", result.data.id);
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
            this.setData({
                binding: true,
                vip: data.vip,
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
