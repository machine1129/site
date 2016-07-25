# site
###使用vuejs库 webpack配合gulp构建工具搭建的一个单入口文件按需加载的项目模板

#安装
```
$ git clone https://github.com/machine1129/site.git
$ cd site
$ npm install  （cnpm install）
$ npm run dev

open  http://localhost:8080
```
#示例
地址：https://machine1129.github.io/site/dist/#!/

#解决问题
```
·缓存

·页面文件按需加载

·配置代理模式ajax代理请求项目模拟数据（一个配置决定是请求本地测试数据文件还是服务器接口）

·区分开发模式（自动检测文件更新重新打包依赖文件，开启本地服务器）和项目文件生成模式（更新修改了的文件版本号，压缩代码）
```
