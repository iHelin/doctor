// const proxy = 'http://localhost:8080';
const proxy = 'https://sdfyy.hepplai.work/proxy';
export default (url = '', data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        wx.request({
            url: url.startsWith('proxy') ? proxy + url.replace('proxy', '') : 'https://sdfyy.hepplai.work' + url,
            data,
            method,
            header: {
                Authorization: 'Bearer ' + wx.getStorageSync('token'),
            },
            success: (res) => {
                resolve(res.data); // resolve修改promise的状态为成功状态resolved
            },
            fail: (err) => {
                reject(err); // reject修改promise的状态为失败状态 rejected
            },
            complete() {
                wx.hideLoading();
            }
        })
    })

}
