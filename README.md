## useage

## install
1. setup nodejs
   Mac [nodejs stl 4.4.7](https://nodejs.org/)
   Linux 网站直接下载对应的tar.gz包，自己编译
2. npm i -g fis3
3. fis3 install

### develop deps fis plugins
fis3-parser-vue-component
fis-parser-jade
fis3-parser-less-2.x
fis-parser-babel2
babel-core
babel-loader
babel-plugin-transform-runtime
babel-preset-es2015


## 开发环境
1、mac + item2 + vim[sublime3]
2、fis-conf.js +  *.vue(jade, less, es6[babel-parse])

## release 静态文件
sh release.sh
###
  修改_release.sh 可以部署到你部署的位置
  fis3 release [-wcL] -d deploy_path
### 部署
### nginx 配置如下
   server
   {
     listen 80;
     server_name rd.designer.com;

     access_log  /Users/senli/Downloads/nginx/access.log;
     error_log  /Users/senli/Downloads/nginx/error.log;

     # *.html path
     location / {
        root $PATH/src/page;
        index index.html;
     }

     # js, image, css path
     location /src {
       root $PATH;
     }

     # proxy web-backend api 
     location ~* /api/(.*) {
         proxy_set_header Host 180.76.149.212:8081;
         proxy_pass http://180.76.149.212:8081/$request_uri;
     }
   }
=== 调试fis框架 ===
devtool 调试fis命令
sh debug-fis.sh










