# PayToolDesktop 使用Electron-vue开发的客户端支付收款工具-


## 概述

**目前实现了支付宝当面付的扫码支付功能、二维码支付功能，即主动扫和被动扫。测试请使用支付宝沙箱环境，支付宝是沙箱版。
前端页面使用阿里的组件，ant-design-vue
通过node，使用nedb内存数据库进行本地数据存储
安装文件支持自定义。
。
alipayhelper.js 里存储的支付宝收款方的APPID，pem路径下应用私钥。这些信息可以通过阿里官方申请，即可以在线收款

**



## 应用截图

![首页](https://segmentfault.com/img/bVbs00I?w=1219&h=722)
![首页](https://segmentfault.com/img/bVbs00K?w=1372&h=725)

## 开发说明
文档地址
https://segmentfault.com/a/1190000019269458
有问题可以在线交流

> 目前仅针对Windows。Mac、Linux平台并未测试。

``` bash
# install dependencies
npm install

#调试
npm run dev

# 发布
npm run build


```


## 其他相关
