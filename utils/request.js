// 发送ajax请求
export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        // let proxy = 'http://localhost:8888';
        let proxy = 'https://sdfyy.hepplai.work/proxy';
        wx.request({
            url: url.startsWith('proxy') ? proxy + url.replace('proxy', '') : 'https://sdfyy.hepplai.work' + url,
            data,
            method,
            header: {
                Authorization: 'Bearer ' + wx.getStorageSync('token'),
                cookie: ''
            },
            success: (res) => {
                // console.log('请求成功: ', res);
                resolve(res.data); // resolve修改promise的状态为成功状态resolved
            },
            fail: (err) => {
                // console.log('请求失败: ', err);
                reject(err); // reject修改promise的状态为失败状态 rejected
            }
        })
    })

}
