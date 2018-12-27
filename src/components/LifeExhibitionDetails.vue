<template>
  <div>
    <v-Header active="lifeExhibition"/>
    <div class="lifeExhibitionDetails-div" >
      <div class="lifeExhibition-title-nav">
        <img src="/static/images/home.png" width="16" height="16">
        <span>首页-<span style="color: #CC0202;" id="lifeExhibitionDetailsCrumbs">生活展览</span></span>
      </div>
      <Divider />
      <div>
        <div id="lifeExhibitionDetailsContent">
          <Col class="demo-spin-col" span="8">
          <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
          </Col>
          <div class="lifeExhibition-title" id="lifeExhibitionDetails-title" v-html="lifeExhibition.title"></div>
          <div class="lifeExhibition-unit" v-if="lifeExhibition.length > 0">
            发布时间：<span id="lifeExhibitionDetails-date">
          {{lifeExhibition.publishDate | formatDate('yyyy-MM-dd') }}
        </span>a
            &nbsp;&nbsp;&nbsp;&nbsp;
            来源：<span id="lifeExhibitionDetails-author">{{lifeExhibition.author}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            浏览量：<span id="lifeExhibitionDetails-num">{{lifeExhibition.clicks}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            【字体：
            <a href="javascript:changeFont('16px')">大</a>
            <a href="javascript:changeFont('14px')">中</a>
            <a href="javascript:changeFont('12px')">小</a>】
          </div>
          <div class="lifeExhibition-content"  >
            <p id="lifeExhibitionDetails-text" v-html="lifeExhibition.text">
            </p>
          </div>
        </div>
      </div>
    </div>
    <v-Foot/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Foot from '../components/Foot'
export default {
  name: 'lifeExhibition-details',
  data () {
    return {
      lifeExhibition: {
        title: '',
        text: '',
        publishDate: '',
        author: '',
        clicks: 0,
        video: ''
      }
    }
  },
  components: {
    'v-Header': Header,
    'v-Foot': Foot
  },
  created () {
    this.$myLoding.start('#lifeExhibitionDetailsContent')
    // 初始化新闻
    this.$axios.get('/intf/content.json?id=' + this.$route.params.id)
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        this.$myLoding.stop('#lifeExhibitionDetailsContent')
        this.lifeExhibition.text = this.htmlDecode(response.data.text)
        this.lifeExhibition.title = this.htmlDecode(response.data.title)
        this.lifeExhibition.publishDate = new Date(response.data.publishDate).getTime()
        this.lifeExhibition.author = response.data.author == null ? '' : response.data.author
        this.lifeExhibition.clicks = response.data.clicks
      })
      .catch(function (error) {
        console.log(error)
      })
    // 改变点击数
    this.$axios.get('/api/contentClick?id=' + this.$route.params.id)
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    htmlDecode (value) { // 把转义的字符串转义回来
      return $('<p/>').html(value).text()
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
<style >
  .lifeExhibitionDetails-div{
    width: 1200px;
    min-height: 800px;
    margin: 20px auto 0px;
    background-color: white;
    padding: 30px;
    border-radius: 20px;
  }
  .lifeExhibitionDetails-div .lifeExhibition-title-nav {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    padding-left: 50px;
    padding-top: 10px;
  }
  .lifeExhibitionDetails-div .lifeExhibition-title-nav img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-bottom: 2px;
  }

  .lifeExhibitionDetails-div .lifeExhibition-title {
    text-align: center;
    font-weight: bolder;
    margin-top: 38px;
    font-size: 24px;
    color: #333333;
  }
  .lifeExhibitionDetails-div .lifeExhibition-unit {
    font-size: 12px;
    text-align: center;
    margin-top: 30px;
    color: #999999;
  }
  .lifeExhibition-content{
    font-size: 14px;
    min-height: 300px;
    padding: 40px 70px;
  }
  #lifeExhibitionDetails-text img{
    max-width: 800px !important;
    height: auto;
  }
</style>
