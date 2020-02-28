import request from "../../utils/request.js";

Page({

    data: {
        // 轮播图的数据
        banners: []
    },

    onLoad(){
        // 请求轮播图接口
        request({
            url: "/home/swiperdata"
        }).then(res => {
            // message是轮播图的数组
            const {message} = res.data;
            // 赋值给banners
            this.setData({
                banners: message
            })
        })
    }
})