<template>
  <div id="app">
    <router-view/>
    <div id="tbox"> <a id="togbook" href="#"></a>
    <a id="gotop" href="javascript:void(0)" v-on:click="toTop" style="display: block;"></a> </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // 当拉到超出页面10按钮出来
    window.onresize = window.onscroll = window.onload = function () {
      var oSearch = document.getElementById('gotop')
      var bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (bodyScrollTop > 10) {
        oSearch.style.display = 'block'
      } else {
        oSearch.style.display = 'none'
      }
    }
  },
  methods: {
    toTop: function () {
      $('html,body').animate({scrollTop: 0}, 500)
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0;
  }
  a:hover{
    color: #BF4D3B;
  }
  .ivu-message{
    z-index: 9999;
  }

  #tbox {
    width: 54px;
    float: right;
    position: fixed;
    right: 30px;
    bottom: 30px;
    _position: absolute;
    _bottom: auto;
    _margin-bottom: 15px;
  }/*解决IE6下不兼容 position:fixed 的问题*/
  #togbook, #gotop {
    width: 44px;
    height: 46px;
    display: block;
    background:url(../static/images/icons.png) no-repeat  #4f3f37 ;
    box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7);
    border-radius: 6px;}
  #togbook {
    margin: 5px 0 ;
    background-position:6px -411px;
  }
  #gotop {
    background-position:7px -371px;
  }
  #togbook:hover, #gotop:hover {
    opacity: 0.5
  }
  a {
    text-decoration: none;
    color: #5D5D5D;
    transition: all ease;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
  }
  /*加载中*/
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 150px;
    width: 100%;
    float: none !important;
  }
</style>
