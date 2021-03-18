import request from "../../utils/request";

Page({

    data: {
        reports: []
    },

    onLoad: function (options) {
        this.getReports();
    },

    async getReports() {
        const result = await request('proxy/wechat/reports', {});
        this.setData({
            reports: result.data
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
