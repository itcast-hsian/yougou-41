// components/search/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 组件可以传递的值
        keyword: {
            type: String,
            value: "搜索" // 这个是默认值，类似于vue里面的default
        },
        // 通过这个属性控制文字展示的位置
        align: {
            type: String,
            value: "center" // left，center，right
        }
    },

    // 外部扩展的样式,声明了可以接收background这个样式
    // align输入框的文字居中还是左对齐
    externalClasses: ['background',"align"],

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
