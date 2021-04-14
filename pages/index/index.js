import request from "../../utils/request";
Page({
    data: {
        // username: '赖信高',
        // idCard: '510321196909141856',
        // tel: '13619020598',
        username: "",
        idCard: "",
        tel: "",
        requestDay:
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate(),
        result: null,
        doctors: [
            {
                name: "唐晓文",
                code: "00577",
                chargeType: "3",
            },
            {
                name: "陈峰",
                code: "02884",
                chargeType: "3",
            },
            {
                name: "戴海萍",
                code: "02904",
                chargeType: "4",
            },
            {
                name: "普通号",
                code: "",
                chargeType: "1",
            },
            {
                name: "孙爱宁",
                code: "00036",
                chargeType: "3",
            },
            {
                name: "王荧",
                code: "02517",
                chargeType: "3",
            },
        ],
        doctorIndex: 0,
        units: [
            {
                name: "血液科门诊",
                code: "1010701",
            },
            {
                name: "血液科(移植和免疫治疗门诊)",
                code: "1010723",
            },
            {
                name: "血液科(特需门诊)",
                code: "1010707",
            },
        ],
        unitIndex: 0,
        showDoctor: false,
        showUnit: false,
        showDate: false,
    },
    showDoctorPopup() {
        this.setData({ showDoctor: true });
    },
    showUnitPopup() {
        this.setData({ showUnit: true });
    },
    showDatePopup() {
        this.setData({ showDate: true });
    },
    onDoctorClose() {
        this.setData({ showDoctor: false });
    },
    onUnitClose() {
        this.setData({ showUnit: false });
    },
    onDateClose() {
        this.setData({ showDate: false });
    },
    onDoctorChange(event) {
        const { picker, value, index } = event.detail;
        this.setData({
            doctorIndex: index,
        });
    },
    onUnitChange(event) {
        const { picker, value, index } = event.detail;
        this.setData({
            unitIndex: index,
        });
    },
    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onDateConfirm(event) {
        this.setData({
            showDate: false,
            requestDay: this.formatDate(event.detail),
        });
    },
    onLoad(options) {},
    async search() {
        if (!this.data.username) {
            wx.showToast({
                title: "请输入姓名",
                icon: "error",
            });
            return;
        }
        wx.setStorageSync("username", this.data.username);

        if (!this.data.idCard) {
            wx.showToast({
                title: "请输入身份证号",
                icon: "error",
            });
            return;
        }
        wx.setStorageSync("idCard", this.data.idCard);

        if (!this.data.tel) {
            wx.showToast({
                title: "请输入联系电话",
                icon: "error",
            });
            return;
        }
        wx.setStorageSync("mobile", this.data.tel);

        let requestDay = this.data.requestDay;
        if (!requestDay) {
            wx.showToast({
                title: "请选择日期",
                icon: "error",
            });
            return;
        }

        let hospital = "1";
        let unitCode = this.data.units[this.data.unitIndex].code;
        let doctorCode = this.data.doctors[this.data.doctorIndex].code;
        const result = await request("/sdfyy/WebCall/getAllDoctorDetail", {
            hospital,
            request_day: requestDay,
            unit_code: unitCode,
            doctor_code: doctorCode,
        });
        if (result) {
            this.setData({
                result
            });
        } else {
            wx.showToast({
                title: "无排班信息",
                icon: "error",
            });
            this.setData({
                result: [],
            });
        }
    },

    navigateToFinishOrder(event) {
        let item = event.currentTarget.dataset.item;
        let chargeType = this.data.doctors[this.data.doctorIndex].chargeType;
        const unitCode = this.data.units[this.data.unitIndex].code;
        if (item.leftNum > 0) {
            let url = `/pages/confirm/confirm?requestDay=${this.data.requestDay}&unitCode=${unitCode}&clinicFee=${item.clinic_fee}&doctorCode=${item.doctor_code}&startTime=${item.startTime}&endTime=${item.endTime}&ampm=${item.ampm}&doctorName=${item.doctor_name}&chargeType=${chargeType}`;
            wx.navigateTo({
                url,
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let username = wx.getStorageSync("username");
        let idCard = wx.getStorageSync("idCard");
        let tel = wx.getStorageSync("mobile");
        this.setData({
            username,
            idCard,
            tel,
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
