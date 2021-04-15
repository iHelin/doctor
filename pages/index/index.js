import request from "../../utils/request";
Page({
    data: {
        banners: [],
        notices: [],
        articleContent: "",
    },
    onLoad(options) {
        this.getBanners();
        this.getNotices();
        this.getArticle();
    },
    onShow() {},
    async getBanners() {
        const result = await request("/wechat/banner/list", {
            type: "index",
        });
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            this.setData({
                banners: result.data,
            });
        }
    },
    async getNotices() {
        const result = await request("/wechat/article/list", {
            type: "notice",
        });
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            this.setData({
                notices: result.data,
            });
        }
    },
    async getArticle() {
        const result = await request("/wechat/article/info", {
            type: "index",
        });
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            let article = result.data;
            const articleContent = article.content.replace(
                /<img/gi,
                '<img style="max-width:100%;height:auto"'
            );
            this.setData({
                articleContent,
            });
        }
    },
    goBanner(e) {
        const url = e.currentTarget.dataset.url;
        if (url) {
            wx.navigateTo({
                url,
            });
        }
    },
    goNotice(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/notice/index?id=${id}`,
        });
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
