<template>
  <div class="login">
    <div class="news-title-nav">
      <img src="/static/images/home.png" width="16" height="16">
      <span><span style="color: #CC0202;" id="newsDetailsCrumbs">用户注册</span></span>
    </div>
    <Divider />
    <Steps :current="current" style="margin-bottom: 50px">
      <Step title="用户名及密码" ></Step>
      <Step title="个人信息" ></Step>
      <Step title="邮箱" ></Step>
      <Step title="完成" ></Step>
    </Steps>
    <div class="content">
      <div class="userName">
        <div style="width: 600px;margin: 0 auto">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  :label-width="80">
            <FormItem label="用户名：" prop="username">
              <Input v-model="formValidate.username" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码：" prop="password">
              <Input v-model="formValidate.password" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="step(1)">下一步</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="personal">
        个人信息
        <Button type="primary" @click="step(2)">下一步</Button>
      </div>
      <div class="email">
        邮箱
        <Button type="primary" @click="step(3)">下一步</Button>
      </div>
      <div class="finsh">
        注册成功，如果没有自动返回请点击
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      current: 0,
      formValidate: {
        username: '',
        password: ''
      },
      ruleValidate: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created  () {
  },
  methods: {
    step (step) { // 步骤跳转
      this.current = step
      switch (this.current) {
        case 0:
          $('.userName').show()
          $('.personal').hide()
          $('.email').hide()
          $('.finsh').hide()
          break
        case 1:
          $('.userName').hide()
          $('.personal').show()
          $('.email').hide()
          $('.finsh').hide()
          break
        case 2:
          $('.userName').hide()
          $('.personal').hide()
          $('.email').show()
          $('.finsh').hide()
          break
        case 3:
          $('.userName').hide()
          $('.personal').hide()
          $('.email').hide()
          $('.finsh').show()
          break
      }
    }
  }
}
</script>

<style scoped>
  .login{
    background-color: white;
    height: 100%;
    padding: 50px;
    width: 1000px;
    margin: 50px auto;
    border-radius: 20px;
  }
  .content{
    margin-top: 20px;
  }
  .personal{
    display: none;
  }
  .email{
    display: none;
  }
  .finsh{
    display: none;
  }
  .ivu-steps-item:last-child .ivu-steps-tail {
    display: none !important;
  }
</style>
