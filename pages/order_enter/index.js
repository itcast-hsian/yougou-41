import request from "../../utils/request.js"

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
        allPrice: 0,
        // 全选
        allSelect: true
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

    onShow() {

        // 因为data和onload只会执行一次，所以需要在每次打开页面都获取一次本地的数据
        this.setData({
            goods: wx.getStorageSync("goods") || []
        });

        // 计算总价格
        this.handleAllPrice();
    },

    // 获取收货地址
    handleGetAddress() {
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
    handleAllPrice() {
        let price = 0;
        // 循环添加商品的价格
        this.data.goods.forEach(v => {
            // 判断商品是否是选中状态
            if (v.select) {
                // v是数组的对象
                price += v.goods_price * v.number;
            }
        })

        // 修改总价格
        this.setData({
            allPrice: price
        })

        // 修改本地的数据
        wx.setStorageSync("goods", this.data.goods)
    },

    // 立即支付的事件
    handlePay(){

        // 先判断本地有没token
        const token = wx.getStorageSync("token");

        // 如果没有token
        if (!token){
            // 跳转到授权页
            wx.navigateTo({
                url: '/pages/authorize/index',
            })
        }else{
            // 如果有token
            let { allPrice, address, goods } = this.data;

            // 返回一个接口需要的商品数组
            goods = goods.map(v => {
                return {
                    goods_id: v.goods_id,
                    goods_number: v.number,
                    goods_price: v.goods_price
                }
            })

            // 1.创建订单
            request({
                url: "/my/orders/create",
                method: "POST",
                header: {
                    Authorization: token
                },
                data: {
                    // 创建订单需要的参数
                    order_price: allPrice,
                    consignee_addr: address.name + address.tel + address.detail,
                    goods
                }
            }).then(res => {
                // 订单创建成功的提示
                wx.showToast({
                    title: '订单创建成功',
                    type: "success"
                })

                // 2.发起支付,请求支付参数
                request({
                    url: "/my/orders/req_unifiedorder",
                    method: "POST",
                    header: {
                        Authorization: token
                    },
                    data: {
                        // 订单编号
                        order_number: res.data.message.order_number
                    }
                }).then(res => {
                    // 支付需要的参数
                    const {pay} = res.data.message;

                    // 3.发起微信支付
                    wx.requestPayment(pay)
                })
                
            })   

            
        }

        

    }
})