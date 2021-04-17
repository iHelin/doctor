import request from '../../utils/request'

Page({
    data: {
        name: '',
        contract: '',
        content: '',
        feedbackTimes: 1,
        autosize: {
            minHeight: 100
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    onShow() {
        this.checkTodayTimes()
    },
    async checkTodayTimes() {
        // 判断一天只能留言5次
        const result = await request('/wechat/feedback/todayTimes');
        if (result.code !== 0) {
            wx.showModal({
                title: '提示',
                content: result.msg,
                showCancel: false
            });
        } else {
            this.setData({
                feedbackTimes: result.data
            });
        }
    },
    async bindSave() {
        if (!this.data.name) {
            wx.showToast({
                title: '请输入您的姓名',
                icon: 'none',
            });
            return;
        }
        if (!this.data.contract) {
            wx.showToast({
                title: '请输入联系方式',
                icon: 'none',
            });
            return;
        }
        if (!this.data.content) {
            wx.showToast({
                title: '请输入反馈信息',
                icon: 'none',
            });
            return;
        }
        const result = await request('/wechat/feedback/save', {
            name: this.data.name,
            contract: this.data.contract,
            content: this.data.content
        }, 'post');
        if (result.code !== 0) {
            wx.showModal({
                title: '提示',
                content: result.msg,
                showCancel: false
            });
        } else {
            wx.showToast({
                title: '感谢反馈',
                icon: 'success'
            });
            let feedbackTimes = ++this.data.feedbackTimes;
            this.setData({
                feedbackTimes
            });
        }
    },
    onShareAppMessage() {
        return {
            title: '糖衣天使',
            path: '/pages/index/index?inviterId=' + wx.getStorageSync('userId')
        }
    },
    onShareTimeline() {
        return {
            title: '糖衣天使',
            query: 'inviterId=' + wx.getStorageSync('userId')
        }
    }
})
