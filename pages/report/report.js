import request from "../../utils/request";

Page({

    data: {
        reports: []
    },

    onLoad: function (options) {
        this.getReports();
    },

    getReports() {
        request('proxy/wechat/reports', {}).then(result => {
            this.setData({
                reports: result.data
            });
        }).catch(e => {
            console.error(e);
            wx.showToast({
                title: e.msg,
                icon: 'none'
            });
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
