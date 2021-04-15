import request from "../../utils/request";

Page({
    data: {
        username: "",
        idCard: "",
        mobile: "",
    },
    async binding() {
        const result = await request(
            "/wechat/binding",
            {
                username: this.data.username,
                idCard: this.data.idCard,
                mobile: this.data.mobile,
            },
            "POST"
        );
        if (result.code === 0) {
            wx.showToast({
                title: "绑定成功！",
                icon: "success",
                complete: () => {
                    wx.switchTab({
                        url: "/pages/me/index",
                    });
                },
            });
        } else {
            wx.showToast({
                title: result.msg,
                icon: "error",
            });
        }
    },

    onLoad(options) {
        const agreePrivacy = wx.getStorageSync("agreePrivacy");
        if (!agreePrivacy) {
            wx.showModal({
                title: "重要提示",
                content:
                    "您的姓名，身份证号和手机号为系统查询和确认挂号时的必填项，该小程序不会收集您的以上隐私信息，请知晓！",
                confirmText: "同意",
                cancelText: "不同意",
                success(res) {
                    if (res.confirm) {
                        wx.setStorageSync("agreePrivacy", true);
                    } else if (res.cancel) {
                        wx.removeStorageSync("agreePrivacy");
                        wx.navigateBack();
                    }
                },
            });
        }
        let username = wx.getStorageSync("username");
        let idCard = wx.getStorageSync("idCard");
        let mobile = wx.getStorageSync("mobile");
        this.setData({
            username,
            idCard,
            mobile,
        });
    },

    onReady: function () {},

    onShow: function () {},

    onHide: function () {},

    onUnload: function () {},

    onPullDownRefresh: function () {},

    onReachBottom: function () {},

    onShareAppMessage: function () {},
});
