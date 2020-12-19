// 发送ajax请求
export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        wx.request({
            url: 'https://sdfyy.hepplai.work' + url,
            data,
            method,
            header: {
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
