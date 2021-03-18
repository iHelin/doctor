import request from "../../utils/request";

Page({

    data: {
        orders: []
    },

    onLoad(options) {
        this.getDataList();
    },

    getDataList() {
        let idCard = wx.getStorageSync('idCard');
        request('/OrderRegApi/findOrder', {
            hospital: '1',
            id_card: idCard,
            // id_card: '340827199208104734',
            grbh: '',
            response_type: '1'
        }).then(result => {
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
            title: '提示',
            content: '确定要取消吗？',
            success(res) {
                if (res.confirm) {
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
                        start_time: item.starttime,
                        end_time: item.endtime
                    }).then(result => {
                        if (result.code === '0') {
                            wx.showToast({
                                title: result.msg,
                                icon: 'none'
                            });
                        } else if (result.code === '1') {
                            //成功
                            wx.showToast({
                                title: result.msg
                            });
                            this.getDataList();
                        } else {
                            wx.showToast({
                                title: '未知错误',
                                icon: 'error'
                            });
                        }
                    }).catch(e => {
                        console.error(e);
                        wx.showToast({
                            title: e.errMsg,
                            icon: 'none'
                        })
                    });
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
