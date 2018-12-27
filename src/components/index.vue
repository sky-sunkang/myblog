<template>
  <div>
    <v-Header active="index"/>
    <div class="info">
      <!--<div class="card">
        <h1>我的名片</h1>
        <p>网名：sunkang | 孙康</p>
        <p>职业：JAVA软件工程师</p>
        <p>电话：13016488900</p>
        <p>Email：sky_sunkang@163.com</p>
        <ul class="linkmore">
          <li><a href="/" class="talk" title="给我留言"></a></li>
          <li><a href="/" class="address" title="联系地址"></a></li>
          <li><a href="/" class="email" title="给我写信"></a></li>
          <li><a href="/" class="photos" title="生活照片"></a></li>
          <li><a href="/" class="heart" title="关注我"></a></li>
        </ul>
      </div>-->
      <figure>
        <img v-lazy="'../../static/images/art.jpg'" alt="秋。。。相知" width="1000">
        <figcaption>
          <strong>我的名片</strong>
          <p>网名：sunkang | 孙康</p>
          <p>职业：JAVA软件工程师</p>
          <p>电话：13016488900</p>
          <p>Email：sky_sunkang@163.com</p>
        </figcaption>
        <div class="figcaptionRight">
          <strong>渡人如渡己，渡己，亦是渡。</strong>
          当我们被误解时，会花很多时间去辩白。 但没有用，没人愿意听，大家习惯按自己的所闻、理解做出判别，每个人其实都很固执。与其努力且痛苦的试图扭转别人的评判，不如默默承受，给大家多一点时间和空间去了解。而我们省下辩解的功夫，去实现自身更久远的人生价值。其实，渡人如渡己，渡已，亦是渡人。
        </div>
      </figure>
    </div>
    <!--内容 begin-->
    <div class="context">
      <div class="industry">
        <div class="industry-in">
          <div class="industryNews" id="industryNews">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            </Col>
            <!--在swiper上面使用v-if=‘item.length’,确保图片获取完成之后再渲染swiper组件-->
            <swiper :options="swiperOption" ref="swiperOption" v-if='banners.length'>
              <swiper-slide v-for="banner in banners" :key='banner.title'>
                <router-link :to="'newsDetails/'+banner.id">
                  <img :src="banner.path" height="100%" width="100%"/>
                  <div class="banner-dec">
                    {{banner.title}}
                  </div>
                </router-link>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="industryDynamics" id="industryDynamics">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            </Col>
            <div class="industryDynamicsTitle" v-if="dynamics.length > 0">
              <img src="../../static/images/diamond.png" width="23" height="16"/>
              <span>行业动态</span>
              <a href="/#/industryDynamics">查看更多>></a>
            </div>
            <div class="industryDynamicsCon">
              <div class="dynamicRow" v-for="dynamic in dynamics" :key='dynamic.index'>
                <router-link :to="'newsDetails/'+dynamic.id">
                  <div class="dynamicRowLeft">
                    <p class="dynamicRowDay">
                      {{dynamic.publishDate | formatDate('dd') }}
                    </p>
                    <p class="dynamicRowYear">
                      {{dynamic.publishDate | formatDate('yyyy-MM') }}
                    </p>
                  </div>
                  <div class="dynamicRowRight">
                    <div class="dynamicRowTitle">
                      {{dynamic.title | lengthInterception(30)}}
                    </div>
                    <div class="dynamicRowContont">
                      {{dynamic.description | lengthInterception(80)}}
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--生活展览&技术交流-->
      <div class="regulationsExhibition">
        <div  class="regulationsExhibition-in">
          <!--技术交流-->
          <div id="technicalExchange" style="width: 515px; display: inline-block;height: 300px;padding: 20px 0">
            <Col class="demo-spin-col" span="8">
            <Spin fix>
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            </Col>
            <div class="industryDynamicsTitle" v-if="technicalExchanges.length > 0">
              <img src="../../static/images/diamond.png" width="23" height="16"/>
              <span>技术交流</span>
              <a href="/#/technicalExchange">查看更多>></a>
            </div>
            <div class="technicalExchangeDiv">
              <div class="technicalExchangeRow" v-for="technicalExchange in technicalExchanges" :key="technicalExchange.id">
                <router-link :to="'technicalExchangeDetails/'+technicalExchange.id">
                  <div class="technicalExchangeTitle">
                    <div></div>
                    <a href="javascript:downFile('upload/2018/09-13/09-48-5309591663577314.pdf','449703')">
                      {{technicalExchange.title | lengthInterception(80)}}
                    </a>
                  </div>
                  <div class="technicalExchangeDate">
                    {{technicalExchange.publishDate | formatDate('yyyy-MM-dd')}}
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!--生活展览-->
          <div id="lifeExhibition" style="width: 440px;display: inline-block;height: 300px;margin-left: 40px;padding: 20px 0">
            <!--<Col class="demo-spin-col" span="8">
            <Spin fix>
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            </Col>-->
            <div class="industryDynamicsTitle">
              <img src="../../static/images/diamond.png" width="23" height="16"/>
              <span>生活展览</span>
              <a href="/#/lifeExhibition">查看更多>></a>
            </div>
            <div style="margin-top: 20px" class="industryDynamicsContent">
              <img style="float: right;border:1px solid #F2F2F2" src="../../static/images/logo.png" width="440" height="250"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容 end-->
    <v-Foot/>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
