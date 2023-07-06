const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  // publicPath:"/api/user/getuserinfo" 
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://192.168.0.1:8081",
  //       pathRewrite: ""
  //     }
  //   }
  // }
});
