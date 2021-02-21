import request from "../../utils/request";

Page({

    data: {
        username: '',
        idCard: '',
        telephone: ''
    },
    binding() {
        request('proxy/wechat/binding', {
            username: this.data.username,
            idCard: this.data.idCard,
            telephone: this.data.telephone
        }, 'POST').then((result) => {
            if (result.code === 0) {
                wx.setStorageSync('refresh', 'true');
                wx.showToast({
                    title: '绑定成功！',
                    icon: 'success'
                })
                wx.navigateBack()
            } else {
                wx.showToast({
                    title: result.msg,
                    icon: 'error'
                })
            }
        }).catch((err) => {
            wx.showToast({
                title: '绑定失败',
                icon: 'error'
            })
        })
    },

    handleUsername(event) {
        let username = event.detail.value;
        this.setData({
            username
        });
    },
    handleIdCard(event) {
        let idCard = event.detail.value;
        this.setData({
            idCard
        });
    },
    handleTel(event) {
        let telephone = event.detail.value;
        this.setData({
            telephone
        });
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
