const proxy = 'https://www.hepplai.work';
// const proxy = "http://localhost:8080";
export default (url = "", data = {}, method = "GET") => {
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        wx.showLoading({
            title: "加载中",
            mask: true,
        });
        wx.request({
            url: url.startsWith("proxy")
                ? proxy + url.replace("proxy", "")
                : proxy + url,
            data,
            method,
            header: {
                Authorization: "Bearer " + wx.getStorageSync("token"),
                agent: "wechat",
            },
            success: (res) => {
                resolve(res.data); // resolve修改promise的状态为成功状态resolved
            },
            fail: (err) => {
                reject(err); // reject修改promise的状态为失败状态 rejected
            },
            complete() {
                wx.hideLoading();
            },
        });
    });
};
