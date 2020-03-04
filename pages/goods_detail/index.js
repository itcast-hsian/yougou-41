
import request from "../../utils/request.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品的详情
        detail: {},
        // 记录tab当前的索引
        current: 1,
        // 需要做图片预览的数组
        picUrls: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求商品详情
        request({
            url: "/goods/detail",
            data: {
                goods_id: options.id
            }
        }).then(res => {
            const {message} = res.data;

            // 获取图片的链接，给预览图片的接口使用
            const picUrls = message.pics.map(v => {
                return v.pics_big
            });
            
            // 保存数据到data
            this.setData({
                detail: message,
                picUrls // 给预览图片的接口使用
            })
        })
    },

    // 商品详情的tab切换
    handleTab(e){
        const {index} = e.currentTarget.dataset;

        this.setData({
            current: index
        })
    },

    // 预览图片
    handlePreview(){
        wx.previewImage({
            //current: '', // 当前显示图片的http链接
            urls: this.data.picUrls // 需要预览的图片http链接列表
        })
    }
})