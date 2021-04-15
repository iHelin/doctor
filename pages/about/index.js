import request from "../../utils/request";

Page({
    data: {
        latitude: 31.851887,
        longitude: 117.236563,
        markers: [{
            id: 1,
            latitude: 31.851887,
            longitude: 117.236563,
            title: '合肥联麦网络科技有限公司',
            width: 30,
            height: 30,
            callout: {
                content: '合肥联麦网络科技有限公司',
                display: 'ALWAYS'
            }
        }],
        articleContent: ""
    },
    onLoad() {
        this.getArticle();
    },
    async getArticle() {
        const result = await request('/wx/article/info', {
            type: 'about'
        });
        if (result.code !== 0) {
            wx.showModal({
                title: '提示',
                content: result.msg,
                showCancel: false
            });
        } else {
            let article = result.data;
            const articleContent = article.content.replace(/<img/gi, '<img style="max-width:100%;height:auto"');
            this.setData({
                articleContent
            });
        }
    },
    onShareAppMessage() {
        return {
            title: '联麦推广',
            path: '/pages/index/index?inviterId=' + wx.getStorageSync('userId')
        }
    },
    onShareTimeline() {
        return {
            title: '联麦推广',
            query: 'inviterId=' + wx.getStorageSync('userId')
        }
    }
})
