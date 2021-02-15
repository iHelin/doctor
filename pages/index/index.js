import request from '../../utils/request'

Page({
    data: {
        user_name: '赖信高',
        id_card: '510321196909141856',
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
        doctor_index: 0,
        doctor_code: '',
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
        unit_code_index: 0,
        unit_code: ''
        // theme:'dark'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let user_name = wx.getStorageSync('user_name');
        let id_card = wx.getStorageSync('id_card');
        let tel = wx.getStorageSync('tel');
        let doctor_code = this.data.doctors[this.data.doctor_index].code;
        let unit_code = this.data.units[this.data.unit_code_index].code;
        this.setData({
            doctor_code,
            unit_code
        });
        if (user_name) {
            this.setData({
                user_name
            })
        }
        if (id_card) {
            this.setData({
                id_card
            })
        }
        if (tel) {
            this.setData({
                tel
            })
        }
    },

    handleUsername(event) {
        let user_name = event.detail.value;
        // wx.setStorageSync('user_name', user_name);
        this.setData({
            user_name
        });
    },
    handleIdCard(event) {
        let id_card = event.detail.value;
        // wx.setStorageSync('id_card', id_card);
        this.setData({
            id_card
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
        let doctor_index = event.detail.value >>> 0;
        let doctor_code = this.data.doctors[doctor_index].code;
        this.setData({
            doctor_index,
            doctor_code
        });
    },
    handleUnitCode(event) {
        let unit_code_index = event.detail.value >>> 0;
        let unit_code = this.data.units[unit_code_index].code;
        this.setData({
            unit_code_index,
            unit_code
        });
    },

    search() {
        if (!this.data.user_name) {
            wx.showToast({
                title: '请输入姓名',
                icon: 'error'
            })
            return;
        }
        wx.setStorageSync('user_name', this.data.user_name);

        if (!this.data.id_card) {
            wx.showToast({
                title: '请输入身份证号',
                icon: 'error'
            })
            return;
        }
        wx.setStorageSync('id_card', this.data.id_card);

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
        let unit_code = this.data.unit_code;
        let doctor_code = this.data.doctor_code;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        request('/WebCall/getAllDoctorDetail', {
            hospital,
            request_day: requestDay,
            unit_code,
            doctor_code
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
        const chargeType = this.data.doctors[this.data.doctor_index].chargeType;
        if (item.leftNum > 0) {
            let url = `/pages/confirm/confirm?requestDay=${this.data.requestDay}&unit_code=${this.data.unit_code}&clinic_fee=${item.clinic_fee}&doctor_code=${item.doctor_code}&start_time=${item.startTime}&end_time=${item.endTime}&ampm=${item.ampm}&doctor_name=${item.doctor_name}&chargeType=${chargeType}`;
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
