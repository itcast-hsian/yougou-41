// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 收货地址
        address: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 获取收货地址
    handleGetAddress(){
        // 获取收货地址的文档：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html
        wx.chooseAddress({
            success: (res) => {
                // 把收货地址保存到data
                this.setData({
                   address: {
                       // 收货人
                       name: res.userName,
                       // 手机号码
                       tel: res.telNumber,
                       // 详细地址
                       detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
                   }
                })
            }
        })
    }
})