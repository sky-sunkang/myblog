<template>
  <div>
    <v-Header active="technicalExchange"/>
    <div class="newsDetails-div" >
      <div class="news-title-nav">
        <img src="/static/images/home.png" width="16" height="16">
        <span>首页-<span style="color: #CC0202;" id="newsDetailsCrumbs">技术交流</span></span>
      </div>
      <Divider />
      <div id="technicalDetContent">
        <Col class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        </Col>
        <div class="news-title" id="newsDetails-title" v-html="news.title"></div>
        <div class="news-unit" v-if="news.length > 0">
          发布时间：<span id="newsDetails-date">
          {{news.publishDate | formatDate('yyyy-MM-dd') }}
        </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          来源：<span id="newsDetails-author">{{news.author}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          浏览量：<span id="newsDetails-num">{{news.clicks}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          【字体：
          <a href="javascript:changeFont('16px')">大</a>
          <a href="javascript:changeFont('14px')">中</a>
          <a href="javascript:changeFont('12px')">小</a>】
        </div>
        <div class="news-content"  >
          <p id="newsDetails-text" v-html="news.text">
          </p>
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
  name: 'technical-exchange-details',
  data () {
    return {
      news: {
        title: '',
        text: '',
        publishDate: '',
        author: '',
        clicks: 0
      }
    }
  },
  components: {
    'v-Header': Header,
    'v-Foot': Foot
  },
  created () {
    this.$myLoding.start('#technicalDetContent')
    // 初始化新闻
    this.$axios.get('/intf/content.json?id=' + this.$route.params.id)
      .then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        this.$myLoding.stop('#technicalDetContent')
        this.news.text = this.htmlDecode(response.data.text)
        this.news.title = this.htmlDecode(response.data.title)
        this.news.publishDate = new Date(response.data.publishDate).getTime()
        this.news.author = response.data.author == null ? '' : response.data.author
        this.news.clicks = response.data.clicks
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

<style scoped>
  .newsDetails-div{
    width: 1200px;
    min-height: 800px;
    margin: 20px auto 0px;
    background-color: white;
    padding: 30px;
    border-radius: 20px;
  }
  .newsDetails-div .news-title-nav {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    padding-left: 50px;
    padding-top: 10px;
  }
  .newsDetails-div .news-title-nav img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-bottom: 2px;
  }

  .newsDetails-div .news-title {
    text-align: center;
    font-weight: bolder;
    margin-top: 38px;
    font-size: 24px;
    color: #333333;
  }
  .newsDetails-div .news-unit {
    font-size: 12px;
    text-align: center;
    margin-top: 30px;
    color: #999999;
  }
  .news-content{
    font-size: 14px;
    min-height: 300px;
    padding: 40px 70px;
  }
</style>
