<template>
  <div>
    <!--<transition-->
      <!--appear-->
      <!--name="slide-fade"-->
    <!--&gt;-->
      <div class="header" >
        <div class="hander-top" >
          <div class="wapper-in">
            <div style="width: 500px;float: left;overflow-y: hidden;height: 24px;padding-left: 24px">
              <!--<marquee direction="up" scrolldelay="100"></marquee>
              <marquee direction="up" scrolldelay="100"></marquee>-->
              <ul id="RunTopic">
                <li>博客系统1.0上线啦！！！</li>
                <li>博客系统部分功能正在逐渐开发的过程中！！！</li>
              </ul>
            </div>
            <div style="float: right;width: 400px;text-align: right">
              <!--孙康 -->欢迎您！<a href="/#/login" >[ 登录 ]</a>
              <span class="separate">|</span>
              【退出】
            </div>

          </div>
        </div>
        <div class="hander-bottom">
          <div class="wapper-in">
            <img v-lazy="'../../static/images/logo.png'" height="60" width="200"/>
            <div class="li-div">
              <Menu mode="horizontal" :theme="theme1" @on-select="toMenu" :active-name="active">
                <MenuItem name="index">
                  <Icon type="ios-home"/>
                  首页
                </MenuItem>
                <MenuItem name="industryDynamics">
                  <Icon type="ios-globe"/>
                  行业动态
                </MenuItem>
                <MenuItem name="technicalExchange">
                  <Icon type="ios-bug"/>
                  技术交流
                </MenuItem>
                <MenuItem name="lifeExhibition">
                  <Icon type="md-film"/>
                  生活展览
                </MenuItem>
                <MenuItem name="systemMonitoring">
                  <Icon type="md-analytics" />
                  系统监控
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    <!--</transition>-->
    <div style="height: 85px"></div>
  </div>
</template>

<script>
// 跑马灯
(function ($) {
  $.fn.extend({
    RollTitle: function (opt, callback) {
      if (!opt) {
        opt = {}
      }
      var _this = this
      _this.timer = null
      _this.lineH = _this.find('li:first').height()
      _this.line = opt.line ? parseInt(opt.line, 15) : parseInt(_this.height() / _this.lineH, 10)
      _this.speed = opt.speed ? parseInt(opt.speed, 10) : 3000
      _this.timespan = opt.timespan ? parseInt(opt.timespan, 13) : 5000
      if (_this.line === 0) this.line = 1
      _this.upHeight = 0 - _this.line * _this.lineH
      _this.scrollUp = function () {
        _this.animate({
          marginTop: _this.upHeight
        }, _this.speed, function () {
          for (var i = 1; i <= _this.line; i++) {
            _this.find('li:first').appendTo(_this)
          }
          _this.css({marginTop: 0})
        })
      }
      _this.hover(function () {
        clearInterval(_this.timer)
      }, function () {
        _this.timer = setInterval(function () {
          _this.scrollUp()
        }, _this.timespan)
      }).mouseout()
    }
  })
})(jQuery)
$(document.body).ready(function () {
  $('#RunTopic').RollTitle({line: 1, speed: 200, timespan: 1500})
})
export default {
  name: 'Header',
  data () {
    return {
      theme1: 'light'
    }
  },
  props: ['active'],
  methods: {
    toMenu (e) {
      this.$router.push({name: e})
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    },
    setActive () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    border-bottom: 1px solid #eee;
  }

  .header .ivu-menu-horizontal.ivu-menu-light:after {
    height: 0 !important;
  }

  .hander-top {
    height: 24px;
    line-height: 24px;
    padding-right: 10px;
    font-size: 12px;
    background-color: #BF4D3B;
    color: #F6EDC1;
  }

  .separate {
    margin-left: 20px;
    margin-right: 20px;
  }

  .hander-bottom {
    height: 60px;
    background-color: white;
  }

  .wapper-in {
    width: 1000px;
    margin: 0 auto;
    height: 100%;
  }

  .wapper-in img {
    float: left;
  }

  .li-div {
    display: inline-block;
    float: right;
    height: 100%;
  }

  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: #BF4D3B;
    border-bottom: 2px solid #BF4D3B;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
