import request from "../../utils/request";

Page({

    data: {
        orders: []
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        request('/OrderRegApi/findOrder', {
            hospital: '1',
            id_card: '340827199208104734',
            grbh: '',
            response_type: '1'
        }).then(result => {
            wx.hideLoading();
            if (result) {
                this.setData({
                    orders: result
                });
            } else {
                wx.showToast({
                    title: '无信息',
                    icon: 'error'
                });
                this.setData({
                    orders: []
                });
            }
        }).catch(e => {
            wx.hideLoading();
            console.error(e);
            wx.showToast({
                title: e.errMsg,
                icon: 'error'
            })
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
