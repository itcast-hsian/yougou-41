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
        ]
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })

            console.log(data.index)
            
            this.setData({
                selected: data.index
            })
        }
    }
})