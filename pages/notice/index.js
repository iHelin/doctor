import request from "../../utils/request";

Page({
    data: {
        notice: null,
    },
    onLoad(options) {
        this.getNotice(options.id);
    },
    async getNotice(id) {
        const result = await request("/wechat/article/info", {
            noticeId: id,
            type: "notice",
        });
        if (result.code !== 0) {
            wx.showModal({
                title: "提示",
                content: result.msg,
                showCancel: false,
            });
        } else {
            let notice = result.data;
            notice.content = notice.content.replace(
                /<img/gi,
                '<img style="max-width:100%;height:auto"'
            );
            this.setData({
                notice,
            });
        }
    },
});
