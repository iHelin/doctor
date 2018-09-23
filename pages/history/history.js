var dateUtil = require('../../utils/util.js')

Page({
    data: {
        longitude: null,
        latitude: null
    },

    onLoad: function() {
        var self = this;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                self.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                });
            },
        })
    },

    markertap: function(h) {
        console.log(h);
    },
    scan: function() {
        wx.scanCode({
            success: (res) => {
                console.log(res)
            }
        })
    }

})