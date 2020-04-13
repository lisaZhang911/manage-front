<template>
  <div class="alert-container" v-show="isShow">
    <div class="mask" @click="close"></div>
    <div class="alert">
      <div class="flex">
        {{msg}}
      </div>
      <div v-if="type == 'alert'">
        <div class="btnCommon success" @click="close">
          确定
        </div>
      </div>
      <div v-else class="space-around">
        <div class="btnCommon cancel" @click="cancelEvent">
          取消
        </div>
        <div class="btnCommon success" @click="successEvent">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    type:{
      type:String,
      default: 'alert'
    },
    msg:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default:false
    },
    success:{
      type:Function,
      default: () => {console.log('s')}
    },
    cancel:{
      type:Function,
      default: () => {console.log('cancel')}
    }
  },
  methods:{
    close(){
      this.isShow = false
    },
    closeMask(){},
    cancelEvent(){
      this.close()
      this.cancel()
    },
    successEvent(){
      this.close()
      this.success()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);

.space-round{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px
}
.btnCommon{
  width: 105px;
  height: 32px;
  text-align: center;
  line-height:  32px;
  border-radius: 6px;

  &.success{
    background: #009688;
    color: #fff
  }
  &.cancel{
    background: #ededed;
    color: #999
  }
  &:hover {
    background: $btn-dark
  }
}
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background: #f9f9f9;
  border-radius: 6px;
  left: 50%; top:50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  z-index: 2;
  box-shadow: 0 5px 8px rgba(0,0,0,.05);
  display: flex;
  flex-flow:column nowrap;
  justify-content: center;
  align-items: center;

  .flex {
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.alert-container{
  width:100%;height: 100%
}
.mask{
  position: fixed;
  width:100%; height: 100%;
  background: rgba(0,0,0,.4);
  left:0; top:0;
  overflow: hidden;
  z-index: 1
}
</style>
