# 个人博客网站
  可前往www.sunkang.xyz查看
  [孙康的个人博客](http://www.sunkang.xyz)
##  前端部分
     使用了vue + vuex + vue-router + iview + axios + vue-awesome-swiper + jquery
     环境搭建
         1.按照官方文档使用node.js安装vue、vue的的脚手架vue-cli和webpack
         2.下载代码，并进入到项目中
         3.执行npm run dev
         4.打包npm run build 生成静态文件，发不到linux服务器上
          由于服务器的带宽较小，尽量打包成多个文件（代码中有），形成异步加载，还有有些资源如iview可以通过cdn方式加载，减少vendor.js大小
##  后台部分
      使用了springboot，主要是负责需要登录的部分内容
      直接下载代码，运行ServerApplication
##  内容部分 -- PublicCMS
       [publiccms](http://www.sunkang.xyz:8080/publiccms/admin/)
       使用了开源系统PublicCMS，负责发布新闻动态等内容
       使用接口的方式与前端集成，并未使用发布静态页面的方式

      安装方式（需要数据库，第一次登录需要初始化数据库）
      1.PublicCMS官网下载一键安装包
      2.上传到linux服务器
      3.进入PublicCMS文件夹执行nohup_startup.sh


##  服务器 - 使用了腾讯云服务器部署
  部署容器
  tomcat8.5 + nginx

  云服务器配置信息
    操作系统	CentOS 7.2 64位
    CPU	1 核
    内存	2 GB
    公网带宽	1 Mbps
