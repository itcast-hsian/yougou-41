import request from "../../utils/request.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 输入框的值
        inputValue: "",
        // 上次输入框的值
        lastValue: "",
        // 搜索建议
        recommend: [],
        // 设置一个开关，必须等待上一次的请求返回
        loading: false,
        // 本地的存储历史记录
        history: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取本地的存储
        let arr = wx.getStorageSync("history");
        // 如果本地没有数据或者arr不是一个数组
        if (!Array.isArray(arr)) {
            arr = [];
        }

        this.setData({
            history: arr
        })
    },

    // 监听输入框的输入事件
    handleInput(e){
        // value是输入框的值
        const {value} = e.detail;
        this.setData({
            inputValue: value
        });

        // 如果value有值才发起请求
        if(!value) {
            // 把搜索建议的数组清空
            this.setData({
                recommend: []
            });

            return;
        };

        // 请求搜索建议
        this.getRecommend();
    },

    // 请求搜索建议
    getRecommend(){
        // 必须保证进门时候灯是关着的
        if (this.data.loading == false){

            // 进门后开灯
            this.setData({
                loading: true,
                // 记录当前搜索的输入框的值
                lastValue: this.data.inputValue
            })

            // 请求搜索建议
            request({
                url: "/goods/qsearch",
                data: {
                    query: this.data.inputValue
                }
            }).then(res => {
                const { message } = res.data;
                // 保存到搜索建议的数组
                this.setData({
                    recommend: message,
                    loading: false // 完成离开，出门时候就关灯
                });

                // 判断是否是inputValue值是最新,如果不是的话再次请求接口
                if (this.data.lastValue !== this.data.inputValue){
                    this.getRecommend();
                }
            })
        }
    },

    // 点击取消按钮时候触发的事件
    handleCancel(){
        // 清空输入框的值和搜索建议的列表
        this.setData({
            inputValue: "",
            recommend: []
        })
    },

    // 输入框失去焦点时候触发
    handleBlur(){
        this.setData({
            recommend: []
        })
    },

    // 清空本地的存储
    handleClear(){
        // 清空data中的数据
        this.setData({
            history: []
        })

        // 清空本地的历史数据
        wx.setStorageSync('history', [])
    },

    // 按下回车按钮时候触发的事件
    handleEnter(){ 
        // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html
        // 每次存储之前先把本地的数据先获取回来
        let arr = wx.getStorageSync("history");

        // 如果本地没有数据或者arr不是一个数组
        if(!Array.isArray(arr)){
            arr = [];
        }

        // 添加到数组的第一位
        arr.unshift(this.data.inputValue);

        // 数组去重
        arr = [...new Set(arr)]

        // 把搜索关键字保存到本地
        wx.setStorageSync('history', arr)

        // 跳转到商品搜索列表页
        wx.redirectTo({
            url: "/pages/goods_list/index?keyword=" + this.data.inputValue
        })
    }
})