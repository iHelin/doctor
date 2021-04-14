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
                        url: "/pages/me/me",
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
