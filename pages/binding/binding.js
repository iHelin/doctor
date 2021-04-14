import request from "../../utils/request";

Page({

    data: {
        username: '',
        idCard: '',
        mobile: ''
    },
    async binding() {
        const result = await request('proxy/wechat/binding', {
            username: this.data.username,
            idCard: this.data.idCard,
            mobile: this.data.mobile
        }, 'POST');
        if (result.code === 0) {
            wx.setStorageSync('refresh', 'true');
            wx.showToast({
                title: '绑定成功！',
                icon: 'success'
            })
            wx.navigateBack();
        } else {
            wx.showToast({
                title: result.msg,
                icon: 'error'
            });
        }
    },

    onLoad(options) {
        let username = wx.getStorageSync('username');
        let idCard = wx.getStorageSync('idCard');
        let mobile = wx.getStorageSync('mobile');
        this.setData({
            username,
            idCard,
            mobile
        });
    },

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
});
