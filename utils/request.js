// const API_BASE_URL = "https://www.hepplai.work";
const API_BASE_URL = "http://localhost:8080";
export default (url = "", data = {}, method = "GET") => {
    const proxyUrl = API_BASE_URL + url;
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        wx.showLoading({
            title: "加载中",
            mask: true,
        });
        wx.request({
            url: proxyUrl,
            data,
            method,
            header: {
                Authorization: "Bearer " + wx.getStorageSync("token"),
                agent: "wechat",
            },
            success: (response) => {
                if (response.data && response.data.code === 401) {
                    wx.removeStorageSync("token");
                }
                resolve(response.data);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                wx.hideLoading();
            },
        });
    });
};
