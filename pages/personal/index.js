// pages/personal/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }
    },

    // 收货地址
    handleAddress(){
        // 根据接口的名字在文档里搜索
        wx.chooseAddress();
    },

    // 联系客服
    handleContact(){
        // 根据接口的名字在文档里搜索
        wx.makePhoneCall({
            phoneNumber: '1340000' //仅为示例，并非真实的电话号码
        })
    }
})