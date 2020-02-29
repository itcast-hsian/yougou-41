// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 记录当前点击了哪个菜单
        current: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 点击切换左边菜单栏时候触发
    handleClick(e){
        // index参数
        const {index} = e.currentTarget.dataset;
        
        // 保存当前点击的索引到data
        this.setData({
            current: index
        })
    }
})