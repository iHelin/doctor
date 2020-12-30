// pages/confirm/confirm.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ampm: 'a',
        clinic_fee: '',
        doctor_code: '',
        doctor_name: '',
        start_time: '',
        end_time: '',
        request_day: '',
        charge_type: '3', //# 1为普通号，3为主任医师，4位副主任医师
        unit_code: '',
        hospital: '1'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);

        let user_name = wx.getStorageSync('user_name');
        let id_card = wx.getStorageSync('id_card');
        let tel = wx.getStorageSync('tel');

        this.setData({
            ampm: options.ampm,
            clinic_fee: options.clinic_fee,
            doctor_code: options.doctor_code,
            doctor_name: options.doctor_name,
            start_time: options.start_time,
            end_time: options.end_time,
            request_day: options.request_day,
            unit_code: options.unit_code,
            user_name,
            id_card,
            tel
        })
    },

    finishOrder() {
        let id_card = this.data.id_card;
        let sex = id_card[id_card.length - 2] >>> 0 % 2 === 0 ? '0' : '1';
        let born = id_card.slice(6, 10) + '-' + id_card.slice(10, 12) + '-' + this.data.id_card.slice(12, 14);

        wx.showLoading({
            title: '加载中',
            mask: true
        });
        request('/OrderRegApi/finishOrder', {
            hospital: this.data.hospital,
            id_card,
            sex,
            born,
            request_day: this.data.request_day,
            unit_code: this.data.unit_code,
            doctor_code: this.data.doctor_code,
            ampm: this.data.ampm,
            charge_type: this.data.charge_type,
            clinic_fee: this.data.clinic_fee,
            response_type: '1',
            pre_type: '6',
            start_time: this.data.start_time,
            end_time: this.data.end_time,
            user_name: this.data.user_name,
            grbh: '',
            tel: this.data.tel
        }).then(result => {
            wx.hideLoading();
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
            } else {
                wx.showToast({
                    title: '未知错误',
                    icon: 'none'
                });
            }
        }).catch(e => {
            wx.hideLoading();
            console.log(e);
            wx.showToast({
                title: e.errMsg,
                icon: 'none'
            });
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
