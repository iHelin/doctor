import request from "../../utils/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        questions: [],
        activeNames: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getQuestions();
    },

    async getQuestions() {
        const result = await request("/wechat/question/list");
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            this.setData({
                questions: result.data,
            });
        }
    },

    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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
