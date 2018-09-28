<template>
  <div>
    <!--内容 begin-->
    <div class="context">
      <div class="industry">
        <div class="industry-in">
          <div class="industryNews">
            <!--在swiper上面使用v-if=‘item.length’,确保图片获取完成之后再渲染swiper组件-->
            <swiper :options="swiperOption" ref="swiperOption" v-if='banners.length'>
              <swiper-slide v-for="banner in banners" :key='banner.title'>
                <img :src="banner.path" height="100%" width="100%"/>
                <div class="banner-dec">
                  {{banner.title}}
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="industryDynamics">
            <div class="industryDynamicsTitle">
              <img src="../../static/images/diamond.png" width="23" height="16"/>
              <span>技术资讯</span>
              <a href="#">查看更多>></a>
            </div>
            <div class="industryDynamicsCon">
              <div class="dynamicRow" v-for="dynamic in dynamics" :key='dynamic.id'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--生活展览&技术交流-->
      <div class="regulationsExhibition">
        <div  class="regulationsExhibition-in">
          <!--技术交流-->
          <div style="width: 515px; display: inline-block;height: 300px;padding: 20px 0">
            <div class="industryDynamicsTitle">
              <img src="../../static/images/diamond.png" width="23" height="16"/>
              <span>技术交流</span>
              <a href="#">查看更多>></a>
            </div>
            <div class="technicalExchangeDiv">
              <div class="technicalExchangeRow" v-for="technicalExchange in technicalExchanges" :key="technicalExchange.id">
                <div class="technicalExchangeTitle">
                  <div></div>
                  <a href="javascript:downFile('upload/2018/09-13/09-48-5309591663577314.pdf','449703')">
                    {{technicalExchange.title | lengthInterception(80)}}
                  </a>
                </div>
                <div class="technicalExchangeDate">
                  {{technicalExchange.publishDate | formatDate('yyyy-MM-dd')}}
                </div>
              </div>
            </div>
          </div>
          <!--生活展览-->
          <div style="width: 440px;display: inline-block;height: 300px;margin-left: 40px;padding: 20px 0">
            <div class="industryDynamicsTitle">
              <img src="../../static/images/diamond.png" width="23" height="16"/>
              <span>生活展览</span>
              <a href="#">查看更多>></a>
            </div>
            <div style="margin-top: 20px" class="">
              <img style="float: right;border:1px solid #F2F2F2" src="../../static/images/logo.png" width="440" height="250"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容 end-->
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
// import {formatDate} from '../common/date.js'
// import {lengthInterception} from '../common/str.js'

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
    this.$axios.get('/contentList?showParameters=false&categoryId=' + this.$store.state.dynamicNewsId + '&pageIndex=1&count=3')
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        console.log(response)
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.banners.push({title: obj.title, path: this.$store.state.cmsStaticDir + obj.cover})
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    // 行业资讯
    this.$axios.get('/contentList?showParameters=false&categoryId=' + this.$store.state.dynamicId + '&pageIndex=1&count=4')
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.dynamics.push({title: obj.title, description: obj.description, publishDate: obj.publishDate})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    //  技术交流
    this.$axios.get('/contentList?showParameters=false&categoryId=' + this.$store.state.technicalExchangeId + '&pageIndex=1&count=3')
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.technicalExchanges.push({title: obj.title, publishDate: obj.publishDate})
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
    swiperSlide
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
    height: 20px
  }
  .dynamicRowYear{
    width: 50px;
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
