<template>
  <div class="editor-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <span
            ref="face"
            @click="() => {this.faceStatus = !this.faceStatus}">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <label class="img_test" for="pic">
            <i class="iconfont icon-tupian"></i>
            <input
            type="file"
            id="pic"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            @change="upload">
          </label>
          <span
            ref="link"
            @click.stop="toggle_link">
            <i class="iconfont icon-emwdaima"></i>
          </span>
        </div>
        <textarea class="layui-textarea fly-editor" placeholder="请编辑内容。。"></textarea>
        <Face :isShow="faceStatus" :ctrl="$refs.face" @closeEvent="closeEvent"></Face>
        <Link :isShow="linkStatus" :ctrl="$refs.link" @closeEvent="closeEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import Face from './Face.vue'
import Link from './Link.vue'
import {uploadImg } from '../../../service/userService.js'

export default {
  name:'Editor',
  components:{
    Face,
    Link
  },
  data(){
    return {
      faceStatus:false,
      linkStatus:false
    }
  },
  methods:{
    closeEvent(){
      this.faceStatus = false
      this.linkStatus = false
    },
    toggle_link(){
      this.linkStatus = !this.linkStatus
    },
    upload(e){
        let file = e.target.files
        let formDate = new FormData()

        if(file.length > 0){
          formDate.append('file',file[0])

          uploadImg(formDate).then(r => {
            this.userInfo.avar = `/${r.data.pic}`
          })
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.img_test{
  padding: 0 10px;
  line-height: 38px;
  color: #009E94;
  cursor: pointer;

  i{
    position: relative;
    padding-right: 6px;
    font-size: 18px;
  }
  input {
    display: none
  }
}
@keyframes bounceIn {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bounceOut {
  0% {
    opacity: 0.5;

  }
  100% {
    opacity: 0.7;
  }
}
.fade-leave-active {
  animation: bounceIn .3s
}
.fade-enter-to {
  animation: bounceOut .3s
}
.fly-editor{
  height: 260px
}
</style>
