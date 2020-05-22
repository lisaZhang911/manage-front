<template>
  <div class="layui-form layui-form-pane person_setMail">
    <div class="verifyMail">
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input v-model="email" type="text" name="email" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item submitBtn">
        <button class="layui-btn" @click="changeEmail">确认修改邮箱</button>
      </div>
    </div>
  </div>
</template>

<script>
import { change_mail } from '@/service/userService.js'
import { _logout } from '@/util.js'

export default {
  data(){
    return {
      email:'',
    }
  },
  methods:{
    changeEmail(){
      const key = this.$router.currentRoute.query.key
      change_mail({email:this.email,key:key}).then(r => {
        console.log(r);
        if(r.code == 200){
          console.log(r);
          this.$alert(r.data.result)
          setTimeout(() => {
            _logout.apply(this)
            // this.$store.commit('set_login_state',false)
            // this.$store.commit('set_userInfo',{})
            //
            // if(this.$router.currentRoute.fullPath != '/home'){
            //   this.$router.replace('/home')
            // }
          },1500)
        } else {
            this.$alert(r.data.err_msg)
        }
      })
    }
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
