<template>
  <div class="layui-form layui-form-pane person_setMail">
    <div class="verifyMail">
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input v-model="email" type="text" name="email" class="layui-input" disabled="disabled">
        </div>
        <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需重新验证邮箱</div>
      </div>
      <div class="layui-form-item submitBtn">
        <button class="layui-btn" @click="submit">确认验证</button>
      </div>
    </div>
  </div>
</template>

<script>
import { send_mail } from '../../../service/userService.js'

export default {
  data(){
    return {
      email:''
    }
  },
  methods:{
    submit(){
      send_mail().then(r => {
        if(r.err_msg == ''){
          this.original_state = false
          this.$alert(r.data.result)
        } else {
          this.$alert('邮件发送失败，请再试')
        }
      })
    }
  },
  created(){
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const email_arr = user.email.split('')
    let new_emailArr = email_arr.map((x,index) => {
      if(index == 2 || index == 3 || index == 4 || index == 5){
        x = '*'
      }
      return x
    })
    this.email = new_emailArr.join('')
  }
}
</script>

<style lang="scss" scoped>
.person_setMail{
  padding: 30px;

  .submitBtn{
    margin-left: 95px;
    margin-top: 35px;
  }
}
</style>
