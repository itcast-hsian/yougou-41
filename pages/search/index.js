import request from "../../utils/request.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 输入框的值
        inputValue: "",
        // 搜索建议
        recommend: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 监听输入框的输入事件
    handleInput(e){
        // value是输入框的值
        const {value} = e.detail;
        this.setData({
            inputValue: value
        });

        // 如果value有值才发起请求
        if(!value) return;

        // 请求搜索建议
        request({
            url: "/goods/qsearch",
            data: {
                query: value
            }
        }).then(res => {
            const {message} = res.data;
            // 保存到搜索建议的数组
            this.setData({
                recommend: message
            })
        })
    }
})