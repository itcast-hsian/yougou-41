import request from "./utils/request.js";

//app.js
App({
    onLaunch: function() {
        // 指定一个基准路径
        request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
    },
})