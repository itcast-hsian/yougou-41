import request from "../../utils/request.js"

// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 记录当前点击了哪个菜单
        current: 0,
        // 数据列表
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求分类页的数据
        request({
            url: "/categories"
        }).then(res => {
            // 把数据列表保存到data
            const {message} = res.data;
            this.setData({
                list: message
            })
        })
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