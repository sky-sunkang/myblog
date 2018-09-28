<template>
  <div class="industry">
    <div class="industry-in">
      行业动态
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  name: 'industry-dynamics',
  components: {
    'v-Header': Header
  }
}
</script>

<style scoped>
  .industry{
    min-height:600px;
    width: 100%;
    background-color: white;
    margin: 20px 0;
  }
  .industry-in{
    width: 1060px;
    margin: 0 auto;
    padding: 30px;
  }
</style>
