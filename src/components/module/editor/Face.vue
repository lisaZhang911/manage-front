<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-tips layui-edit-face" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value,key) in lists" :key="key" @click="handle_faceIcon(key)">
            <img :src="value" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '../../../assets/mods/face.js'

export default {
  props:['isShow','ctrl'],
  data(){
    return {
      lists:faces
    }
  },
  methods:{
    handle_faceIcon(key){
      this.$emit('addFaceIcon',key)
    },
    handle_body(e){
      e.stopPropagation()
      console.log('stop');
      if(typeof this.ctrl == 'undefined'){
        return
      }
      if(!this.ctrl.contains(e.target)){
        this.$emit('closeEvent')
      }
    }
  },
  mounted(){
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click',this.handle_body)
    })
  },
  beforeDestory(){
    document.querySelector('body').removeEventListener('click',this.handle_body)
  }
}
</script>

<style lang="scss" scoped>
.layui-edit-face{
  position: absolute;
  top:45px;left:0
}
</style>
