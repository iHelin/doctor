//获取应用实例
var app = getApp()
Page({
  data: {
    score: 300,
    reason: '',
    totalScore: 0
  },
  save: function () {
    var that = this;
    var score = this.data.score;
    var reason = this.data.reason;
    var title = '确定要加 ' + score + ' 分吗？';
    if (!score){
      wx.showModal({
        title: '警告',
        content: '请输入分数！',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }
    if (!reason) {
      wx.showModal({
        title: '警告',
        content: '请输入理由！',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }
    wx.showModal({
      title: 'Seven提示',
      content: title,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.ianhe.me/score',
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              score: score,
              reason: reason,
              addWriter: 1
            },
            success: function (res) {
              if (res.data.status == 'success') {
                wx.showToast({
                  title: '恭喜，添加成功！',
                  icon: 'success',
                  duration: 3000
                });
                that.getTotalScore();
              }
            }
          })
        }
      }
    });

  },
  scoreChange: function (e) {
    this.setData({
      score: e.detail.value
    })
  },
  reasonChange: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  getTotalScore: function () {
    var that = this
    var totalScore = wx.getStorageSync('totalScore') || 0
    that.setData({
      totalScore: totalScore
    })

    // wx.request({
    //   url: 'https://www.ianhe.me/score/all',
    //   success: function (res) {
    //     that.setData({
    //       totalScore: res.data.data
    //     })
    //   }
    // })
  },

  onLoad: function () {
    this.getTotalScore();
  }
})