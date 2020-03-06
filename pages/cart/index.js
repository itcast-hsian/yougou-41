// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 收货地址
        address: {},
        // 本地的商品列表
        goods: [],
        // 总价格
        allPrice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取本地的收货地址
        this.setData({
            // 如果本地没有address就等于一个空对象
            address: wx.getStorageSync("address") || {}
        })
    },

    onShow(){
        // 因为data和onload只会执行一次，所以需要在每次打开页面都获取一次本地的数据
        this.setData({
            goods: wx.getStorageSync("goods") || []
        });

        // 计算总价格
        this.handleAllPrice();
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
                });

                // 保存到本地
                wx.setStorageSync('address', this.data.address);
            }
        })
    },

    // 计算总价格
    handleAllPrice(){
        let price = 0;
        // 循环添加商品的价格
        this.data.goods.forEach(v => {
            // v是数组的对象
            price += v.goods_price;
        })

        // 修改总价格
        this.setData({
            allPrice: price
        })
    },

    // 数量加1
    handleCalc(e){
        // index是点击的索引值, number可能是1，也可能是-1
        const {index, number} = e.currentTarget.dataset;

        // 给当前点击的商品的数量加1，但是页面不会刷新
        this.data.goods[index].number += number;

        // 重新修改data的goods的值
        this.setData({
            goods: this.data.goods
        })
    }
})