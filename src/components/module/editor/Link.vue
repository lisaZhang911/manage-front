<template>
  <transition name='fade'>
    <div class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">
          请输入链接
      </div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" v-model="linkAddr">
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click="submit">确定</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:['isShow'],
  data(){
    return {
      linkAddr:''
    }
  },
  methods:{
    cancel(){
      this.$emit('closeEvent')
    },
    submit(){
      this.$emit('addLink')
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-layer-prompt{
  position: absolute;
  top:45px;left:0
}
</style>
