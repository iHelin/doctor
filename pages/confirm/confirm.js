// pages/confirm/confirm.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ampm: 'a',
        clinicFee: '',
        doctorCode: '',
        doctorName: '',
        startTime: '',
        endTime: '',
        requestDay: '',
        chargeType: '', //# 1为普通号，3为主任医师，4位副主任医师
        unitCode: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.doctorCode);

        let username = wx.getStorageSync('username');
        let idCard = wx.getStorageSync('idCard');
        let tel = wx.getStorageSync('tel');

        this.setData({
            ampm: options.ampm,
            clinicFee: options.clinicFee,
            doctorCode: options.doctorCode,
            doctorName: options.doctorName,
            startTime: options.startTime,
            endTime: options.endTime,
            requestDay: options.requestDay,
            unitCode: options.unitCode,
            chargeType: options.chargeType,
            username,
            idCard,
            tel
        })
    },

    finishOrder() {
        let idCard = this.data.idCard;
        let sex = idCard[idCard.length - 2] >>> 0 % 2 === 0 ? '0' : '1';
        let born = idCard.slice(6, 10) + '-' + idCard.slice(10, 12) + '-' + this.data.idCard.slice(12, 14);

        wx.showLoading({
            title: '加载中',
            mask: true
        });
        request('/OrderRegApi/finishOrder', {
            sex,
            born,
            id_card: idCard,
            hospital: '1',
            request_day: this.data.requestDay,
            unit_code: this.data.unitCode,
            doctor_code: this.data.doctorCode,
            ampm: this.data.ampm,
            charge_type: this.data.chargeType,
            clinic_fee: this.data.clinicFee,
            response_type: '1',
            pre_type: '6',
            start_time: this.data.startTime,
            end_time: this.data.endTime,
            user_name: this.data.username,
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
