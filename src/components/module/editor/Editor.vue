<template>
  <div class="editor-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <span
            ref="face"
            @click="toggle_tag(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <label class="img_test" for="pic">
            <i class="iconfont icon-tupian"></i>
            <input
            type="file"
            id="pic"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            @click="() => current_tag = -1"
            @change="upload">
          </label>
          <span
            ref="link"
            @click.stop="toggle_tag(1)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
        </div>
        <textarea id="edit" class="layui-textarea fly-editor" placeholder="请编辑内容。。" v-model="content" @blur="blurEvent"></textarea>
        <Face :isShow="current_tag == 0" @closeEvent="closeEvent" @addFaceIcon="addFaceIcon"></Face>
        <Link :isShow="current_tag == 1" @closeEvent="closeEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import faces from '../../../assets/mods/face.js'
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
      current_tag:-1,
      ctrl:'',
      content:'',
      pos:0
    }
  },
  watch:{
    // content(val){
    //   let c = val
    //
    //   if(c == '') return
    //
    //   let faceRegEx = /face\[\W{1,}\]/g
    //   let faceRegEx_sub = /\[\W{1,}\]/g
    //   if(faceRegEx.test(c)){
    //     let faceGroup = c.match(faceRegEx)
    //     // console.log('faceGroup',faceGroup);
    //     faceGroup.map(i => {
    //       const key = i.match(faceRegEx_sub)
    //       console.log('key',faces[key]);
    //       c.replace(i,`<img src="${faces[key]}"/>`)
    //     })
    //   }
    // }
  },
  methods:{
    addFaceIcon(key){
      const insertContent = `<img src="${faces[key]}"/>`
      this.insert(insertContent)
    },
    blurEvent(){
      // console.log(this.pos);
      let elem = document.getElementById('edit')
      if(document.selection){
          let selectRange = document.selection.createRange()
          selectRange.moveStart('character',-elem.value.length)
          this.pos = selectRange.text.length
      } else if(elem.selectionStart || elem.selectionStart == '0'){
        // console.log('blurPosN',elem.selectionStart);
          this.pos = elem.selectionStart
      }
      // console.log(this.pos);
    },
    insert(content){
      if(typeof this.content == 'undefined'){
        return
      }
      let tmp = this.content.split('')
      // console.log('tmp',tmp);
      // this.pos = tmp.length

      tmp.splice(this.pos,0,content)
      this.content = tmp.join('')
      this.pos += content.length
    },
    closeEvent(){
      this.current_tag = -1
    },
    toggle_tag(index){
      this.current_tag = index

      switch(index){
        case 0:
          this.ctrl = this.$refs.face
          break;
        case 1:
          this.ctrl = this.$refs.link
          break;
      }
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
    },
    handle_body(e){
      e.stopPropagation()
      if( this.ctrl == ''){
        return
      }
      if(!this.ctrl.contains(e.target)){
        this.closeEvent()
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
