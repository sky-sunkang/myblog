<template>
  <div>
    <v-Header active="systemMonitoring"/>
    <div class="monitor">
      <div class="monitor-in">
        <div class="news-title-nav">
          <img src="/static/images/home.png" width="16" height="16">
          <span>首页-<span style="color: #CC0202;" id="newsDetailsCrumbs">系统监控</span></span>
        </div>
        <Divider />
        <div id="systemContent">
          <Col class="demo-spin-col" span="8">
          <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
          </Col>
          <div id="memery" style="width: 400px;height:250px;display: inline-block">
          </div>
          <div id="disk" style="width: 400px;height:250px;display: inline-block;margin-left: 150px">
          </div>
          <div id="cpu" style="width: 980px;height:250px;;margin-top: 30px">
          </div>
          <div id="net" style="width: 980px;height:250px;margin-top: 30px">
          </div>
        </div>
        <!--<iframe src="http://sunkang.xyz:8888/server/monitorHtml" height="600" width="1200" frameborder="0" scrolling="auto"  ></iframe>-->
      </div>
    </div>
    <v-Foot/>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Header from '../components/Header'
import Foot from '../components/Foot'
export default {
  name: 'system-monitoring',
  data: function () {
    return {
      optionsNet: {
        title: {
          text: '服务器带宽（KB）'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['外网出带宽', '外网入带宽']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '外网入带宽',
            type: 'line',
            symbol: 'none',
            data: []
          },
          {
            name: '外网出带宽',
            type: 'line',
            symbol: 'none',
            data: []
          }
        ]
      },
      optionCpu: {
        title: {
          text: 'CPU（%）'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'line',
          symbol: 'none'
        }]
      },
      optionMemery: {
        title: {
          text: '内存使用情况（M）',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['已使用', '未使用', '闲置']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '使用情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '已使用'},
              {value: 310, name: '未使用'},
              {value: 234, name: '闲置'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      optionDisk: {
        title: {
          text: '硬盘使用情况',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        color: ['#c23531', '#2f4554'],
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['已使用', '未使用']
        },
        series: [
          {
            name: '使用情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '已使用'},
              {value: 310, name: '未使用'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  components: {
    'v-Header': Header,
    'v-Foot': Foot
  },
  mounted () {
    this.init()
    setInterval(() => {
      this.update()
    }, 10 * 60 * 1000)
  },
  methods: {
    init: function () {
      this.$myLoding.start('#systemContent')
      // 初始化网络
      this.$axios.get('/server/monitor').then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        this.$myLoding.stop('#systemContent')
        var list = response.data.reverse()
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          var createDate = obj.createDate
          // createDate = this.formatDate(createDate, 'HH:mm:ss')
          // 初始化网络
          this.optionsNet.xAxis.data.push(createDate)
          this.optionsNet.series[0].data.push(obj.inSpeed)
          this.optionsNet.series[1].data.push(obj.outSpeed)
          // 初始化cpu
          this.optionCpu.xAxis.data.push(createDate)
          this.optionCpu.series[0].data.push(obj.cpu)
          // 内存
          this.optionMemery.series[0].data[0] = {value: obj.memeryUsed - obj.memeryBuff, name: '已使用'}
          this.optionMemery.series[0].data[1] = {value: obj.memeryBuff, name: '未使用'}
          this.optionMemery.series[0].data[2] = {value: obj.memeryFree, name: '闲置'}
          // 硬盘
          this.optionDisk.title.text = '硬盘使用情况（总共' + obj.diskTotalspace + 'G）'
          this.optionDisk.series[0].data[0] = {value: obj.diskUsed, name: '已使用'}
          this.optionDisk.series[0].data[1] = {value: obj.diskTotalspace - obj.diskUsed, name: '未使用'}
        }
        // 渲染echarts
        var net = echarts.init(document.getElementById('net'))
        net.setOption(this.optionsNet)
        var cpu = echarts.init(document.getElementById('cpu'))
        cpu.setOption(this.optionCpu)
        var memery = echarts.init(document.getElementById('memery'))
        memery.setOption(this.optionMemery)
        var disk = echarts.init(document.getElementById('disk'))
        disk.setOption(this.optionDisk)
      }).catch(function (error) {
        console.log(error)
      })
    },
    update: function () {
      this.$axios.get('/server/monitor').then((response) => { // 或者我们可以使用 ES6 的 箭头函数arrow function，箭头方法可以和父方法共享变量.否则不能在钩子函数中调用this.banners
        var list = response.data
        // 网络
        var obj = list[0]
        var createDate = obj.createDate
        this.optionsNet.xAxis.data.push(createDate)
        this.optionsNet.series[0].data.push(obj.inSpeed)
        this.optionsNet.series[1].data.push(obj.outSpeed)
        // cpu
        this.optionCpu.xAxis.data.push(createDate)
        this.optionCpu.series[0].data.push(obj.cpu)
        // 内存
        this.optionMemery.series[0].data[0] = {value: obj.memeryUsed - obj.memeryBuff, name: '已使用'}
        this.optionMemery.series[0].data[1] = {value: obj.memeryBuff, name: '未使用'}
        this.optionMemery.series[0].data[2] = {value: obj.memeryFree, name: '闲置'}
        // 硬盘
        this.optionDisk.title.text = '硬盘使用情况（总共' + obj.diskTotalspace + 'G）'
        this.optionDisk.series[0].data[0] = {value: obj.diskUsed, name: '已使用'}
        this.optionDisk.series[0].data[1] = {value: obj.diskTotalspace - obj.diskUsed, name: '未使用'}
        // 渲染echarts
        var net = echarts.init(document.getElementById('net'))
        net.setOption(this.optionsNet)
        var cpu = echarts.init(document.getElementById('cpu'))
        cpu.setOption(this.optionCpu)
        var memery = echarts.init(document.getElementById('memery'))
        memery.setOption(this.optionMemery)
        var disk = echarts.init(document.getElementById('disk'))
        disk.setOption(this.optionDisk)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .monitor{
    min-height:600px;
    width: 100%;
    margin: 20px 0;
  }
  .monitor-in{
    width: 1060px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 20px;
    background-color: white;
  }

  .monitor .news-title-nav {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    /*padding-left: 20px;*/
    padding-top: 10px;
  }
  .monitor .news-title-nav img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-bottom: 2px;
  }
</style>
