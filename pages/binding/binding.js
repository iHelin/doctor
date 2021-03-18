import request from "../../utils/request";

Page({

    data: {
        username: '',
        idCard: '',
        telephone: ''
    },
    async binding() {
        const result = await request('proxy/wechat/binding', {
            username: this.data.username,
            idCard: this.data.idCard,
            telephone: this.data.telephone
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
        let telephone = wx.getStorageSync('telephone');
        this.setData({
            username,
            idCard,
            telephone
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
