<template>
  <div class="exchange">
    <div class="exchange-in">
      <div class="news-title-nav">
        <img src="/static/images/home.png" width="16" height="16">
        <span>首页-<span style="color: #CC0202;" id="newsDetailsCrumbs">技术交流</span></span>
      </div>
      <Divider />
      <Timeline>
        <TimelineItem  color="green" v-for="exchange in exchanges" :key='exchange.index'>
          <p class="time">{{exchange.publishDate | formatDate('yyyy年MM月dd日') }}</p>
          <img class="arrow" src="../../static/images/leftThree.png">
          <router-link :to="'technicalExchangeDetails/'+exchange.id">
            <div class="exchangeItem" >
              <div>
                <p class="exchangeTitle" >{{exchange.title}}</p>
                <div class="exchangeDesc" >
                  <img class="exchangeCorve" v-lazy="exchange.cover" width="200" height="100">
                  <div class="exchangeDecText">
                    {{exchange.description}}
                  </div>
                </div>
              </div>
            </div>
            <div class="exchangeBelow">
              <span class="exchangeAuthor">
                <Icon type="md-person"/><span>{{exchange.author}}</span>
              </span>
              <span class="exchangeClicks">
                阅读量：
                <span>{{exchange.clicks}}</span>
                <span class="like" >
                  <Icon type="ios-heart" />
                  <span>0</span>
                </span>
                <span class="reply">
                  <Icon type="ios-text" />
                  <span>0</span>
                </span>
              </span>

            </div>
          </router-link>
        </TimelineItem>
        <TimelineItem color="blue"><span class="loadIndustr" v-on:click="loadIndustr()">查看更多</span></TimelineItem>
      </Timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'technical-exchange',
  data () {
    return {
      exchanges: [],
      index: 1
    }
  },
  created () {
    // 行业资讯
    this.$axios.get('/api/directive/contentList?showParameters=false&categoryId=' + this.$store.state.technicalExchangeId +
      '&pageIndex=' + this.index + '&count=4').then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
      var list = response.data.page.list
      this.index = this.index + 1
      for (var i = 0; i < list.length; i++) {
        var obj = list[i]
        this.exchanges.push({id: obj.id, title: obj.title, description: obj.description, publishDate: obj.publishDate, cover: this.$store.state.cmsStaticDir + obj.cover, author: obj.author, clicks: obj.clicks})
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    loadIndustr: function () {
      this.$axios.get('/api/directive/contentList?showParameters=false&categoryId=' + this.$store.state.technicalExchangeId +
        '&pageIndex=' + this.index + '&count=4').then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        if (response.data.page.pageIndex !== this.index) {
          this.$Message.error('英雄，已经加载到底啦！')
          return
        }
        var list = response.data.page.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          this.index = this.index + 1
          this.exchanges.push({id: obj.id, title: obj.title, description: obj.description, publishDate: obj.publishDate, cover: this.$store.state.cmsStaticDir + obj.cover, author: obj.author, clicks: obj.clicks})
        }
        // this.$Message.success('加载成功！')
      }).catch(function (error) {
        this.$Message.error('加载失败：' + error)
      })
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
  .exchange{
    min-height:600px;
    width: 100%;
    margin: 20px 0;
  }
  .exchange a{
    color: black;
  }
  .exchange-in{
    width: 1060px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 20px;
    background-color: white;
  }
  .exchange .news-title-nav {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    /*padding-left: 20px;*/
    padding-top: 10px;
  }
  .exchange .news-title-nav img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-bottom: 2px;
  }
  /*列表部分 begin*/
  .exchangeItem{
    background-color: #eae6d3;
    padding: 20px;
    width: 900px;
    display: inline-block;
    border-radius: 10px 10px 0  0
  }

  .exchangeItem:hover img{
    transform: scale(1.1);
    transition: all 1s ease 0s;
    -webkit-transform: scale(1.1);

  }
  .exchangeItem:hover .exchangeDecText{
    color: #737373
  }
  .exchangeItem:hover .exchangeTitle{
    color: #BF4D3B;
  }
  .arrow{
    border-style: none;
    vertical-align: top;
    margin-right: -6px;
    margin-top: 30px;
  }
  .time{
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  .exchangeTitle{
    color: black;
    font-size: 18px
  }
  .exchangeDesc{
    color: #999999;
    margin-top: 10px
  }
  .exchangeCorve{
    float: left;
    box-shadow:0 0 1px #AAAAAA
  }
  .exchangeDecText{
    display: inline-block;
    width: 600px;
    margin-left: 20px
  }
  .exchangeBelow{
    background-color: #cccbba;
    height: 25px;
    line-height:25px;
    clear: both;
    width: 900px;
    margin-left: 46px;
    border-radius: 0  0 10px 10px;
    color: #999999;
  }
  .exchangeAuthor{
    margin-left: 30px;
  }
  .exchangeAuthor .ivu-icon{
    color: white;
  }
  .exchangeAuthor span{
    margin-left: 3px;
    font-size: 10px;
  }
  .exchangeClicks{
    float: right;
    margin-right: 30px;
  }
  .loadIndustr{
    cursor: pointer;
  }
  .loadIndustr:hover{
    color: #BF4D3B;
  }
  .reply{
    margin-left: 10px;
  }
  .reply:hover {
    color: #BF4D3B;
  }
  .like{
    margin-left: 10px;
  }
  .like:hover{
    color: #BF4D3B;
  }
  /*列表部分 end*/
</style>
