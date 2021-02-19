import request from "../../utils/request";

Page({

    data: {
        orders: []
    },

    onLoad: function (options) {
        let idCard = wx.getStorageSync('idCard');
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        request('/OrderRegApi/findOrder', {
            hospital: '1',
            id_card: idCard,
            // id_card: '340827199208104734',
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

    handleDismiss(event) {
        let item = event.currentTarget.dataset.item;
        console.log(item);
        wx.showModal({
            // title: '提示',
            content: '确定要取消吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    request('/OrderRegApi/cancelOrder', {
                        hospital: '1',
                        pre_reqid: item.pre_reqid,
                        check_no: item.check_no,
                        request_day: item.request_day,
                        unit_code: item.unit_code,
                        doctor_code: item.doctor_code,
                        ampm: item.ampm,
                        charge_type: item.charge_type,
                        pre_type: item.pre_type,
                        start_time: item.start_time,
                        end_time: item.end_time
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
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

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
