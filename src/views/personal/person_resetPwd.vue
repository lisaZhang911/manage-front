<template>
  <div class="layui-form layui-form-pane person_reset_pwd">
    <ValidationObserver ref="observer" v-slot="{validate}">
      <form  method="post" @submit.prevent="validate(submit)">
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
import { reset_pwd } from '../../service/userService.js'

export default {
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      password:'',
      repass:''
    }
  },
  methods:{
    async submit(){
      const isValid = await this.$refs.observer.validate()
      const key = this.$router.currentRoute.query.key
      if(!isValid){
        return
      }
      reset_pwd({
        key:key,
        password:this.password
      }).then(r => {
        if(r.err_msg != ''){
          this.$alert(r.err_msg)
        } else {
          this.$alert('密码修改成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.person_reset_pwd{
  padding: 30px
}
</style>