// import {formatDate} from '../common/date.js'
// import {lengthInterception} from '../common/str.js'
import Header from '../components/Header'
import Foot from '../components/Foot'
export default {
  data () {
    return {
      theme1: 'light',
      banners: [], // [{title: '博客系统于2018-09-10正式开始搭建', path: '/static/images/0.jpg'}, {title: '我是第二张图', path: '/static/images/1.jpg'}, {title: '我是第三张图', path: '/static/images/2.jpg'}],
      dynamics: [], // 技术资讯
      technicalExchanges: [], // 技术交流
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
          // stopOnLastSlide: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        observeParents: true,
        observer: true
      }
    }
  },
  created () {
    // 初始化首页轮播图
    this.$axios.get('/api/directive/contentList?showParameters=false&categoryId=' + this.$store.state.dynamicNewsId + '&pageIndex=1&count=3')
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        this.$myLoding.stop('#industryNews')
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.banners.push({id: obj.id, title: obj.title, path: this.$store.state.cmsStaticDir + obj.cover})
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    // 行业资讯
    this.$axios.get('/api/directive/contentList?showParameters=false&categoryId=' + this.$store.state.dynamicId + '&pageIndex=1&count=4')
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        this.$myLoding.stop('#industryDynamics')
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.dynamics.push({id: obj.id, title: obj.title, description: obj.description, publishDate: obj.publishDate})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    //  技术交流
    this.$axios.get('/api/directive/contentList?showParameters=false&categoryId=' + this.$store.state.technicalExchangeId + '&pageIndex=1&count=3')
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        this.$myLoding.stop('#technicalExchange')
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.technicalExchanges.push({id: obj.id, title: obj.title, publishDate: obj.publishDate})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  components: {
    'swiper':
    swiper,
    'swiperSlide':
    swiperSlide,
    'v-Header': Header,
    'v-Foot': Foot
  },
  methods: {
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
    }
  },
  filters: {
    formatDate (cellval, formatStr) {
      // return formatDate(time, formatStr)
      var dateVal = cellval + ''
      if (cellval != null) {
        var date = new Date(parseInt(dateVal.replace('/Date(', '').replace(')/', ''), 10))
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        if (formatStr === 'yyyy-MM-dd HH:mm:ss') {
          return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hours + ':' + minutes + ':' + seconds
        } else if (formatStr === 'yyyy-MM-dd') {
          return date.getFullYear() + '-' + month + '-' + currentDate
        } else if (formatStr === 'yyyy-MM') {
          return date.getFullYear() + '-' + month
        } else if (formatStr === 'dd') {
          return currentDate
        } else if (formatStr === 'yyyy年MM月dd日') {
          return date.getFullYear() + '年' + month + '月' + currentDate + '日'
        }
      }
    },
    lengthInterception (str, maxLength) {
      if (str == null || str === '') {
        return ''
      } else {
        var len = str.length
        if (len > maxLength) {
          return str.substring(0, maxLength) + '...'
        } else {
          return str
        }
      }
    }
  }
}
</script>
<style scoped>
  a:link, a:visited {
    text-decoration: none;
  }
  a:link, a:visited {
    color: #222222;
    text-decoration: none;
    font-size: 14px;
  }
  ul,ol{
    text-decoration:none;
    list-style:none;
  }
  /*info部分开始*/
  .info{
    width:1000px;
    height: 250px;
    margin:0 auto;
    overflow:hidden;
    clear:both;
    -webkit-animation:run 5s linear 2s infinite;
    /* 动画名称 一次的时间 速度曲线 什么时候开始 循环次数 */
  }

  .info figure{
    width:1000px;
    height:250px;
    display:block;
    overflow:hidden;
    position:relative;
    /*border-radius:8px;*/
    -webkit-animation:pageTop 6s ease 0.5s backwards;
    -moz-animation:pageTop 6s ease 0.5s backwards;
    -o-animation:pageTop 6s ease 0.5s backwards;
    -ms-animation:pageTop 6s ease 0.5s backwards;
    animation:pageTop 6s ease 0.5s backwards;
    float:right;
  }

  .info figcaption{
    padding:20px;
    position:absolute;
    top:20%;
    left:0px;
    background-color:rgba(155,155,155,0.7);
    color:#FFF;
    opacity:0;
    -webkit-transition:ease-out opacity 0.75s;
    -moz-transition:opacity 0.75s ease-out;
    -ms-transition:opacity 0.75s ease-out;
    -o-transition:opacity 0.75s ease-out;
    width: 300px;
  }

  .info .figcaptionRight{
    width: 475px;
    padding:20px;
    position:absolute;
    top:20%;
    right:0px;
    background-color:rgba(155,155,155,0.7);
    color:#FFF;
    opacity:0;
    -webkit-transition:ease-out opacity 0.75s;
    -moz-transition:opacity 0.75s ease-out;
    -ms-transition:opacity 0.75s ease-out;
    -o-transition:opacity 0.75s ease-out;
  }

  .info figure:hover .figcaptionRight{
    opacity:1;
  }

  .info .figcaptionRight strong{
    display:block;
    line-height:40px;
  }

  .info figure:hover figcaption{
    opacity:1;
  }
  .info figure figcaption{
    opacity:1;
  }
  .info figcaption strong{
    display:block;
    line-height:40px;
  }
  /*info部分结束*/
  /**card部分开始*/
  /*.card{*/
    /*box-shadow:0px 1px 0px rgba(255,255,255,0.1),inset 0px 1px 1px rgba(0,0,0,0.7);*/
    /*border-radius:8px;*/
    /*background:url(../../static/images/quote-bg.png) no-repeat top right #BF4D3B;*/
    /*width:350px;*/
    /*height:250px;*/
    /*float:left;*/
    /*overflow:hidden;*/
  /*}*/
  /*.card h1{*/
    /*padding:10px;*/
    /*color:#999;*/
  /*}*/
  /*.card p{*/
    /*padding-left:40px;*/
    /*line-height:27px;*/
    /*color:#CCC;*/
    /*-webkit-animation:animations2 5s ease-in-out 5s;*/
    /*-moz-animation:animations2 5s ease-in-out 5s;*/
    /*-ms-animation:animations2 5s ease-in-out 5s;*/
    /*-o-animation:animations2 5s ease-in-out 5s;*/
  /*}*/
  /*.linkmore{*/
    /*padding:15px 0px 0px 15px;*/
  /*}*/
  /*.linkmore li a {*/
    /*height: 50px;*/
    /*width: 50px;*/
    /*display: block;*/
    /*overflow: hidden;*/
    /*box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7);*/
    /*border-radius: 50%;*/
    /*float: left;*/
    /*margin: 0 5px;*/
  /*}*/
  /*.linkmore li a:hover{*/
    /*opacity:0.5;*/
    /*-webkit-transform:rotate(30deg);*/
    /*-moz-transform:rotate(30deg);*/
    /*-ms-transform:rotate(30deg);*/
    /*-o-transform:rotate(30deg);*/
  /*}*/
  /*.talk, .address, .email, .photos, .heart{*/
    /*background:url(../../static/images/icons.png) no-repeat;*/
  /*}*/
  /*.talk { background-position: 13px 18px }*/
  /*.address{*/
    /*background-position:12px -22px;*/
  /*}*/
  /*.email { background-position: 12px -60px }*/
  /*.photos { background-position: 12px -137px }*/
  /*.heart { background-position: 13px -99px }*/
  /*card部分结束*/
  .context{
    margin-top: -20px;
  }
  /*业务动态 begin*/
  .industry {
    background-color: white;
    height: 360px;
    margin-top: 20px;
    padding: 30px;
  }

  .industry-in {
    width: 1000px;
    margin: 0 auto;
    min-height: 400px;
    border-radius: 10px;
  }

  .industryNews {
    width: 400px;
    display: inline-block
  }

  .industry .swiper-container {
    height: 300px !important;
  }

  .banner-dec {
    background-color: #BF4D3B;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    opacity: 0.7;
    line-height: 40px;
    color: white;
    padding-left: 15px;
    font-size: 18px;
  }

  .industry .swiper-pagination {
    text-align: right;
    line-height: 40px;
  }

  .industry .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0;
  }

  .industryDynamics {
    width: 506px;
    margin-left: 30px;
    display: inline-block;
    height: 300px;
    float: right;
    line-height: 30px;
  }

  .industryDynamicsTitle {
    height: 30px;
    border-bottom:1px solid #F2F2F2
  }

  .industryDynamicsTitle span {
    font-size: 18px;
    margin-left: 5px;
  }

  .industryDynamicsTitle a {
    color: #BF4D3B;
    float: right;
  }
  .industryDynamicsContent:hover img {
    transform: scale(1.02);
    transition: all 1s ease 0s;
    -webkit-transform: scale(1.02);

  }
  .dynamicRow {
    margin-top: 10px;
    clear: both;
  }
  .dynamicRowLeft {
    color: #666666;
    width: 50px;
    display: inline-block;
    vertical-align: top;
  }
  .dynamicRowDay{
    width: 50px;
    text-align: right;
    font-size: 24px;
    height: 25px
  }
  .dynamicRowYear{
    width: 64px;
    text-align: right;
    margin-top: 5px
  }
  .dynamicRowRight{
    width: 420px;
    display: inline-block;
    margin-left: 30px;
    clear: both
  }
  .dynamicRowTitle{
    font-size: 14px;
    font-weight: bold;
    height: 20px;
    line-height: 20px
  }
  .dynamicRowContont{
    margin-top: 4px;
    font-size: 12px;
    line-height: 14px;
    color: #999999 !important;
  }
  /*业务动态 end*/
  /*技术交流&生活展览 begin*/
  .regulationsExhibition {
    background-color: white;
    height: 350px;
    margin-top: 20px;
  }
  .regulationsExhibition-in{
    width: 1000px;
    margin: 0 auto;
    min-height: 400px;
    border-radius: 10px;
  }
  .technicalExchangeRow{
    padding-top: 13px;
    clear: both;
  }
  .technicalExchangeTitle{
    float: left;
    height: 19px;
    line-height: 19px;
  }
  .technicalExchangeTitle div {
    height: 6px;
    width: 6px;
    background-color: #dcc6a6;
    float: left;
    margin-right: 10px;
    margin-top: 6px;
  }
  .technicalExchangeDate{
    height: 19px;
    line-height: 19px;
    float: right;
    font-size: 14px;
    color: #999;
  }
  /*技术交流&生活展览 end*/

</style>
