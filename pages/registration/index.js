import request from "../../utils/request";
import { getCurrentDay } from "../../utils/util";
Page({
    data: {
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
        maxDate: null,
        dateFormatter(day) {
            const weekIndex = day.date.getDay();
            if (weekIndex === 1) {
                day.topInfo = "血液科";
                day.bottomInfo = "移植和免疫";
            }
            if (weekIndex === 4) {
                day.topInfo = "特需";
            }
            return day;
        },
        dateInterval: null,
        searchDisabled: false,
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
    onDateConfirm(event) {
        const date = new Date(event.detail);
        this.setData({
            showDate: false,
            requestDay: `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`,
        });
    },
    onLoad(options) {
        //检查是否挂过号
        const currentDateStorage = wx.getStorageSync("submitOrder");
        let currentDate = getCurrentDay();
        if (currentDateStorage && currentDateStorage === currentDate) {
            this.setData({
                searchDisabled: true,
            });
            return;
        }
        const agreePrivacy = wx.getStorageSync("agreePrivacy");
        if (!agreePrivacy) {
            wx.showModal({
                title: "重要提示",
                content:
                    "您的姓名，身份证号和手机号为系统查询和确认挂号时的必填项，该小程序不会收集您的以上隐私信息，请知晓！",
                confirmText: "同意",
                cancelText: "不同意",
                success(res) {
                    if (res.confirm) {
                        wx.setStorageSync("agreePrivacy", true);
                    } else if (res.cancel) {
                        wx.removeStorageSync("agreePrivacy");
                        wx.navigateBack();
                    }
                },
            });
        }
        this.getMaxDate();
    },
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
    async getMaxDate() {
        //获取服务器时间，并计算最大时间
        const result = await request("/wechat/now", {});
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            let maxDateMilliSeconds = result.data + 18.5 * 24 * 60 * 60 * 1000;
            this.data.dateInterval = setInterval(() => {
                maxDateMilliSeconds += 1000;
                this.setData({
                    maxDate: maxDateMilliSeconds,
                });
            }, 1000);
        }
    },
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
                result,
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
            let url = `/pages/confirm/index?requestDay=${this.data.requestDay}&unitCode=${unitCode}&clinicFee=${item.clinic_fee}&doctorCode=${item.doctor_code}&startTime=${item.startTime}&endTime=${item.endTime}&ampm=${item.ampm}&doctorName=${item.doctor_name}&chargeType=${chargeType}`;
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        clearInterval(this.data.dateInterval);
    },

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
