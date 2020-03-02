import request from "../../utils/request.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 关键字
        keyword: "",
        // 商品的列表
        goods: [],
        // 是否有更多
        hasMore: true
    },

    /**
     * 生命周期函数--监听页面加载
     * options是url的参数对象，只有onLoad才可以拿到参数
     */
    onLoad: function (options) {
        // keyword是url中的参数
        const {keyword} = options;
  
        this.setData({
            keyword
        });

        setTimeout(v => {
            // 请求商品列表
            request({
                url: "/goods/search",
                data: {
                    query: this.data.keyword,
                    pagenum: 1,
                    pagesize: 10
                }
            }).then(res => {
                const { message } = res.data;

                // 遍历修改goods下面的价格
                const goods = message.goods.map(v => {
                    // 给价格保留两个小数点
                    v.goods_price = Number(v.goods_price).toFixed(2);
                    return v
                })

                // 把message商品列表保存到list
                this.setData({
                    goods
                })
            })

        }, 3000)

        
    }
})