<template>
  <div>
    <div style="height: 44px;background-color: #F7F5F4;"></div>
    <div class="foot">
      <span >Copyright © 2018.粤ICP备18040421号</span>
      <span class="fenge">|</span>
      <span >sunkang.xyz</span>
      <span class="fenge">|</span>
      <span ><img src="../../static/images/access.png"/>累计访问量<span class="access">100</span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot'
}
</script>

<style scoped>
  .foot{
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 24px;
    width: 100%;
    background-color: #4f3f37;
    font-size: 12px;
    color: #999999;
    line-height: 24px;
    z-index: 9999;
  }
  .fenge{
    margin-left: 20px;
    margin-right: 20px;
  }
  .access{
    color: #BF4D3B;
    margin-left: 4px;
  }
  .foot img{
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
