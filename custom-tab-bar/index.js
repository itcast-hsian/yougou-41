Component({
    data: {
        selected: 0,
        color: "#000",
        selectedColor: "#ff2d4a",
        borderStyle: "black",
        list: [{
                "pagePath": "/pages/index/index",
                "text": "首页",
                "iconPath": "../images/icon_home@3x.png",
                "selectedIconPath": "../images/icon_home_active@3x.png"
            },
            {
                "pagePath": "/pages/category/index",
                "text": "分类",
                "iconPath": "../images/icon_category@3x.png",
                "selectedIconPath": "../images/icon_category_active@3x.png"
            },
            {
                "pagePath": "/pages/cart/index",
                "text": "购物车",
                "iconPath": "../images/icon_cart@3x.png",
                "selectedIconPath": "../images/icon_cart_active@3x.png"
            },
            {
                "pagePath": "/pages/personal/index",
                "text": "我的",
                "iconPath": "../images/icon_me@3x.png",
                "selectedIconPath": "../images/icon_me_active@3x.png"
            }
        ],

        // 购物车数量
        cartCount: ( wx.getStorageSync('goods') || [] ).length
    },

    // 可以在自定义组件里面使用页面的生命周期 (问题是：页面的onshow生命周期不会执行)
    // pageLifetimes: {
    //     // 类似页面的onShow方法
    //     show: function () {
    //         console.log("执行了tabbar onshow")
    //         this.setData({
    //             cartCount: (wx.getStorageSync('goods') || []).length
    //         })
    //     },
    // },
    

    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })
            
            this.setData({
                selected: data.index
            })
        }
    }
})