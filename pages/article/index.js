import request from "../../utils/request";

Page({
    data: {
        article: null,
        articleId: null,
        articleType: "",
    },
    onLoad(options) {
        this.setData({
            articleType: options.type,
            articleId: options.id,
        });
        this.getArticle();
    },
    async getArticle() {
        const result = await request("/wechat/article/info", {
            id: this.data.articleId,
            type: this.data.articleType,
        });
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            let article = result.data;
            article.content = article.content.replace(
                /<img/gi,
                '<img style="max-width:100%;height:auto"'
            );
            this.setData({
                article,
            });
        }
    },
});
