<template>
  <div class="layui-form layui-form-pane person_setMail">
    <form>
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input v-model="email" type="text" name="email" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需<a href="activate.html" style="font-size: 12px; color: #4f99cf;">重新验证邮箱</a>。</div>
      </div>
      <div class="layui-form-item submitBtn">
        <button class="layui-btn" @click="submit">确认修改</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email:''
    }
  },
  methods:{
    submit(){
      console.log('ss');
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
