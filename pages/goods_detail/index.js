
import request from "../../utils/request.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品的详情
        detail: {},
        // 记录tab当前的索引
        current: 0,
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
    handlePreview(e){
        // 获取当前点击的图片的索引值
        const {index} = e.currentTarget.dataset;

        wx.previewImage({
            current: this.data.picUrls[index], // 当前显示图片的http链接
            urls: this.data.picUrls // 需要预览的图片http链接列表
        })
    },

    // 跳转到购物车页
    handleToCart(){
        wx.switchTab({
            url: '/pages/cart/index',
        })
    },

    // 把商品加入到本地的购物车列表
    handleAddCart(){
        // 每次加入商品之前应该先判断本地有没有数据，如果没有就等于一个空数组
        const goods = wx.getStorageSync("goods") || [];

        // 判断当前的商品是否已经在goods的数组中
        // 存在就数量加一，不存在就unshift
        // some循环数组，return的结果“只要有一个是true就会返回true”，反之就false
        const exit = goods.some(v => {
            // 通过id判断当前商品是否在本地的数组中
            const isExit = v.goods_id === this.data.detail.goods_id;
            // 存在就数量加一
            if (isExit){
                v.number += 1;
                // 提示，文档地址https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
                wx.showToast({
                    title: '数量+1',
                    icon: 'success'
                })
            }

            return isExit;
        })

        if (!exit){
            // 把当前的商品添加到本地的数组中
            goods.unshift({
                goods_id: this.data.detail.goods_id,
                goods_name: this.data.detail.goods_name,
                goods_price: this.data.detail.goods_price,
                goods_small_logo: this.data.detail.goods_small_logo,
                number: 1
            })
        }

        // 保存到本地
        wx.setStorageSync("goods", goods);
    }
})