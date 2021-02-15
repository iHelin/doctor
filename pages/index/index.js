import request from '../../utils/request'

Page({
    data: {
        username: '赖信高',
        idCard: '510321196909141856',
        tel: '13619020598',
        requestDay: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        list: null,
        doctors: [{
            name: '唐晓文',
            code: '00577',
            chargeType: '3'
        }, {
            name: '陈峰',
            code: '02884',
            chargeType: '3'
        }, {
            name: '戴海萍',
            code: '02904',
            chargeType: '4'
        }, {
            name: '王荧',
            code: '02517',
            chargeType: '3'
        }],
        doctorIndex: 0,
        units: [{
            name: '血液科门诊',
            code: '1010701'
        }, {
            name: '血液科(移植和免疫治疗门诊)',
            code: '1010723'
        }, {
            name: '血液科(特需门诊)',
            code: '1010707'
        }],
        unitIndex: 0,
        // theme:'dark'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let username = wx.getStorageSync('username');
        let idCard = wx.getStorageSync('idCard');
        let tel = wx.getStorageSync('tel');
        if (username) {
            this.setData({
                username
            })
        }
        if (idCard) {
            this.setData({
                idCard
            })
        }
        if (tel) {
            this.setData({
                tel
            })
        }
    },

    handleUsername(event) {
        let username = event.detail.value;
        // wx.setStorageSync('username', username);
        this.setData({
            username
        });
    },
    handleIdCard(event) {
        let idCard = event.detail.value;
        // wx.setStorageSync('idCard', idCard);
        this.setData({
            idCard
        });
    },
    handleTel(event) {
        let tel = event.detail.value;
        // wx.setStorageSync('tel', tel);
        this.setData({
            tel
        });
    },
    handleRequestDay(event) {
        let requestDay = event.detail.value
        this.setData({
            requestDay
        });
    },
    handleDoctor(event) {
        let doctorIndex = event.detail.value >>> 0;
        this.setData({
            doctorIndex
        });
    },
    handleUnitCode(event) {
        let unitIndex = event.detail.value >>> 0;
        this.setData({
            unitIndex
        });
    },

    search() {
        if (!this.data.username) {
            wx.showToast({
                title: '请输入姓名',
                icon: 'error'
            })
            return;
        }
        wx.setStorageSync('username', this.data.username);

        if (!this.data.idCard) {
            wx.showToast({
                title: '请输入身份证号',
                icon: 'error'
            })
            return;
        }
        wx.setStorageSync('idCard', this.data.idCard);

        if (!this.data.tel) {
            wx.showToast({
                title: '请输入联系电话',
                icon: 'error'
            })
            return;
        }
        wx.setStorageSync('tel', this.data.tel);

        let requestDay = this.data.requestDay;
        if (!requestDay) {
            wx.showToast({
                title: '请选择日期',
                icon: 'error'
            })
            return;
        }

        let hospital = '1';
        let unitCode = this.data.units[this.data.unitIndex].code;
        let doctorCode = this.data.doctors[this.data.doctorIndex].code;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        request('/WebCall/getAllDoctorDetail', {
            hospital,
            request_day: requestDay,
            unit_code: unitCode,
            doctor_code: doctorCode
        }).then(result => {
            wx.hideLoading();
            if (result) {
                this.setData({
                    list: result
                });
            } else {
                wx.showToast({
                    title: '无排班信息',
                    icon: 'error'
                });
                this.setData({
                    list: []
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

    navigateToFinishOrder(event) {
        let item = event.currentTarget.dataset.item;
        const chargeType = this.data.doctors[this.data.doctorIndex].chargeType;
        const unitCode = this.data.units[this.data.unitIndex].code;
        if (item.leftNum > 0) {
            let url = `/pages/confirm/confirm?requestDay=${this.data.requestDay}&unitCode=${unitCode}&clinicFee=${item.clinic_fee}&doctorCode=${item.doctor_code}&startTime=${item.startTime}&endTime=${item.endTime}&ampm=${item.ampm}&doctorName=${item.doctor_name}&chargeType=${chargeType}`;
            wx.navigateTo({
                url
            })
        }
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
