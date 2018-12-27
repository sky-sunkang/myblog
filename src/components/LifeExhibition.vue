<template>
  <div>
    <v-Header active="lifeExhibition"/>
    <div class="life">
      <div class="life-in">
        <div class="news-title-nav">
          <img src="/static/images/home.png" width="16" height="16">
          <span>首页-<span style="color: #CC0202;" id="newsDetailsCrumbs">生活展览</span></span>
        </div>
        <Divider />
        <div id="lifeContent">
          <Col class="demo-spin-col" span="8">
          <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
          </Col>
          <div class="lifeDiv">
            <div class="lifeRow"  v-for="life in lifes" :key='life.index'>
              <router-link :to="'lifeExhibitionDetails/'+life.id">
                <img v-lazy="life.cover" width="220" height="180"/>
                <div class="lifeTitle" :title="life.title"><a target="_blank" href="home#/videoDetails/449637">{{life.title | lengthInterception(10)}}</a></div>
                <div class="lifeNum"><a target="_blank" :href="'lifeExhibitionDetails/'+life.id">浏览：{{life.clicks}}</a></div>
              </router-link>
            </div>
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
  name: 'life-exhibition',
  data () {
    return {
      lifes: []
    }
  },
  components: {
    'v-Header': Header,
    'v-Foot': Foot
  },
  created () {
    this.$myLoding.start('#lifeContent')
    // 生活展览
    this.$axios.get('/api/directive/contentList?showParameters=false&categoryId=' + this.$store.state.lifeId +
      '&pageIndex=' + this.index + '&count=4').then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
      this.$myLoding.stop('#lifeContent')
      var list = response.data.page.list
      this.index = this.index + 1
      for (var i = 0; i < list.length; i++) {
        var obj = list[i]
        this.lifes.push({id: obj.id, title: obj.title, description: obj.description, publishDate: obj.publishDate, cover: this.$store.state.cmsStaticDir + obj.cover, author: obj.author, clicks: obj.clicks})
      }
    }).catch(function (error) {
      console.log(error)
    })
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
  .life{
    width: 100%;
    margin: 20px 0;
  }
  .life-in{
    min-height:600px;
    width: 1060px;
    margin: 0 auto;
    padding: 30px;
    background-color: white;
    border-radius: 20px;
  }

  .life .news-title-nav {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    /*padding-left: 20px;*/
    padding-top: 10px;
  }
  .life .news-title-nav img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-bottom: 2px;
  }
  .lifeDiv{
    width:985px ;
    margin: 0 auto;
  }
  .lifeRow{
    width: 220px;
    height: 280px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.13);
  }
  .lifeRow img{
    border-bottom: 1px solid #EEEEEE;
  }
  .lifeTitle {
    width: 100%;
    margin-top: 20px;
    text-align: center;
    height: 19px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0.9px;
    color: #333333;
  }
  .lifeNum {
    width: 100%;
    margin-top: 15px;
    text-align: center;
    height: 16px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1.3px;
    color: #666666;
  }
</style>
