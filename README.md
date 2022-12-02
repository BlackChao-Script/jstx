<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
# mobile

目前模块有:
```
minikol:嗨星球
```


## 项目安装依赖
```
npm install
```

### 项目启动开发环境
npm run serve 模块名 模式（h5/mp-weixin 默认h5）
```
npm run serve minikol  -> 运行嗨星球h5
npm run serve minikol mp-weixin -> 运行嗨星球小程序
```

### 项目打包
npm run build 模块名 模式（h5/mp-weixin 默认h5）
```
npm run build minikol -> 打包嗨星球h5
npm run build minikol mp-weixin -> 打包嗨星球小程序
```

### ui库
uview https://www.uviewui.com/components/image.html

### 其他注意事项
##### 1.本项目运行后pages.json会根据src/build/config/模块名.json自动填充，请勿直接修改pages.json导致代码丢失。

#### 2.打包时manifest.json中的h5静态资源路径会替换成/mobile/模块名,不支持自定义名字

