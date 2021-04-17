import request from "../../utils/request";

Page({
    data: {
        articleContent: "",
    },
    onLoad() {
        this.getArticle();
    },
    async getArticle() {
        const result = await request("/wechat/article/info", {
            type: "about",
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
    onShareAppMessage() {
        return {
            title: "糖衣天使",
            path: "/pages/index/index?inviterId=" + wx.getStorageSync("userId"),
        };
    },
    onShareTimeline() {
        return {
            title: "糖衣天使",
            query: "inviterId=" + wx.getStorageSync("userId"),
        };
    },
});
