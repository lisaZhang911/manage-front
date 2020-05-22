<template>
  <div class="layui-form layui-form-pane person_set_pwd">
    <ValidationObserver ref="observer" v-slot="{validate}">
      <form  method="post" @submit.prevent="validate(submit)">
        <ValidationProvider name="nowpass" rules="required|min:6|max:16" v-slot="{errors}">
          <div class="layui-form-item">
            <label for="L_nowpass" class="layui-form-label">当前密码</label>
            <div class="layui-input-inline">
              <input v-model="nowpass" type="password" id="L_nowpass" name="nowpass" class="layui-input">
            </div>
            <div class="error layui-form-mid">{{errors[0]}}</div>
          </div>
        </ValidationProvider>
        <ValidationProvider name="pass" rules="required|min:6|max:16|confirmed:repass" v-slot="{errors}">
          <div class="layui-form-item">
            <label for="L_pass" class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
              <input v-model="password" type="password" id="L_pass" name="pass" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">6到16个字符</div>
            <div class="error layui-form-mid">{{errors[0]}}</div>
          </div>
        </ValidationProvider>
        <ValidationProvider name="repass" vid="repass" rules="required|min:6|max:16" v-slot="{errors}">
          <div class="layui-form-item">
            <label for="L_repass" class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
              <input v-model="repass" type="password" id="L_repass" name="repass" class="layui-input">
            </div>
            <div class="error layui-form-mid">{{errors[0]}}</div>
          </div>
        </ValidationProvider>

      <div class="layui-form-item">
        <button class="layui-btn" @click="submit">确认修改</button>
      </div>
    </form>
  </ValidationObserver>

  </div>
</template>

<script>
import { ValidationObserver,ValidationProvider } from 'vee-validate'
import { password_update } from '@/service/userService.js'
import { _logout } from '@/util.js'

export default {
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      nowpass:'',
      password:'',
      repass:''
    }
  },
  methods:{
    async submit(){
      const isValid = await this.$refs.observer.validate()
      if(!isValid){
        return
      }
      if(this.nowpass == this.password){
        this.$alert('新旧密码不可相同')
        return
      }

      password_update({
        nowpass:this.nowpass,
        password:this.password
      }).then(r => {
        if(r.err_msg != ''){
          this.$alert(r.err_msg)
        } else {
          this.$alert('密码修改成功')
          setTimeout(() => {
            _logout.apply(this)
            // this.$store.commit('set_login_state',false)
            // this.$store.commit('set_userInfo',{})
            // this.$router.replace('/home')
          },1500)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.person_set_pwd{
  padding: 30px
}
</style>
